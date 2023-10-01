import React from 'react';
import type { ViewProps } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import type { RecommendationConnection } from '@/types/anilist';
import { Text, View } from '@/ui';
import { Card } from '@/ui/card';

interface RecommendationListProps extends ViewProps {
  recommendations: RecommendationConnection;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  className,
  ...props
}) => {
  return (
    <View className={className} {...props}>
      <Text variant="xl" className="mb-2">
        Recommendations
      </Text>

      <FlatList
        data={recommendations.nodes.map((node) => node.mediaRecommendation)}
        renderItem={({ item }) => <Card media={item} />}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Spacer}
      />
    </View>
  );
};

const Spacer = () => {
  return <View className="mx-1.5" />;
};

export default RecommendationList;
