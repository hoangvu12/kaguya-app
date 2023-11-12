/* eslint-disable react-hooks/rules-of-hooks */
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import type { ViewProps } from 'react-native';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { Text, View } from '@/ui';
import { Card, CardFragment } from '@/ui/card';

export const RecommendationListFragment = graphql(`
  fragment RecommendationListMedia on RecommendationConnection {
    nodes {
      mediaRecommendation {
        ...CardMedia
      }
    }
  }
`);

interface RecommendationListProps extends ViewProps {
  recommendations: FragmentType<typeof RecommendationListFragment>;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations: recommendationsProps,
  className,
  ...props
}) => {
  const recommendations = useFragment(
    RecommendationListFragment,
    recommendationsProps
  );

  const mediaList = recommendations.nodes
    ?.map((node) => node?.mediaRecommendation)
    .filter(Boolean);

  if (mediaList?.length === 0) return null;

  return (
    <View className={className} {...props}>
      <Text variant="xl" className="mb-2">
        Recommendations
      </Text>

      <FlashList
        estimatedItemSize={120}
        data={mediaList}
        renderItem={({ item }) => <Card shouldReplaceScreen media={item} />}
        horizontal
        keyExtractor={(item) => useFragment(CardFragment, item).id.toString()}
        ItemSeparatorComponent={Spacer}
      />
    </View>
  );
};

const Spacer = () => {
  return <View className="mx-1.5" />;
};

export default RecommendationList;
