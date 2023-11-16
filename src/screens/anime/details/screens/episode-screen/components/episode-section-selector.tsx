import { useSetAtom } from 'jotai/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

import type { Episode } from '@/types';
import type { SelectRef } from '@/ui';
import { Button, Text, View } from '@/ui';
import Select from '@/ui/core/select';

import { sectionEpisodesAtom } from '../store';

interface EpisodeSectionSelectorProps {
  episodes: Episode[];
}

const storage = new MMKV();

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

  const [currentSection, setCurrentSection] = useState<string | undefined>(
    () => {
      const section = storage.getString('section');

      if (sections.includes(section)) {
        return section;
      }

      return sections[0] || undefined;
    }
  );

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

  useEffect(() => {
    if (!currentSection) return;

    storage.set('section', currentSection);
  }, [currentSection]);

  useEffect(() => {
    const section = storage.getString('section');

    if (sections.includes(section)) {
      setCurrentSection(section);
    } else {
      setCurrentSection(sections[0] || undefined);
    }
  }, [sections]);

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
          setCurrentSection(option.value || undefined);
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
