import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { graphql } from '@/gql';
import { useGraphQL } from '@/hooks/use-graphql';
import type { RootStackParamList } from '@/navigation/types';
import { ActivityIndicator, colors, ScrollView, Text, View } from '@/ui';

import AnimeSection from './components/anime-section';
import InfoSection from './components/info-section';
import MangaSection from './components/manga-section';

type Props = NativeStackScreenProps<RootStackParamList, 'CharacterDetails'>;

const document = graphql(`
  query CharacterDetails($id: Int) {
    Character(id: $id) {
      ...CharacterInfo
      ...CharacterAnime
      ...CharacterManga
    }
  }
`);

const CharacterDetailsScreen: React.FC<Props> = ({ route }) => {
  const { characterId } = route.params;

  const { data, isLoading } = useGraphQL(document, { id: characterId });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={colors.primary[500]} size={48} />
      </View>
    );
  }

  if (!data?.Character) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <ScrollView>
        <InfoSection character={data.Character} />

        <View className="mt-8">
          <Text className="mb-1 text-xl font-semibold">Anime</Text>

          <AnimeSection fragmentData={data.Character} />
        </View>

        <View className="mt-8">
          <Text className="mb-1 text-xl font-semibold">Manga</Text>

          <MangaSection fragmentData={data.Character} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CharacterDetailsScreen;
