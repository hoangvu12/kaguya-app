import { useAtom } from 'jotai/react';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { twMerge } from 'tailwind-merge';

import { GENRE_LIST } from '@/constants';
import { Text, TouchableOpacity, View } from '@/ui';
import Chip from '@/ui/core/chip';

import { genresAtom } from '../store';

const GenresSelector = () => {
  const [genres, setGenres] = useAtom(genresAtom);

  return (
    <FlatList
      horizontal
      data={GENRE_LIST}
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
