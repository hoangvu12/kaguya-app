import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { MediaType } from '@/gql/graphql';

import type { TextProps } from './core';
import { Text } from './core';

export const MediaUnitStatsFragment = graphql(`
  fragment MediaUnitStatsMedia on Media {
    type
    episodes
    chapters
    mediaListEntry {
      progress
    }
    nextAiringEpisode {
      episode
    }
  }
`);

const MediaUnitStats: React.FC<
  { media: FragmentType<typeof MediaUnitStatsFragment> } & TextProps
> = ({ media: mediaProps, className, ...props }) => {
  const media = useFragment(MediaUnitStatsFragment, mediaProps);

  const releasedEpisode = useMemo(() => {
    if (media.type === MediaType.Anime) {
      if (!media.nextAiringEpisode?.episode) return null;

      if (media?.nextAiringEpisode?.episode - 1 > 1) {
        return media.nextAiringEpisode!.episode - 1;
      }
    }

    return null;
  }, [media.nextAiringEpisode, media.type]);

  const totalMediaUnit = useMemo(() => {
    if (media.type === MediaType.Anime) {
      return media.episodes ?? '??';
    }

    if (media.type === MediaType.Manga) {
      return media.chapters ?? '??';
    }

    return null;
  }, [media.chapters, media.episodes, media.type]);

  return (
    <Text className={twMerge('space-x-2', className)} {...props}>
      {media.mediaListEntry?.progress ? (
        <Text variant="sm" weight="normal" className="text-primary-300">
          {media.mediaListEntry.progress}
        </Text>
      ) : null}

      <Text variant="sm" weight="normal" className="text-gray-300">
        {media.mediaListEntry?.progress && ' | '}
        {releasedEpisode || totalMediaUnit} {'| '}
      </Text>

      {totalMediaUnit ? (
        <Text variant="sm" weight="normal" className="text-gray-300">
          {totalMediaUnit}
        </Text>
      ) : null}
    </Text>
  );
};

export default MediaUnitStats;
