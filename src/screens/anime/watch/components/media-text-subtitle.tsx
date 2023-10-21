import { parse } from '@plussub/srt-vtt-parser';
import type { Entry } from '@plussub/srt-vtt-parser/dist/src/types';
import { useAtomValue } from 'jotai/react';
import React, { useEffect, useMemo, useState } from 'react';

import { stripHTML } from '@/core';
import { Text, View } from '@/ui';
import { TextStroke } from '@/ui/core/text-stroke';

import {
  currentTimeAtom,
  subtitleBackgroundColor,
  subtitleBackgroundOpacityAtom,
  subtitleFontColorAtom,
  subtitleFontOpacityAtom,
  subtitleFontSizeAtom,
} from '../store';

interface MediaTextSubtitleProps {
  subContent: string;
}

const LINE_HEIGHT_RATIO = 1.333;
const PADDING_X_RATIO = 0.5;
const PADDING_Y_RATIO = 0.25;

const addAlphaToRGB = (rgb: string, alpha: number) => {
  return rgb.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
};

const MediaTextSubtitle: React.FC<MediaTextSubtitleProps> = ({
  subContent,
}) => {
  const [subtitleItems, setSubtitleItems] = useState<Entry[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<Entry | undefined>(
    undefined
  );
  const currentTime = useAtomValue(currentTimeAtom);

  const fontSize = useAtomValue(subtitleFontSizeAtom);
  const fontColor = useAtomValue(subtitleFontColorAtom);
  const fontOpacity = useAtomValue(subtitleFontOpacityAtom);
  const backgroundColor = useAtomValue(subtitleBackgroundColor);
  const backgroundOpacity = useAtomValue(subtitleBackgroundOpacityAtom);

  useEffect(() => {
    if (!subContent) return;

    const { entries } = parse(subContent);

    setSubtitleItems(entries);
  }, [subContent]);

  useEffect(() => {
    if (!subtitleItems.length) return;

    const currentSubtitle = subtitleItems.find(
      (subtitleItem) =>
        currentTime >= subtitleItem.from / 1000 &&
        currentTime <= subtitleItem.to / 1000
    );

    setCurrentSubtitle(currentSubtitle);
  }, [currentTime, subtitleItems]);

  const padding = useMemo(() => {
    return {
      horizontal: fontSize * PADDING_X_RATIO,
      vertical: fontSize * PADDING_Y_RATIO,
    };
  }, [fontSize]);

  const lineHeight = useMemo(() => {
    return fontSize * LINE_HEIGHT_RATIO;
  }, [fontSize]);

  if (!subtitleItems.length) return null;

  if (!currentSubtitle) return null;

  return (
    <View className="absolute z-10 flex h-full w-full items-center justify-center whitespace-pre-wrap">
      <View
        className="absolute bottom-2 rounded-md p-2 text-center"
        style={{
          backgroundColor: addAlphaToRGB(backgroundColor, backgroundOpacity),
          paddingHorizontal: padding.horizontal,
          paddingVertical: padding.vertical,
        }}
      >
        {backgroundOpacity === 0 ? (
          <TextStroke stroke={2} color={'#000000'}>
            <Text
              className="text-center"
              style={{
                fontSize,
                color: fontColor,
                opacity: fontOpacity,
                lineHeight,
              }}
            >
              {stripHTML(currentSubtitle.text)}
            </Text>
          </TextStroke>
        ) : (
          <Text
            className="text-center"
            style={{
              fontSize,
              color: fontColor,
              opacity: fontOpacity,
              lineHeight,
            }}
          >
            {stripHTML(currentSubtitle.text)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default MediaTextSubtitle;
