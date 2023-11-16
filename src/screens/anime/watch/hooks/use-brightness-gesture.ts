import { useAtomValue } from 'jotai/react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

import { brightnessSliderAtom } from '../store';
import useScreenSize from './use-screen-size';

const clamp = (value: number, min: number, max: number) => {
  'worklet';

  return Math.max(min, Math.min(value, max));
};

const WIDTH_PERCENT = 0.6;
const HEIGHT_PERCENT = 0.85;

const useBrightnessGesture = () => {
  const brightnessSlider = useAtomValue(brightnessSliderAtom);

  const screenSize = useScreenSize();

  const refs = useSharedValue({
    sliderHeight: 0,
    baseValue: 0,
    initialBrightness: 0,
    moveTouchY: 0,
    finalValue: 0,
  });

  const brightnessPan = Gesture.Pan()
    .onStart((event) => {
      if (event.x > screenSize.width - screenSize.width * WIDTH_PERCENT) return;
      if (event.y < screenSize.height * (1 - HEIGHT_PERCENT)) return;
      if (event.y > screenSize.height * HEIGHT_PERCENT) return;

      const initialBrightness = brightnessSlider.getBrightness();

      refs.value.sliderHeight = brightnessSlider.getHeight();
      refs.value.baseValue = event.y;
      refs.value.initialBrightness = initialBrightness;
      refs.value.moveTouchY = 0;
      refs.value.finalValue = initialBrightness;

      brightnessSlider.show();
    })
    .onUpdate((event) => {
      if (event.x > screenSize.width - screenSize.width * WIDTH_PERCENT) return;
      if (event.y < screenSize.height * (1 - HEIGHT_PERCENT)) return;
      if (event.y > screenSize.height * HEIGHT_PERCENT) return;
      if (Math.abs(event.translationY) < 10) return;

      const draggedHeight = event.y - refs.value.baseValue;
      const draggedBrightness = Math.abs(
        draggedHeight / refs.value.sliderHeight
      );

      refs.value.baseValue = event.y;
      refs.value.finalValue = 0;

      if (event.y > refs.value.moveTouchY) {
        refs.value.initialBrightness =
          refs.value.initialBrightness - draggedBrightness;

        refs.value.finalValue =
          refs.value.initialBrightness - draggedBrightness;
      } else {
        refs.value.initialBrightness =
          refs.value.initialBrightness + draggedBrightness;

        refs.value.finalValue =
          refs.value.initialBrightness + draggedBrightness;
      }

      refs.value.finalValue = clamp(refs.value.finalValue, 0, 1);

      refs.value.moveTouchY = event.y;

      brightnessSlider.setAnimationValue(refs.value.finalValue);
    })
    .onEnd(() => {
      runOnJS(brightnessSlider.setBrightness)(refs.value.finalValue);

      brightnessSlider.hide();
    });

  return brightnessPan;
};

export default useBrightnessGesture;
