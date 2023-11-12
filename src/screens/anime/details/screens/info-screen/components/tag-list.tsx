import { FlashList } from '@shopify/flash-list';
import React from 'react';
import type { ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { Button, Text, View } from '@/ui';
import Chip from '@/ui/core/chip';

export const TagListFragment = graphql(`
  fragment TagListMedia on MediaTag {
    id
    name
    rank
    isMediaSpoiler
    isGeneralSpoiler
  }
`);

interface TagListProps extends ViewProps {
  tags: FragmentType<typeof TagListFragment>[];
}

const TagList: React.FC<TagListProps> = ({
  tags: tagsProps,
  className,
  ...props
}) => {
  const [showSpoilers, setShowSpoilers] = React.useState(false);

  const tags = useFragment(TagListFragment, tagsProps);

  const filteredTags = React.useMemo(() => {
    if (!showSpoilers) {
      return tags.filter((tag) => !tag.isMediaSpoiler && !tag.isGeneralSpoiler);
    }

    return tags;
  }, [showSpoilers, tags]);

  return (
    <View className={twMerge('relative mt-8', className)} {...props}>
      <Text variant="xl" className="mb-1">
        Tags
      </Text>

      <FlashList
        estimatedItemSize={137}
        data={filteredTags}
        renderItem={({ item }) => (
          <Chip>
            <Text variant="sm">{`${item.name}: ${item.rank || 0}%`}</Text>
          </Chip>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        ItemSeparatorComponent={Spacer}
      />

      <View className="absolute right-0 top-1 flex flex-row items-center gap-2">
        <Button
          onPress={() => setShowSpoilers(!showSpoilers)}
          className="bg-transparent p-0"
        >
          <Text variant="sm" className="text-gray-400">
            {showSpoilers ? 'Hide spoilers' : 'Show spoilers'}
          </Text>
        </Button>
      </View>
    </View>
  );
};

const Spacer = () => {
  return <View className="mx-1.5" />;
};

export default TagList;
