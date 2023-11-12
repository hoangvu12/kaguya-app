import { FlashList } from '@shopify/flash-list';
import { useAtom, useAtomValue } from 'jotai/react';
import { ChevronDown } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import type { Episode } from '@/types';
import { Button, Text, View } from '@/ui';
import type { SelectRef, TriggerProps } from '@/ui/core/select';
import Select from '@/ui/core/select';
import colors from '@/ui/theme/colors';

import {
  episodeChunkAtom,
  episodeChunksAtom,
  sectionEpisodesAtom,
} from '../store';

const chunkToLabel = (chunk: Episode[]) => {
  const firstEpisode = chunk[0];
  const lastEpisode = chunk[chunk.length - 1];

  let label = firstEpisode.number;

  if (firstEpisode.number !== lastEpisode.number) {
    label += ` - ${lastEpisode.number}`;
  }

  return label;
};

const EpisodeChunkSelector = () => {
  const chunks = useAtomValue(episodeChunksAtom);
  const [currentChunk, setCurrentChunk] = useAtom(episodeChunkAtom);
  const sectionEpisodes = useAtomValue(sectionEpisodesAtom);

  const flatListRef = useRef<FlashList<Episode[]>>(null);
  const selectRef = useRef<SelectRef>(null);

  useEffect(() => {
    if (!chunks.length) {
      return;
    }

    if (!currentChunk.length) {
      setCurrentChunk(chunks[0]);
    }
  }, [currentChunk, chunks, setCurrentChunk]);

  useEffect(() => {
    if (!chunks.length) {
      setCurrentChunk([]);

      return;
    }

    setCurrentChunk(chunks[0]);
  }, [sectionEpisodes, chunks, setCurrentChunk]);

  useEffect(() => {
    if (!currentChunk?.length) return;

    const index = chunks.findIndex((chunk) => chunk === currentChunk);

    if (index === -1) return;

    flatListRef.current?.scrollToIndex({
      index,
    });
  }, [chunks, currentChunk]);

  if (chunks.length <= 1 || !currentChunk.length) return null;

  return (
    <View className="mb-4 flex flex-row">
      <FlashList
        ref={flatListRef}
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
                chunkIndex !== index ? 'bg-thunder-900' : 'bg-primary-500'
              )}
            >
              <Text>{label}</Text>
            </Button>
          );
        }}
        horizontal
        keyExtractor={(item, index) => index.toString() + item[0].id}
        ItemSeparatorComponent={() => <View className="mx-1" />}
      />

      <Select
        ref={selectRef}
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

export default EpisodeChunkSelector;
