import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Else, If, Then } from 'react-if';

import { useFragment } from '@/gql';
import useScreenSize from '@/hooks/use-screen-size';
import { useWatched } from '@/hooks/use-watched';
import { ActivityIndicator, Button, Text, View } from '@/ui';
import { Card, CardFragment } from '@/ui/card';
import RefreshControl from '@/ui/core/refresh-control';
import colors from '@/ui/theme/colors';

const SPACE_BETWEEN = 32;
const CONTAINER_PADDING = 16;
const LIST_PADDING = 16;

const RecentlyWatchedScreen = () => {
  const { width } = useScreenSize();

  const { data, isLoading, refetch, isRefetching } = useWatched(0);

  const navigation = useNavigation();

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
          Airing schedule
        </Text>
      </View>

      <If condition={isLoading || isRefetching}>
        <Then>
          <ActivityIndicator size={48} color={colors.primary[500]} />
        </Then>

        <Else>
          <If condition={!data?.length}>
            <Then>
              <Text className="text-center">You haven't watched anything.</Text>
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
                data={data}
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
                        media={item.media}
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
                  useFragment(CardFragment, item.media).id.toString()
                }
              />
            </View>
          </Else>
        </Else>
      </If>
    </View>
  );
};

export default RecentlyWatchedScreen;
