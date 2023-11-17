import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom, useAtomValue } from 'jotai/react';

import type { Timestamp } from '@/types';

import {
  currentEpisodeAtom,
  durationAtom,
  mediaIdAtom,
  timestampsAtom,
} from '../store';

type SkipType = 'ed' | 'op' | 'mixed-ed' | 'mixed-op' | 'recap';

interface SkipTimeStamp {
  interval: {
    startTime: number;
    endTime: number;
  };
  skipType: SkipType;
  skipId: string;
  episodeLength: number;
}

const getTypeName = (skipType: SkipType) => {
  if (skipType === 'op') {
    return 'Opening';
  }

  if (skipType === 'ed') {
    return 'Ending';
  }

  if (skipType === 'mixed-ed') {
    return 'Mixed ED';
  }

  if (skipType === 'mixed-op') {
    return 'Mixed OP';
  }

  if (skipType === 'recap') {
    return 'Recap';
  }

  return 'Timestamp';
};

const getTimestamps = async (
  episode: number,
  idMal: number,
  episodeLength: number
): Promise<Timestamp[]> => {
  const { data } = await axios.get<any>(
    `https://api.aniskip.com/v2/skip-times/${idMal}/${episode}`,
    {
      params: {
        types: ['ed', 'mixed-ed', 'mixed-op', 'op', 'recap'],
        episodeLength,
      },
      validateStatus: (status) => status === 200 || status === 404,
    }
  );

  const results: SkipTimeStamp[] = data?.results || [];

  return results.map((result) => ({
    startTime: result.interval.startTime,
    endTime: result.interval.endTime,
    type: getTypeName(result.skipType),
  }));
};

const useTimestamps = () => {
  const mediaId = useAtomValue(mediaIdAtom);
  const duration = useAtomValue(durationAtom);
  const [timestamps, setTimestamps] = useAtom(timestampsAtom);
  const currentEpisode = useAtomValue(currentEpisodeAtom);

  return useQuery(
    ['timestamps', mediaId.malId, currentEpisode?.number, duration],
    async () => {
      if (isNaN(duration) || duration < 1) return [];

      if (timestamps?.length) {
        return timestamps;
      }

      if (!mediaId.malId) return [];

      if (!currentEpisode?.number) return [];

      const number = parseInt(currentEpisode.number, 10);

      const newTimestamps = await getTimestamps(
        isNaN(number) ? 0 : number,
        mediaId.malId,
        duration
      );

      setTimestamps(newTimestamps);

      return newTimestamps;
    }
  );
};

export default useTimestamps;
