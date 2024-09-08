import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ShuffleIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';

import { graphql } from '@/gql';
import anilistClient from '@/services/anilist';
import { ActivityIndicator, Button, Text } from '@/ui';

const randomAnimeDocument = graphql(`
  query GetMedia($page: Int!) {
    Page(page: $page, perPage: 1) {
      media(type: ANIME, isAdult: false) {
        id
      }
    }
  }
`);

// Last updated: 2024-09-08
const totalAnimeCount = 17151;

const RandomAnime = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [shouldShowLuckyText, setShouldShowLuckyText] = useState(false);

  useFocusEffect(() => {
    // 20% chance to show the lucky text
    if (Math.random() < 0.2) {
      setShouldShowLuckyText(true);
    }
  });

  const handlePress = async () => {
    setIsLoading(true);

    const randomPage = Math.ceil(Math.random() * totalAnimeCount);

    const randomAnimeResponse = await anilistClient.request(
      randomAnimeDocument,
      {
        page: randomPage,
      }
    );

    const id = randomAnimeResponse?.Page?.media?.[0]?.id;

    setIsLoading(false);

    if (!id) {
      ToastAndroid.show(
        'Cannot find any anime, you are unlucky!',
        ToastAndroid.SHORT
      );

      return;
    }

    navigation.navigate('AnimeDetails', {
      mediaId: id,
    });
  };

  return (
    <Button
      onPress={handlePress}
      variant="defaults"
      className="grow bg-thunder-800"
    >
      {isLoading ? (
        <ActivityIndicator className="h-6 w-6" color="white" />
      ) : (
        <ShuffleIcon size={24} color="white" />
      )}

      <Text className="ml-1">
        {shouldShowLuckyText ? 'I feel lucky' : 'Random Anime'}
      </Text>
    </Button>
  );
};

export default RandomAnime;
