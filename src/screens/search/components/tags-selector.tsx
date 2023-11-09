import { useAtom } from 'jotai/react';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { twMerge } from 'tailwind-merge';

import { Text, TouchableOpacity, View } from '@/ui';
import Chip from '@/ui/core/chip';

import { tagsAtom } from '../store';
import tags from './tags';

const tagOptions = tags.map((tag) => ({
  value: tag,
  label: tag,
}));

const TagsSelector = () => {
  const [tags, setTags] = useAtom(tagsAtom);

  return (
    <FlatList
      horizontal
      data={tagOptions}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            if (tags.includes(item.value)) {
              setTags(tags.filter((genre) => genre !== item.value));
            } else {
              setTags([...tags, item.value]);
            }
          }}
        >
          <Chip
            className={twMerge(
              tags.includes(item.value) ? 'bg-primary-500' : 'bg-thunder-700'
            )}
          >
            <Text>{item.label}</Text>
          </Chip>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.value}
      ItemSeparatorComponent={() => <View className="mx-0.5" />}
      extraData={tags}
    />
  );
};

export default TagsSelector;
