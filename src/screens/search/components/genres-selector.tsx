import { useAtom } from 'jotai/react';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { twMerge } from 'tailwind-merge';

import { Text, TouchableOpacity, View } from '@/ui';
import Chip from '@/ui/core/chip';

import { genresAtom } from '../store';

const genreOptions = [
  {
    value: 'Action',
    label: 'Action',
  },
  {
    value: 'Adventure',
    label: 'Adventure',
  },
  {
    value: 'Comedy',
    label: 'Comedy',
  },
  {
    value: 'Drama',
    label: 'Drama',
  },
  {
    value: 'Ecchi',
    label: 'Ecchi',
  },
  {
    value: 'Fantasy',
    label: 'Fantasy',
  },
  {
    value: 'Hentai',
    label: 'Hentai',
  },
  {
    value: 'Horror',
    label: 'Horror',
  },
  {
    value: 'Mahou Shoujo',
    label: 'Mahou Shoujo',
  },
  {
    value: 'Mecha',
    label: 'Mecha',
  },
  {
    value: 'Music',
    label: 'Music',
  },
  {
    value: 'Mystery',
    label: 'Mystery',
  },
  {
    value: 'Psychological',
    label: 'Psychological',
  },
  {
    value: 'Romance',
    label: 'Romance',
  },
  {
    value: 'Sci-Fi',
    label: 'Sci-Fi',
  },
  {
    value: 'Slice of Life',
    label: 'Slice of Life',
  },
  {
    value: 'Sports',
    label: 'Sports',
  },
  {
    value: 'Supernatural',
    label: 'Supernatural',
  },
  {
    value: 'Thriller',
    label: 'Thriller',
  },
];

const GenresSelector = () => {
  const [genres, setGenres] = useAtom(genresAtom);

  return (
    <FlatList
      horizontal
      data={genreOptions}
      renderItem={({ item }) => (
        <TouchableOpacity
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
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.value}
      ItemSeparatorComponent={() => <View className="mx-0.5" />}
      extraData={genres}
    />
  );
};

export default GenresSelector;
