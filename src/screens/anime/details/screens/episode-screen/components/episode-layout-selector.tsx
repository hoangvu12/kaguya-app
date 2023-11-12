import { useAtom } from 'jotai/react';
import { Grid2x2Icon, TablePropertiesIcon } from 'lucide-react-native';
import React from 'react';

import { Button, colors, View } from '@/ui';

import { layoutModeAtom } from '../store';

const EpisodeLayoutSelector = () => {
  const [layoutMode, setActiveMode] = useAtom(layoutModeAtom);

  const handleSetMode = (mode: 'details' | 'card') => () => {
    setActiveMode(mode);
  };

  return (
    <View className="mb-4 flex flex-row gap-1">
      <Button
        className="bg-transparent p-0"
        style={{ transform: [{ rotateY: '180deg' }] }}
        onPress={handleSetMode('details')}
      >
        <TablePropertiesIcon
          size={24}
          color={layoutMode === 'details' ? colors.white : colors.neutral[500]}
        />
      </Button>
      <Button className="bg-transparent p-0" onPress={handleSetMode('card')}>
        <Grid2x2Icon
          size={24}
          color={layoutMode === 'card' ? colors.white : colors.neutral[500]}
        />
      </Button>
    </View>
  );
};

export default EpisodeLayoutSelector;
