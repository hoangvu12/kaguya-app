import { useAtomValue } from 'jotai/react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

import { volumeSliderAtom } from '../store';
import useScreenSize from './use-screen-size';

const clamp = (value: number, min: number, max: number) => {
  'worklet';

  return Math.max(min, Math.min(value, max));
};

const WIDTH_PERCENT = 0.6;
const HEIGHT_PERCENT = 0.85;

const useVolumeGesture = () => {
  const volumeSlider = useAtomValue(volumeSliderAtom);

  const screenSize = useScreenSize();

  const refs = useSharedValue({
    sliderHeight: 0,
    baseValue: 0,
    initialVolume: 0,
    moveTouchY: 0,
    finalValue: 1,
  });

  const volumePan = Gesture.Pan()
    .onStart((event) => {
      if (event.x < screenSize.width * WIDTH_PERCENT) return;
      if (event.y < screenSize.height * (1 - HEIGHT_PERCENT)) return;
      if (event.y > screenSize.height * HEIGHT_PERCENT) return;

      refs.value.sliderHeight = volumeSlider.getHeight();
      refs.value.baseValue = event.y;
      refs.value.initialVolume = volumeSlider.getVolume() ?? 1;
      refs.value.moveTouchY = 0;

      volumeSlider.show();
    })
    .onUpdate((event) => {
      if (event.x < screenSize.width * WIDTH_PERCENT) return;
      if (event.y < screenSize.height * (1 - HEIGHT_PERCENT)) return;
      if (event.y > screenSize.height * HEIGHT_PERCENT) return;

      const draggedHeight = event.y - refs.value.baseValue;
      const draggedVolume = Math.abs(draggedHeight / refs.value.sliderHeight);

      refs.value.baseValue = event.y;
      refs.value.finalValue = 0;

      if (event.y > refs.value.moveTouchY) {
        refs.value.initialVolume = refs.value.initialVolume - draggedVolume;

        refs.value.finalValue = refs.value.initialVolume - draggedVolume;
      } else {
        refs.value.initialVolume = refs.value.initialVolume + draggedVolume;

        refs.value.finalValue = refs.value.initialVolume + draggedVolume;
      }

      refs.value.finalValue = clamp(refs.value.finalValue, 0, 1);

      refs.value.moveTouchY = event.y;

      volumeSlider.setAnimationValue(refs.value.finalValue);
    })
    .onFinalize(() => {
      runOnJS(volumeSlider.setVolume)(refs.value.finalValue);

      volumeSlider.hide();
    });

  return volumePan;
};

export default useVolumeGesture;
