import { useAtom } from 'jotai/react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Text, View, WIDTH } from '@/ui';
import Chip from '@/ui/core/chip';
import Pressable from '@/ui/core/pressable';

import { tagsAtom } from '../store';
import tags from './tags';

const SHEET_PADDING = 16;

const MARGIN = 2;
const CARD_WIDTH = (WIDTH - SHEET_PADDING * 2) / 2 - MARGIN;

const tagOptions = tags.map((tag) => ({
  value: tag,
  label: tag,
}));

const TagsSelector = () => {
  const [tags, setTags] = useAtom(tagsAtom);

  return (
    <View className="mb-8 flex flex-row flex-wrap justify-between">
      {tagOptions.map((item) => (
        <Pressable
          className={twMerge(
            'rounded-md',
            tags.includes(item.value) ? 'bg-primary-500' : 'bg-thunder-700'
          )}
          style={{
            width: CARD_WIDTH,
            marginBottom: MARGIN * 2,
          }}
          key={item.value}
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
        </Pressable>
      ))}
    </View>
  );
};

export default React.memo(TagsSelector);
