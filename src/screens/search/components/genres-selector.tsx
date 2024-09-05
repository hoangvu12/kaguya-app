import { useAtom } from 'jotai/react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { GENRE_LIST } from '@/constants';
import { Text, View, WIDTH } from '@/ui';
import Chip from '@/ui/core/chip';
import Pressable from '@/ui/core/pressable';

import { genresAtom } from '../store';

const SHEET_PADDING = 16;

const MARGIN = 2;
const CARD_WIDTH = (WIDTH - SHEET_PADDING * 2) / 2 - MARGIN;

const GenresSelector = () => {
  const [genres, setGenres] = useAtom(genresAtom);

  return (
    <View className="flex flex-row flex-wrap justify-between">
      {GENRE_LIST.map((item) => (
        <Pressable
          className={twMerge(
            'rounded-md',
            genres.includes(item.value) ? 'bg-primary-500' : 'bg-thunder-700'
          )}
          style={{
            width: CARD_WIDTH,
            marginBottom: MARGIN * 2,
          }}
          key={item.value}
          onPress={() => {
            if (genres.includes(item.value)) {
              setGenres(genres.filter((genre) => genre !== item.value));
            } else {
              setGenres([...genres, item.value]);
            }
          }}
        >
          <Chip
            className={twMerge(
              genres.includes(item.value) ? 'bg-primary-500' : 'bg-thunder-700'
            )}
          >
            <Text>{item.label}</Text>
          </Chip>
        </Pressable>
      ))}
    </View>
  );
};

export default React.memo(GenresSelector);
