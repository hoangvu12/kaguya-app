import React from 'react';
import { Else, If, Then } from 'react-if';

import { Text, View } from '@/ui';

interface InfoItemProps {
  title: string | React.ReactNode;
  value: string | React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, value }) => {
  return (
    <View className="flex flex-row items-start justify-between">
      <If condition={!React.isValidElement(title)}>
        <Then>
          <Text variant="sm" weight="bold" className="text-gray-400">
            {title}
          </Text>
        </Then>

        <Else>{title}</Else>
      </If>

      <If condition={!React.isValidElement(value)}>
        <Then>
          <Text variant="sm" className="text-gray-200">
            {value}
          </Text>
        </Then>

        <Else>{value}</Else>
      </If>
    </View>
  );
};

export default InfoItem;
