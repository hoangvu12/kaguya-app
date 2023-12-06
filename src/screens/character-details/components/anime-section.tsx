import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { ToastAndroid } from 'react-native';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { MediaType } from '@/gql/graphql';
import { Image, Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';

export const AnimeSectionFragment = graphql(`
  fragment CharacterAnime on Character {
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
        voiceActors(language: JAPANESE, sort: ROLE) {
          id
          name {
            userPreferred
          }
          age
          image {
            large
          }
        }
      }
    }
  }
`);

interface AnimeSectionProps {
  fragmentData: FragmentType<typeof AnimeSectionFragment>;
}

const AnimeSection: React.FC<AnimeSectionProps> = ({ fragmentData }) => {
  const data = useFragment(AnimeSectionFragment, fragmentData);

  const navigation = useNavigation();

  const navigateMedia = (mediaId: number) => {
    navigation.navigate('AnimeDetails', { mediaId });
  };

  const navigateStaff = (_staffId: number) => {
    ToastAndroid.show('Coming soon...', ToastAndroid.SHORT);
  };

  const animeList = data?.media?.edges
    ?.filter((edge) => edge?.node?.type === MediaType.Anime)
    .filter(Boolean);

  return (
    <FlashList
      data={animeList}
      renderItem={({ item }) => {
        const voiceActor = item?.voiceActors?.[0];
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

              {voiceActor ? (
                <Pressable
                  onPress={() => {
                    navigateStaff(voiceActor.id!);
                  }}
                  className="absolute bottom-0 right-0 w-2/5 rounded-md border border-thunder-900"
                >
                  <Image
                    className="aspect-[2/3] h-full w-full rounded-md"
                    source={{ uri: voiceActor!.image!.large! }}
                    contentFit="cover"
                    key={voiceActor!.image!.large!}
                  />
                </Pressable>
              ) : null}
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

            {voiceActor ? (
              <Pressable
                onPress={() => {
                  navigateStaff(voiceActor.id!);
                }}
              >
                <Text numberOfLines={1} variant="xs" className="text-gray-400">
                  {voiceActor?.name?.userPreferred}
                </Text>
              </Pressable>
            ) : null}
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

export default AnimeSection;
