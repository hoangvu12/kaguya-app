/* eslint-disable react-hooks/rules-of-hooks */
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import type { ViewProps } from 'react-native';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { Text, View } from '@/ui';
import StaffCard, { StaffCardFragment } from '@/ui/staff-card';

export const StaffListFragment = graphql(`
  fragment StaffListMedia on StaffConnection {
    edges {
      node {
        id
      }
      role
      ...StaffCard
    }
  }
`);

interface StaffListProps extends ViewProps {
  staffList: FragmentType<typeof StaffListFragment>;
}

const StaffList: React.FC<StaffListProps> = ({
  staffList,
  className,
  ...props
}) => {
  const edges = useFragment(StaffListFragment, staffList).edges?.filter(
    Boolean
  );

  if (!edges?.length) return null;

  return (
    <View className={className}>
      <Text variant="xl" className="mb-2" {...props}>
        Staff
      </Text>

      <FlashList
        estimatedItemSize={124}
        data={edges}
        keyExtractor={(item) => {
          const staff = useFragment(StaffCardFragment, item);

          return staff.node!.id.toString() + staff.role;
        }}
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
