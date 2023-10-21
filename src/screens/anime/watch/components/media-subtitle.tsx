import axios from 'axios';
import { useAtom, useSetAtom } from 'jotai/react';
import React, { useEffect, useState } from 'react';

import { SubtitleFormat } from '@/core/subtitle';
import type { Subtitle } from '@/types';

import { currentSubtitleAtom, subtitleListAtom } from '../store';
import MediaASSSubtitle from './media-ass-subtitle';
import MediaTextSubtitle from './media-text-subtitle';

interface MediaSubtitleProps {
  subtitles: Subtitle[];
}

const isASS = (url: string) => {
  return url.includes('.ass');
};

const MediaSubtitle: React.FC<MediaSubtitleProps> = ({ subtitles }) => {
  const setSubtitleList = useSetAtom(subtitleListAtom);
  const [currentSubtitle, setCurrentSubtitle] = useAtom(currentSubtitleAtom);
  const [subContent, setSubContent] = useState('');

  useEffect(() => {
    setSubtitleList(subtitles);

    if (!subtitles.length) return;

    const firstSubtitle = subtitles[0];

    setCurrentSubtitle(firstSubtitle);
  }, [setCurrentSubtitle, setSubtitleList, subtitles]);

  useEffect(() => {
    if (!currentSubtitle) return;

    axios
      .get(currentSubtitle.file.url, { headers: currentSubtitle.file.headers })
      .then((data) => {
        setSubContent(data.data);
      });
  }, [currentSubtitle]);

  if (!currentSubtitle || !subContent) return null;

  return (
    <React.Fragment>
      {(currentSubtitle?.format === SubtitleFormat.ASS ||
        isASS(currentSubtitle.file.url)) && (
        <MediaASSSubtitle subContent={subContent} />
      )}

      {(currentSubtitle?.format !== SubtitleFormat.ASS ||
        !isASS(currentSubtitle.file.url)) && (
        <MediaTextSubtitle subContent={subContent} />
      )}
    </React.Fragment>
  );
};

export default MediaSubtitle;
