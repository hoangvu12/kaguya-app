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
const MIN_DISTANCE = 20;

const useBrightnessGesture = () => {
  const brightnessSlider = useAtomValue(brightnessSliderAtom);

  const screenSize = useScreenSize();

  const refs = useSharedValue({
    sliderHeight: 0,
    baseValue: 0,
    initialBrightness: 0,
    actualInitialBrightness: 0,
    moveTouchY: 0,
    finalValue: 1,
    isShown: false,
    initialY: NaN,
  });

  const brightnessPan = Gesture.Pan()
    .onStart((event) => {
      const initialBrightness = brightnessSlider.getBrightness();

      refs.value.actualInitialBrightness = initialBrightness;
      refs.value.initialY = NaN;

      if (event.x > screenSize.width - screenSize.width * WIDTH_PERCENT) return;
      if (event.y < screenSize.height * (1 - HEIGHT_PERCENT)) return;
      if (event.y > screenSize.height * HEIGHT_PERCENT) return;

      refs.value.initialY = event.y;
      refs.value.sliderHeight = brightnessSlider.getHeight();
      refs.value.baseValue = event.y;
      refs.value.initialBrightness = initialBrightness;
      refs.value.moveTouchY = 0;
      refs.value.finalValue = initialBrightness;
    })
    .onUpdate((event) => {
      if (event.x > screenSize.width - screenSize.width * WIDTH_PERCENT) return;
      if (event.y < screenSize.height * (1 - HEIGHT_PERCENT)) return;
      if (event.y > screenSize.height * HEIGHT_PERCENT) return;
      if (
        isNaN(refs.value.initialY) ||
        Math.abs(event.y - refs.value.initialY) < MIN_DISTANCE
      )
        return;

      if (!refs.value.isShown) {
        brightnessSlider.show();
        refs.value.isShown = true;
      }

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
    .onFinalize((event) => {
      brightnessSlider.hide();

      refs.value.isShown = false;

      if (
        isNaN(refs.value.initialY) ||
        Math.abs(event.y - refs.value.initialY) < MIN_DISTANCE
      )
        return;

      if (refs.value.finalValue !== refs.value.actualInitialBrightness) {
        runOnJS(brightnessSlider.setBrightness)(refs.value.finalValue);
      }
    })
    .minDistance(MIN_DISTANCE);

  return brightnessPan;
};

export default useBrightnessGesture;
