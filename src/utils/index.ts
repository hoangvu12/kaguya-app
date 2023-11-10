import type { AxiosError } from 'axios';
import dayjs from 'dayjs';
import * as FileSystem from 'expo-file-system';
import { showMessage } from 'react-native-flash-message';

import { MediaSeason } from '@/gql/graphql';

// for onError react queries and mutations
export const showError = (error: AxiosError) => {
  console.log(JSON.stringify(error?.response?.data));
  const description = extractError(error?.response?.data).trimEnd();

  showMessage({
    message: 'Error',
    description,
    type: 'danger',
    duration: 4000,
    icon: 'danger',
  });
};

export const showErrorMessage = (message: string = 'Something went wrong ') => {
  showMessage({
    message,
    type: 'danger',
    duration: 4000,
  });
};

export const extractError = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    const messages = data.map((item) => {
      return `  ${extractError(item)}`;
    });

    return `${messages.join('')}`;
  }

  if (typeof data === 'object' && data !== null) {
    const messages = Object.entries(data).map((item) => {
      const [key, value] = item;
      const separator = Array.isArray(value) ? ':\n ' : ': ';

      return `- ${key}${separator}${extractError(value)} \n `;
    });
    return `${messages.join('')} `;
  }
  return 'Something went wrong ';
};

export function addAlpha(color: string, opacity: number) {
  // coerce values so ti is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

export const ensureFolderExists = (path: string) => {
  return FileSystem.getInfoAsync(path).then(async ({ exists }) => {
    if (!exists) {
      await FileSystem.makeDirectoryAsync(path, { intermediates: true });
    }

    return path;
  });
};

export const chunk = <T>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export const deepEqual = (x: any, y: any): boolean => {
  if (x === y) {
    return true;
  } else if (
    typeof x === 'object' &&
    x != null &&
    typeof y === 'object' &&
    y != null
  ) {
    if (Object.keys(x).length !== Object.keys(y).length) return false;

    for (var prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop])) return false;
      } else return false;
    }

    return true;
  } else return false;
};

export const getSeason = () => {
  const month = dayjs().month();
  const year = dayjs().year();

  let season = MediaSeason.Winter;

  if (month >= 3 && month <= 5) {
    season = MediaSeason.Spring;
  }

  if (month >= 6 && month <= 8) {
    season = MediaSeason.Summer;
  }

  if (month >= 9 && month <= 11) {
    season = MediaSeason.Fall;
  }

  return {
    season,
    year,
  };
};

export const getNextSeason = () => {
  const { season, year } = getSeason();

  let nextSeason = MediaSeason.Winter;
  let nextYear = year;

  if (season === MediaSeason.Winter) {
    nextSeason = MediaSeason.Spring;
  }

  if (season === MediaSeason.Spring) {
    nextSeason = MediaSeason.Summer;
  }

  if (season === MediaSeason.Summer) {
    nextSeason = MediaSeason.Fall;
  }

  if (season === MediaSeason.Fall) {
    nextSeason = MediaSeason.Winter;
    nextYear = year + 1;
  }

  return {
    season: nextSeason,
    year: nextYear,
  };
};
