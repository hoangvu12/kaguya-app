import React, { useMemo } from 'react';
import { Else, If, Then } from 'react-if';
import Toast from 'react-native-toast-message';

import {
  ActivityIndicator,
  colors,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/ui';

import LayoutContainer from './components/layout-container';
import LayoutSelector from './components/layout-selector';
import MediaTypeSelector from './components/media-type-selector';
import SearchInput from './components/search-input';
import SettingsSheet from './components/settings-sheet';
import SortSelector from './components/sort-selector';
import useSearchMedia from './hooks/use-search-media';

const SearchScreen = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useSearchMedia();

  const handleLoadMore = () => {
    if (isFetchingNextPage) {
      return;
    }

    if (!hasNextPage) {
      return Toast.show({
        type: 'info',
        text1: 'You have reached the end of the list',
        position: 'top',
        visibilityTime: 5000,
      });
    }

    Toast.show({ type: 'info', text1: 'Loading more...', position: 'top' });

    fetchNextPage();
  };

  const totalData = useMemo(
    () => data?.pages.flatMap((el) => el.Page?.media).filter(Boolean),
    [data?.pages]
  );

  return (
    <React.Fragment>
      <FocusAwareStatusBar />

      <View className="p-4">
        <MediaTypeSelector />

        <View className="mt-4 flex flex-row items-center">
          <SearchInput />

          <SettingsSheet />
        </View>

        <View className="mt-3 flex flex-row items-center justify-between">
          <SortSelector />
          <LayoutSelector />
        </View>

        <View className="my-4 w-full">
          <If condition={!isLoading && totalData?.length}>
            <Then>
              <View className="min-h-screen">
                <LayoutContainer
                  onLoadMore={handleLoadMore}
                  mediaList={totalData!}
                />
              </View>
            </Then>

            <Else>
              <If condition={isLoading}>
                <Then>
                  <ActivityIndicator color={colors.primary[500]} size={48} />
                </Then>

                <Else>
                  <Text className="text-center text-xl">
                    There is no result.
                  </Text>
                </Else>
              </If>
            </Else>
          </If>
        </View>
      </View>
    </React.Fragment>
  );
};

export default SearchScreen;
