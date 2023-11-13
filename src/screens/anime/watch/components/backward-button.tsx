import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai/react';
import { SkipBackIcon } from 'lucide-react-native';
import React from 'react';

import { View } from '@/ui';

import { currentEpisodeAtom, sectionEpisodesAtom } from '../store';
import Tappable from './tappable';

const BackwardButton = () => {
  const currentEpisode = useAtomValue(currentEpisodeAtom);
  const sectionEpisodes = useAtomValue(sectionEpisodesAtom);

  const navigation = useNavigation();

  const handlePress = () => {
    if (!currentEpisode) return;

    const currentEpisodeIndex = sectionEpisodes.findIndex(
      (episode) => episode.id === currentEpisode.id
    );

    const prevEpisode = sectionEpisodes[currentEpisodeIndex - 1];

    if (!prevEpisode) return;

    navigation.setParams({ episodeId: prevEpisode.id });
  };

  return (
    <Tappable onPress={handlePress}>
      <View className="bg-transparent">
        <SkipBackIcon size={40} color="white" fill="white" />
      </View>
    </Tappable>
  );
};

export default BackwardButton;
