import { useAtom, useAtomValue } from 'jotai/react';
import React, { useEffect, useRef } from 'react';

import type { Subtitle } from '@/types';
import { View } from '@/ui';
import SubtitleIcon from '@/ui/icons/subtitle';
import SubtitleDisabledIcon from '@/ui/icons/subtitle-disabled';

import { currentSubtitleAtom, subtitleListAtom } from '../store';
import Tappable from './tappable';

const MediaToggleSubtitle = () => {
  const [currentSubtitle, setCurrentSubtitle] = useAtom(currentSubtitleAtom);
  const lastSubtitleRef = useRef<Subtitle | null>(null);
  const subtitleList = useAtomValue(subtitleListAtom);

  const handleToggle = () => {
    if (currentSubtitle) {
      lastSubtitleRef.current = currentSubtitle;

      setCurrentSubtitle(null);
    } else {
      setCurrentSubtitle(
        lastSubtitleRef.current ? lastSubtitleRef.current : subtitleList[0]
      );
    }
  };

  useEffect(() => {
    if (!currentSubtitle) return;

    lastSubtitleRef.current = currentSubtitle;
  }, [currentSubtitle]);

  if (!subtitleList.length) return null;

  return (
    <View>
      <Tappable onPress={handleToggle}>
        <View className="ml-auto bg-transparent p-0">
          {currentSubtitle ? (
            <SubtitleIcon className="h-7 w-7 text-white" />
          ) : (
            <SubtitleDisabledIcon className="h-7 w-7 text-white" />
          )}
        </View>
      </Tappable>
    </View>
  );
};

export default MediaToggleSubtitle;
