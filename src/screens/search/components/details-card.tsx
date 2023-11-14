import { useNavigation } from '@react-navigation/native';
import { HeartIcon, SmileIcon } from 'lucide-react-native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { formatNumberToAbbreviated } from '@/core';
import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';
import { PlainCard } from '@/ui/plain-card';

export const DetailsCardFragment = graphql(`
  fragment DetailsCard on Media {
    id
    title {
      userPreferred
    }
    genres
    averageScore
    favourites
    coverImage {
      large
    }
  }
`);

interface DetailsCardProps {
  media: FragmentType<typeof DetailsCardFragment>;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ media: mediaProps }) => {
  const media = useFragment(DetailsCardFragment, mediaProps);

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('AnimeDetails', {
      mediaId: media.id,
    });
  };

  return (
    <Pressable onPress={onPress}>
      <View className="flex flex-row rounded-md bg-thunder-900">
        <PlainCard className="w-20" coverImage={media?.coverImage?.large!} />
        <View className="flex-1 p-2">
          <Text numberOfLines={2} weight="semibold" variant="md">
            {media?.title?.userPreferred}
          </Text>
          <View className="mt-0.5 flex flex-row items-center space-x-2">
            <View className="flex flex-row items-center">
              <SmileIcon size={20} color="#22c55e" />
              <Text className="ml-1" variant="md">
                {media.averageScore ?? 0}%
              </Text>
            </View>
            <View className="flex flex-row items-center">
              <HeartIcon size={20} fill="#ef4444" color="#ef4444" />
              <Text className="ml-1" variant="md">
                {formatNumberToAbbreviated(media.favourites ?? 0)}
              </Text>
            </View>
          </View>
          <View className="mt-1">
            <FlatList
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              data={media.genres}
              renderItem={({ item: genre }) => (
                <Text weight="normal" variant="md">
                  {genre}
                </Text>
              )}
              keyExtractor={(item) => item!}
              horizontal
              ItemSeparatorComponent={() => (
                <Text className="mx-1 text-gray-300">-</Text>
              )}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default DetailsCard;
