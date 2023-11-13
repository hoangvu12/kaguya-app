import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai/react';
import { SkipForward } from 'lucide-react-native';
import React from 'react';

import { View } from '@/ui';

import { currentEpisodeAtom, sectionEpisodesAtom } from '../store';
import Tappable from './tappable';

const ForwardButton = () => {
  const currentEpisode = useAtomValue(currentEpisodeAtom);
  const sectionEpisodes = useAtomValue(sectionEpisodesAtom);

  const navigation = useNavigation();

  const handlePress = () => {
    if (!currentEpisode) return;

    const currentEpisodeIndex = sectionEpisodes.findIndex(
      (episode) => episode.id === currentEpisode.id
    );

    const nextEpisode = sectionEpisodes[currentEpisodeIndex + 1];

    if (!nextEpisode) return;

    navigation.setParams({ episodeId: nextEpisode.id });
  };

  return (
    <Tappable onPress={handlePress}>
      <View className="bg-transparent">
        <SkipForward size={40} color="white" fill="white" />
      </View>
    </Tappable>
  );
};

export default ForwardButton;
