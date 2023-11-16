import { FlashList } from '@shopify/flash-list';
import React from 'react';
import type { ViewProps } from 'react-native';

import { Text, View } from '@/ui';
import Chip from '@/ui/core/chip';

interface SynonymListProps extends ViewProps {
  synonyms: string[];
}

const SynonymList: React.FC<SynonymListProps> = ({
  synonyms,
  className,
  ...props
}) => {
  if (!synonyms.length) return null;

  return (
    <View className={className} {...props}>
      <Text variant="xl" className="mb-1">
        Synonyms
      </Text>

      <FlashList
        estimatedItemSize={94}
        data={synonyms}
        renderItem={({ item }) => (
          <Chip>
            <Text variant="sm">{item}</Text>
          </Chip>
        )}
        keyExtractor={(item) => item}
        horizontal
        ItemSeparatorComponent={Spacer}
      />
    </View>
  );
};

const Spacer = () => {
  return <View className="mx-1.5" />;
};

export default SynonymList;
