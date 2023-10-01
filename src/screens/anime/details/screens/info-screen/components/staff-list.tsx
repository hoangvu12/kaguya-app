import React from 'react';
import type { ViewProps } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import type { StaffConnection } from '@/types/anilist';
import { Text, View } from '@/ui';
import StaffCard from '@/ui/staff-card';

interface StaffListProps extends ViewProps {
  staffList: StaffConnection;
}

const StaffList: React.FC<StaffListProps> = ({
  staffList,
  className,
  ...props
}) => {
  return (
    <View className={className}>
      <Text variant="xl" className="mb-2" {...props}>
        Staff
      </Text>
      <FlatList
        data={staffList.edges}
        keyExtractor={(item) => item.node.id.toString() + item.role}
        renderItem={({ item }) => <StaffCard staffEdge={item} />}
        horizontal
        ItemSeparatorComponent={Spacer}
      />
    </View>
  );
};

const Spacer = () => {
  return <View className="mx-1.5" />;
};

export default StaffList;
