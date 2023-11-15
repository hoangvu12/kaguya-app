import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';

import { stripHTML } from '@/core';

import { Text, View } from './core';
import Pressable from './core/pressable';

interface MediaDescriptionProps {
  description: string;
}

const NUMS_OF_LINE = 4;

export const MediaDescription: React.FC<MediaDescriptionProps> = ({
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  return (
    <Pressable onPress={handleExpand} className="rounded-md bg-thunder-900 p-4">
      <Text variant="lg" className="mb-3 font-semibold">
        Description
      </Text>

      <Text
        variant="sm"
        className="text-gray-300"
        numberOfLines={isExpanded ? 0 : NUMS_OF_LINE}
      >
        {stripHTML(description)}
      </Text>

      {!isExpanded ? (
        <View className="mx-auto mt-4">
          <ChevronDown color="white" />
        </View>
      ) : null}
    </Pressable>
  );
};
