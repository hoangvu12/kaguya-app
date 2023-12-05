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
const MIN_DISTANCE = 20;

const useVolumeGesture = () => {
  const volumeSlider = useAtomValue(volumeSliderAtom);

  const screenSize = useScreenSize();

  const refs = useSharedValue({
    sliderHeight: 0,
    baseValue: 0,
    initialVolume: 0,
    actualInitialVolume: 0,
    moveTouchY: 0,
    finalValue: 1,
    isShown: false,
    initialY: NaN,
    shouldMoveFreely: false,
  });

  const volumePan = Gesture.Pan()
    .onStart((event) => {
      const initialVolume = volumeSlider.getVolume() ?? 1;

      refs.value.actualInitialVolume = initialVolume;
      refs.value.initialY = NaN;
      refs.value.shouldMoveFreely = false;

      if (event.x < screenSize.width * WIDTH_PERCENT) return;
      if (event.y < screenSize.height * (1 - HEIGHT_PERCENT)) return;
      if (event.y > screenSize.height * HEIGHT_PERCENT) return;

      refs.value.initialY = event.y;
      refs.value.sliderHeight = volumeSlider.getHeight();
      refs.value.baseValue = event.y;
      refs.value.initialVolume = initialVolume;
      refs.value.moveTouchY = 0;
    })
    .onUpdate((event) => {
      if (event.x < screenSize.width * WIDTH_PERCENT) return;
      if (event.y < screenSize.height * (1 - HEIGHT_PERCENT)) return;
      if (event.y > screenSize.height * HEIGHT_PERCENT) return;

      if (!refs.value.shouldMoveFreely) {
        if (
          isNaN(refs.value.initialY) ||
          Math.abs(event.y - refs.value.initialY) < MIN_DISTANCE
        )
          return;
      }

      refs.value.shouldMoveFreely = true;

      if (!refs.value.isShown) {
        volumeSlider.show();
        refs.value.isShown = true;
      }

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
    .onFinalize((event) => {
      volumeSlider.hide();

      refs.value.isShown = false;

      if (!refs.value.shouldMoveFreely) {
        if (
          isNaN(refs.value.initialY) ||
          Math.abs(event.y - refs.value.initialY) < MIN_DISTANCE
        )
          return;
      }

      if (refs.value.finalValue !== refs.value.actualInitialVolume) {
        runOnJS(volumeSlider.setVolume)(refs.value.finalValue);
      }
    })
    .minDistance(MIN_DISTANCE);

  return volumePan;
};

export default useVolumeGesture;
