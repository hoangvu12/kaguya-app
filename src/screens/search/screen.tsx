import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSetAtom } from 'jotai/react';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useMemo } from 'react';
import { Else, If, Then } from 'react-if';
import Toast from 'react-native-toast-message';

import type { RootStackParamList } from '@/navigation/types';
import {
  ActivityIndicator,
  Button,
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
import ValueList from './components/value-list';
import useSearchMedia from './hooks/use-search-media';
import {
  countryAtom,
  formatAtom,
  genresAtom,
  keywordAtom,
  mediaTypeAtom,
  seasonAtom,
  sortAtom,
  sourceAtom,
  statusAtom,
  tagsAtom,
  yearAtom,
} from './store';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen: React.FC<Props> = ({ route: { params } }) => {
  const setKeyword = useSetAtom(keywordAtom);
  const setYear = useSetAtom(yearAtom);
  const setSeason = useSetAtom(seasonAtom);
  const setFormat = useSetAtom(formatAtom);
  const setCountry = useSetAtom(countryAtom);
  const setGenres = useSetAtom(genresAtom);
  const setTags = useSetAtom(tagsAtom);
  const setSort = useSetAtom(sortAtom);
  const setMediaType = useSetAtom(mediaTypeAtom);
  const setStatus = useSetAtom(statusAtom);
  const setSource = useSetAtom(sourceAtom);

  useEffect(() => {
    if (!params) return;

    if (params.keyword) {
      setKeyword(params.keyword);
    }

    if (params.year) {
      setYear(params.year);
    }

    if (params.season) {
      setSeason(params.season);
    }

    if (params.format) {
      setFormat(params.format);
    }

    if (params.country) {
      setCountry(params.country);
    }

    if (params.genres) {
      setGenres(params.genres);
    }

    if (params.tags) {
      setTags(params.tags);
    }

    if (params.sort) {
      setSort(params.sort);
    }

    if (params.mediaType) {
      setMediaType(params.mediaType);
    }

    if (params.status) {
      setStatus(params.status);
    }

    if (params.source) {
      setSource(params.source);
    }
  }, [
    params,
    setCountry,
    setFormat,
    setGenres,
    setKeyword,
    setMediaType,
    setSeason,
    setSort,
    setSource,
    setStatus,
    setTags,
    setYear,
  ]);

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

  const navigation = useNavigation();

  return (
    <React.Fragment>
      <FocusAwareStatusBar />

      <View className="p-4">
        <View className="flex flex-row items-center">
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

          <MediaTypeSelector />
        </View>

        <View className="mt-4 flex flex-row items-center">
          <SearchInput />

          <SettingsSheet />
        </View>

        <View className="mt-3 flex flex-row items-center justify-between">
          <SortSelector />
          <LayoutSelector />
        </View>

        <View className="mt-3">
          <ValueList />
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
