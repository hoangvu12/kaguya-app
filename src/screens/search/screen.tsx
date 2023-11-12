import React from 'react';

import searchData from '@/mock_data/search-data.json';
import { FocusAwareStatusBar, ScrollView, View } from '@/ui';

import LayoutContainer from './components/layout-container';
import LayoutSelector from './components/layout-selector';
import MediaTypeSelector from './components/media-type-selector';
import SearchInput from './components/search-input';
import SettingsSheet from './components/settings-sheet';
import SortSelector from './components/sort-selector';

const SearchScreen = () => {
  return (
    <React.Fragment>
      <FocusAwareStatusBar />

      <ScrollView className="p-4">
        <MediaTypeSelector />

        <View className="mt-4 flex flex-row items-center">
          <SearchInput />

          <SettingsSheet />
        </View>

        <View className="mt-3 flex flex-row items-center justify-between">
          <SortSelector />
          <LayoutSelector />
        </View>

        <View className="my-8 w-full">
          <LayoutContainer mediaList={searchData} />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default SearchScreen;
