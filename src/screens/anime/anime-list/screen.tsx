import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { Else, If, Then } from 'react-if';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { twMerge } from 'tailwind-merge';

import { graphql, useFragment } from '@/gql';
import { MediaListSort, MediaListStatus, MediaType } from '@/gql/graphql';
import useScreenSize from '@/hooks/use-screen-size';
import anilistClient from '@/services/anilist';
import { getProvider } from '@/storage/provider';
import { ActivityIndicator, Button, Text, View } from '@/ui';
import { Card, CardFragment } from '@/ui/card';
import Pressable from '@/ui/core/pressable';
import colors from '@/ui/theme/colors';

const tabList = [
  MediaListStatus.Current,
  MediaListStatus.Planning,
  MediaListStatus.Completed,
  MediaListStatus.Paused,
  MediaListStatus.Dropped,
];

const SPACE_BETWEEN = 32;
const CONTAINER_PADDING = 16;
const LIST_PADDING = 16;

const document = graphql(`
  query AnimeList(
    $userId: Int
    $userName: String
    $type: MediaType
    $status: MediaListStatus
    $sort: [MediaListSort]
  ) {
    MediaListCollection(
      userId: $userId
      userName: $userName
      type: $type
      status: $status
      sort: $sort
    ) {
      lists {
        entries {
          progress
          media {
            id
            ...WatchCard
            ...CardMedia
          }
        }
      }
    }
  }
`);

const AnimeListScreen = () => {
  const navigation = useNavigation();
  const { width } = useScreenSize();
  const [activeTab, setActiveTab] = useState<MediaListStatus>(
    MediaListStatus.Current
  );

  const { data, isLoading, isRefetching, refetch } = useQuery(
    ['MediaListEntry', activeTab],
    async () => {
      const provider = getProvider('anilist');

      if (!provider?.data?.id)
        return { MediaListCollection: { lists: [{ entries: [] }] } };

      return anilistClient.request(document, {
        status: activeTab,
        type: MediaType.Anime,
        userId: provider.data.id as number,
        sort: [MediaListSort.UpdatedTimeDesc],
      });
    }
  );

  return (
    <View className="h-full w-full flex-1 p-4" style={{ flex: 1 }}>
      <View className="mb-4 flex flex-row items-center">
        <Button
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('AnimeHome');
            }
          }}
          className="mr-2 h-7 w-7 bg-transparent p-0"
        >
          <ArrowLeft size={28} color="white" />
        </Button>

        <Text className="text-2xl" weight="semibold">
          Anime List
        </Text>
      </View>

      <FlatList
        data={tabList}
        style={{ overflow: 'visible', flexGrow: 0 }}
        contentContainerStyle={{
          flexGrow: 0,
        }}
        initialScrollIndex={0}
        horizontal
        renderItem={({ item }) => {
          const tab = item;

          return (
            <Pressable
              onPress={() => setActiveTab(tab)}
              style={{
                aspectRatio: 2 / 1,
              }}
              className={twMerge(
                'w-24 rounded-md',
                tab === activeTab ? 'bg-primary-500' : 'bg-thunder-800'
              )}
            >
              <View
                className={twMerge(
                  'w-full h-full flex flex-col items-center justify-center rounded-md'
                )}
              >
                <Text className="text-sm font-semibold">{tab}</Text>
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View className="w-2" />}
      />

      <View className="mt-8" />

      <If condition={isLoading || isRefetching}>
        <Then>
          <ActivityIndicator size={48} color={colors.primary[500]} />
        </Then>

        <Else>
          <If
            condition={!data?.MediaListCollection?.lists?.[0]?.entries?.length}
          >
            <Then>
              <Text className="text-center">There is no anime here.</Text>
            </Then>
          </If>

          <Else>
            <View
              style={{
                marginLeft: LIST_PADDING / 2 + SPACE_BETWEEN / 2,
                flex: 1,
              }}
            >
              <FlashList
                numColumns={2}
                data={data?.MediaListCollection?.lists?.[0]?.entries!}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        width:
                          width / 2 -
                          CONTAINER_PADDING -
                          LIST_PADDING -
                          SPACE_BETWEEN / 2,
                        marginLeft:
                          index % 2 !== 0
                            ? SPACE_BETWEEN - LIST_PADDING * 2
                            : 0,
                        marginBottom: SPACE_BETWEEN,
                      }}
                    >
                      <Card
                        media={item?.media!}
                        containerProps={{ className: 'w-full' }}
                      />
                    </View>
                  );
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={refetch}
                  />
                }
                estimatedItemSize={294}
                keyExtractor={(item) =>
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  useFragment(CardFragment, item!.media)!.id.toString()
                }
              />
            </View>
          </Else>
        </Else>
      </If>
    </View>
  );
};

export default AnimeListScreen;
