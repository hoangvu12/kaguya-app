import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useAtomValue, useSetAtom } from 'jotai/react';
import { ChevronDown, LayersIcon } from 'lucide-react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { twMerge } from 'tailwind-merge';

import type { Episode } from '@/types';
import { Button, chunk, Text, View } from '@/ui';
import BottomSheet from '@/ui/core/bottom-sheet';
import type { TriggerProps } from '@/ui/core/select';
import Select from '@/ui/core/select';
import colors from '@/ui/theme/colors';

import EpisodeCard from '../../components/episode-card';
import {
  currentEpisodeAtom,
  episodesAtom,
  sectionEpisodesAtom,
} from '../store';
import Tappable from './tappable';

const CARD_WIDTH = 160;
const CARD_HEIGHT = 160 * (9 / 16);

const chunkToLabel = (chunk: Episode[]) => {
  const firstEpisode = chunk[0];
  const lastEpisode = chunk[chunk.length - 1];

  let label = firstEpisode.number;

  if (firstEpisode.number !== lastEpisode.number) {
    label += ` - ${lastEpisode.number}`;
  }

  return label;
};

const EpisodesButton = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const episodes = useAtomValue(episodesAtom);
  const setSectionEpisodes = useSetAtom(sectionEpisodesAtom);
  const currentEpisode = useAtomValue(currentEpisodeAtom);

  const navigation = useNavigation();

  const handleSetEpisode = (episode: Episode) => {
    navigation.setParams({ episodeId: episode.id });
  };

  const sections = useMemo(() => {
    const episodeSections = Array.from(
      new Set(episodes.map((episode) => episode.section))
    );

    if (episodeSections?.length === 1) return [];

    return episodeSections;
  }, [episodes]);

  const [currentSection, setCurrentSection] = useState(sections[0]);

  const sectionEpisodes = useMemo(() => {
    if (sections?.length <= 1) return episodes;

    return episodes.filter((episode) => episode.section === currentSection);
  }, [sections?.length, episodes, currentSection]);

  const chunks = useMemo(() => {
    return chunk(sectionEpisodes, 16);
  }, [sectionEpisodes]);

  const [currentChunk, setCurrentChunk] = useState(chunks[0]);

  useEffect(() => {
    if (!chunks?.length) return;

    setCurrentChunk(chunks[0]);
  }, [chunks]);

  useEffect(() => {
    setSectionEpisodes(sectionEpisodes);
  }, [sectionEpisodes, setSectionEpisodes]);

  return (
    <View>
      <Tappable
        onPress={() => {
          bottomSheetRef.current?.present();
        }}
      >
        <View className="ml-auto bg-transparent p-0">
          <LayersIcon size={28} color={colors.white} />
        </View>
      </Tappable>

      <BottomSheet ref={bottomSheetRef} snapPoints={[CARD_HEIGHT * 3]}>
        {sections?.length > 1 && (
          <Select
            trigger={({ selectedOption, openBottomSheet }) => (
              <Button
                className="self-start bg-thunder-800 px-4 py-3"
                onPress={openBottomSheet}
              >
                <Text>{selectedOption?.value || 'Default'}</Text>
              </Button>
            )}
            onSelect={(option) => {
              setCurrentSection(option.value);
            }}
            placeholder="Select a section"
            options={sections.map((section) => ({
              label: section || 'Default',
              value: section,
            }))}
            selectedOption={{
              label: currentSection || 'Default',
              value: currentSection,
            }}
            snapPoints={['80%']}
          />
        )}

        <View className="mb-4 flex flex-row justify-between">
          <FlatList
            className="w-5/6"
            data={chunks}
            renderItem={({ item, index }) => {
              const label = chunkToLabel(item);

              const chunkIndex = chunks.findIndex((chunk) => {
                return chunkToLabel(chunk) === chunkToLabel(currentChunk);
              });

              return (
                <Button
                  onPress={() => {
                    setCurrentChunk(item);
                  }}
                  className={twMerge(
                    'h-10',
                    chunkIndex !== index ? 'bg-thunder-700' : 'bg-primary-500'
                  )}
                >
                  <Text>{label}</Text>
                </Button>
              );
            }}
            horizontal
            keyExtractor={(item) => chunkToLabel(item)}
            ItemSeparatorComponent={() => <View className="mx-1" />}
            extraData={{ currentChunk }}
          />

          {chunks?.length > 10 && (
            <Select
              trigger={Trigger}
              onSelect={(option) => {
                setCurrentChunk(option.value);
              }}
              placeholder="Select chunk"
              selectedOption={{
                label: chunkToLabel(currentChunk),
                value: currentChunk,
              }}
              options={chunks.map((chunk) => ({
                label: chunkToLabel(chunk),
                value: chunk,
              }))}
              snapPoints={['80%']}
            />
          )}
        </View>

        {currentChunk?.length && (
          <FlatList
            horizontal
            data={currentChunk}
            renderItem={({ item }) => (
              <EpisodeCard
                episode={item}
                onPress={() => {
                  handleSetEpisode(item);

                  bottomSheetRef.current?.dismiss();
                }}
                shouldHighlight={item.id === currentEpisode?.id}
                style={{ width: CARD_WIDTH }}
              />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="mx-1" />}
          />
        )}
      </BottomSheet>
    </View>
  );
};

const Trigger: React.FC<TriggerProps<Episode[]>> = ({ openBottomSheet }) => {
  return (
    <Button
      className="ml-2 h-full w-1/6 bg-thunder-900 p-0 shadow-2xl"
      onPress={openBottomSheet}
    >
      <ChevronDown color={colors.white} size={24} />
    </Button>
  );
};

export default EpisodesButton;
