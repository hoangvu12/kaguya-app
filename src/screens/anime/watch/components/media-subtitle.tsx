import axios from 'axios';
import { useAtom, useSetAtom } from 'jotai/react';
import React, { useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

import { SubtitleFormat } from '@/core/subtitle';
import type { Subtitle } from '@/types';

import { currentSubtitleAtom, subtitleListAtom } from '../store';
import MediaASSSubtitle from './media-ass-subtitle';
import MediaTextSubtitle from './media-text-subtitle';

interface MediaSubtitleProps {
  subtitles: Subtitle[];
  fonts?: string[];
}

const isASS = (url: string) => {
  return url.includes('.ass');
};

const storage = new MMKV();

const MediaSubtitle: React.FC<MediaSubtitleProps> = ({ subtitles, fonts }) => {
  const setSubtitleList = useSetAtom(subtitleListAtom);
  const [currentSubtitle, setCurrentSubtitle] = useAtom(currentSubtitleAtom);
  const [subContent, setSubContent] = useState('');

  useEffect(() => {
    setSubtitleList(subtitles);

    if (!subtitles.length) return;

    const savedSubtitleLanguage = storage.getString('subtitle');

    const subtitle =
      subtitles.find((sub) => sub.language === savedSubtitleLanguage) ||
      subtitles[0];

    setCurrentSubtitle(subtitle);
  }, [setCurrentSubtitle, setSubtitleList, subtitles]);

  useEffect(() => {
    if (!currentSubtitle) return;

    storage.set('subtitle', currentSubtitle.language);
  }, [currentSubtitle]);

  useEffect(() => {
    if (!currentSubtitle) return;

    axios
      .get(currentSubtitle.file.url, {
        headers: currentSubtitle?.file?.headers || {},
      })
      .then((data) => {
        setSubContent(data.data);
      });
  }, [currentSubtitle]);

  if (!currentSubtitle || !subContent) return null;

  return (
    <React.Fragment>
      {currentSubtitle?.format === SubtitleFormat.ASS ||
      isASS(currentSubtitle.file.url) ? (
        <MediaASSSubtitle fonts={fonts} subContent={subContent} />
      ) : null}

      {currentSubtitle?.format !== SubtitleFormat.ASS &&
      !isASS(currentSubtitle.file.url) ? (
        <MediaTextSubtitle subContent={subContent} />
      ) : null}
    </React.Fragment>
  );
};

export default MediaSubtitle;
