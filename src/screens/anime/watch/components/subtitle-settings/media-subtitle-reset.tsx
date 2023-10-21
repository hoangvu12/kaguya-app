import { useSetAtom } from 'jotai/react';
import { RotateCcwIcon } from 'lucide-react-native';
import React from 'react';

import { Text, View } from '@/ui';

import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_BACKGROUND_OPACITY,
  DEFAULT_FONT_COLOR,
  DEFAULT_FONT_OPACITY,
  DEFAULT_FONT_SIZE,
  subtitleBackgroundColor,
  subtitleBackgroundOpacityAtom,
  subtitleFontColorAtom,
  subtitleFontOpacityAtom,
  subtitleFontSizeAtom,
} from '../../store';
import Tappable from '../tappable';

const MediaSubtitleReset = () => {
  const setFontSize = useSetAtom(subtitleFontSizeAtom);
  const setFontColor = useSetAtom(subtitleFontColorAtom);
  const setFontOpacity = useSetAtom(subtitleFontOpacityAtom);
  const setBackgroundOpacity = useSetAtom(subtitleBackgroundOpacityAtom);
  const setBackgroundColor = useSetAtom(subtitleBackgroundColor);

  return (
    <Tappable
      onPress={() => {
        setFontSize(DEFAULT_FONT_SIZE);
        setFontColor(DEFAULT_FONT_COLOR);
        setFontOpacity(DEFAULT_FONT_OPACITY);
        setBackgroundColor(DEFAULT_BACKGROUND_COLOR);
        setBackgroundOpacity(DEFAULT_BACKGROUND_OPACITY);
      }}
    >
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center px-4 py-2">
          <RotateCcwIcon
            size={24}
            color="white"
            className="h-6 w-6 text-white"
          />

          <Text variant="lg" weight="semibold" className="ml-2">
            Reset
          </Text>
        </View>
      </View>
    </Tappable>
  );
};

export default MediaSubtitleReset;
