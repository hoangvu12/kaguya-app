import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { ToastAndroid } from 'react-native';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { MediaType } from '@/gql/graphql';
import { Image, Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';

export const MangaSectionFragment = graphql(`
  fragment CharacterManga on Character {
    media(perPage: 12, sort: [FAVOURITES_DESC]) {
      edges {
        node {
          id
          type
          coverImage {
            large
          }
          title {
            userPreferred
          }
        }
      }
    }
  }
`);

interface MangaSectionProps {
  fragmentData: FragmentType<typeof MangaSectionFragment>;
}

const MangaSection: React.FC<MangaSectionProps> = ({ fragmentData }) => {
  const data = useFragment(MangaSectionFragment, fragmentData);

  const navigateMedia = (_mediaId: number) => {
    //TODO: MANGA SUPPORT

    ToastAndroid.show('Coming soon...', ToastAndroid.SHORT);
  };

  const mangaList = data?.media?.edges
    ?.filter((edge) => edge?.node?.type === MediaType.Manga)
    .filter(Boolean);

  return (
    <FlashList
      data={mangaList}
      renderItem={({ item }) => {
        const media = item?.node!;

        return (
          <View className="w-28">
            <View className="relative mb-1.5 aspect-[2/3] w-full rounded-md">
              <Pressable
                className="h-full w-full"
                onPress={() => {
                  navigateMedia(media.id!);
                }}
              >
                <Image
                  source={{ uri: media!.coverImage!.large! }}
                  className="h-full w-full rounded-md"
                  contentFit="cover"
                  key={media!.coverImage!.large!}
                />
              </Pressable>
            </View>

            <Pressable
              onPress={() => {
                navigateMedia(media.id!);
              }}
            >
              <Text numberOfLines={1} variant="md" weight="semibold">
                {media!.title!.userPreferred}
              </Text>
            </Pressable>
          </View>
        );
      }}
      keyExtractor={(item) => item?.node?.id?.toString()!}
      horizontal
      estimatedItemSize={112}
      ItemSeparatorComponent={() => <View className="w-2" />}
    />
  );
};

export default MangaSection;
