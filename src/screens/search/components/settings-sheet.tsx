import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useAtomValue } from 'jotai/react';
import { Filter } from 'lucide-react-native';
import React, { useRef } from 'react';

import { MediaType } from '@/gql/graphql';
import { Button, Text, View } from '@/ui';
import BottomSheet from '@/ui/core/bottom-sheet';

import { mediaTypeAtom } from '../store';
import CountrySelector from './country-selector';
import FormatSelector from './format-selector';
import GenresSelector from './genres-selector';
import SeasonSelector from './season-selector';
import SourceSelector from './source-selector';
import StatusSelector from './status-selector';
import TagsSelector from './tags-selector';
import YearSelector from './year-selector';

const SettingsSheet = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const mediaType = useAtomValue(mediaTypeAtom);

  return (
    <React.Fragment>
      <Button
        onPress={() => {
          bottomSheetRef.current?.present();
        }}
        className="bg-thunder-800"
      >
        <Filter size={24} color="white" />
      </Button>

      <BottomSheet snapPoints={['80%']} ref={bottomSheetRef}>
        <Text className="mb-6 text-2xl" weight="bold">
          Filters
        </Text>

        <View className="flex flex-row flex-wrap justify-between gap-2">
          <View className="grow">
            <YearSelector />
          </View>

          {mediaType === MediaType.Anime ? (
            <View className="grow">
              <SeasonSelector />
            </View>
          ) : null}

          <View className="grow">
            <FormatSelector />
          </View>

          <View className="grow">
            <CountrySelector />
          </View>

          <View className="grow">
            <StatusSelector />
          </View>

          <View className="grow">
            <SourceSelector />
          </View>
        </View>

        <View className="my-4 h-0.5 w-full bg-thunder-500" />

        <View className="mb-4">
          <Text variant="lg" weight="semibold" className="mb-1">
            Genres
          </Text>

          <GenresSelector />
        </View>

        <View>
          <Text variant="lg" weight="semibold" className="mb-1">
            Tags
          </Text>

          <TagsSelector />
        </View>
      </BottomSheet>
    </React.Fragment>
  );
};

export default SettingsSheet;
