import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai/react';
import React, { useEffect, useRef } from 'react';
import { Else, If, Then } from 'react-if';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';
import { currentModuleIdAtom } from '@/store';
import type { SearchResult } from '@/types';
import { ActivityIndicator, colors, Text, TouchableOpacity, View } from '@/ui';
import BottomSheet from '@/ui/core/bottom-sheet';
import Input from '@/ui/core/input';

import useAnimeSearch from '../hooks/use-anime-search';
import GridList from './grid-list';

export const WrongTitleFragment = graphql(`
  fragment WrongTitle on Media {
    id
    title {
      english
    }
  }
`);

interface WrongTitleProps {
  media: FragmentType<typeof WrongTitleFragment>;
}

const WrongTitle: React.FC<WrongTitleProps> = ({ media: mediaFragment }) => {
  const media = useFragment(WrongTitleFragment, mediaFragment);
  const [shouldFetch, setShouldFetch] = React.useState(false);

  const currentModuleId = useAtomValue(currentModuleIdAtom);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [searchQuery, setSearchQuery] = React.useState(
    media.title?.english || ''
  );
  const [tempSearchQuery, setTempSearchQuery] = React.useState('');

  const searchQueryTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading } = useAnimeSearch(searchQuery, {
    enabled: shouldFetch,
  });

  const queryClient = useQueryClient();

  const handleOpen = () => {
    bottomSheetRef.current?.present();

    setShouldFetch(true);
  };

  useEffect(() => {
    setTempSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchResultPress = (item: SearchResult) => {
    queryClient.setQueryData(['animeId', media.id, currentModuleId], {
      data: item.id,
      extraData: item.extra,
    });

    bottomSheetRef.current?.dismiss();
  };

  return (
    <React.Fragment>
      <TouchableOpacity onPress={handleOpen}>
        <Text className="underline" weight="semibold">
          Wrong title?
        </Text>
      </TouchableOpacity>

      <BottomSheet
        useScrollView={false}
        onClose={() => {
          setShouldFetch(false);
        }}
        ref={bottomSheetRef}
        snapPoints={['80%']}
      >
        <View className="p-4">
          <Input
            className="text-white"
            placeholder="Search title..."
            value={tempSearchQuery}
            onChangeText={(text) => {
              setTempSearchQuery(text);

              if (searchQueryTimeout.current) {
                clearTimeout(searchQueryTimeout.current);
              }

              searchQueryTimeout.current = setTimeout(() => {
                setSearchQuery(text);
              }, 500);
            }}
            onSubmitEditing={() => {
              setSearchQuery(tempSearchQuery);

              if (searchQueryTimeout.current) {
                clearTimeout(searchQueryTimeout.current);
              }
            }}
            onBlur={() => {
              setSearchQuery(tempSearchQuery);

              if (searchQueryTimeout.current) {
                clearTimeout(searchQueryTimeout.current);
              }
            }}
          />

          <Text variant="lg" className="mt-2 mb-4">
            Search results for{' '}
            <Text variant="lg" weight="semibold">
              "{searchQuery}"
            </Text>
          </Text>

          <If condition={!searchQuery}>
            <Then>
              <Text className="text-center">Please type in keyword</Text>
            </Then>

            <Else>
              <If condition={isLoading}>
                <Then>
                  <ActivityIndicator color={colors.primary[500]} size={48} />
                </Then>

                <Else>
                  <If condition={!data?.length}>
                    <Then>
                      <Text className="text-center">No anime found</Text>
                    </Then>

                    <Else>
                      <GridList
                        onSelect={handleSearchResultPress}
                        searchResults={data!}
                      />
                    </Else>
                  </If>
                </Else>
              </If>
            </Else>
          </If>
        </View>
      </BottomSheet>
    </React.Fragment>
  );
};

export default WrongTitle;
