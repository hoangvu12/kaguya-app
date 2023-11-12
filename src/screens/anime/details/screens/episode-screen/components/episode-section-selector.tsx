import { useSetAtom } from 'jotai/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import type { Episode } from '@/types';
import type { SelectRef } from '@/ui';
import { Button, Text, View } from '@/ui';
import Select from '@/ui/core/select';

import { sectionEpisodesAtom } from '../store';

interface EpisodeSectionSelectorProps {
  episodes: Episode[];
}

const EpisodeSectionSelector: React.FC<EpisodeSectionSelectorProps> = ({
  episodes,
}) => {
  const selectRef = useRef<SelectRef>(null);

  const setSectionEpisodes = useSetAtom(sectionEpisodesAtom);

  const sections = useMemo(() => {
    const episodeSections = Array.from(
      new Set(episodes.map((episode) => episode.section))
    );

    if (episodeSections.length === 1) return [];

    return episodeSections;
  }, [episodes]);

  const [currentSection, setCurrentSection] = useState(sections[0]);

  const sectionEpisodes = useMemo(() => {
    if (sections.length <= 1) return episodes;

    return episodes.filter((episode) => episode.section === currentSection);
  }, [sections.length, episodes, currentSection]);

  useEffect(() => {
    if (!episodes.length) {
      setSectionEpisodes([]);
    } else {
      setSectionEpisodes(sectionEpisodes);
    }
  }, [episodes.length, sectionEpisodes, setSectionEpisodes]);

  if (!sections.length) return null;

  return (
    <View className="mb-4">
      <Select
        ref={selectRef}
        trigger={({ selectedOption, openBottomSheet }) => (
          <Button
            className="w-full bg-thunder-900 px-4 py-3"
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
    </View>
  );
};

export default EpisodeSectionSelector;
