import { useAtom } from 'jotai/react';
import { Grid2x2Icon, TablePropertiesIcon } from 'lucide-react-native';
import React from 'react';

import { Button, colors, View } from '@/ui';

import { layoutAtom } from '../store';

const LayoutSelector = () => {
  const [layoutMode, setLayout] = useAtom(layoutAtom);

  const handleSetLayout = (layoutMode: 'grid' | 'details') => () => {
    setLayout(layoutMode);
  };

  return (
    <View className="flex flex-row justify-end">
      <Button className="bg-transparent p-0" onPress={handleSetLayout('grid')}>
        <Grid2x2Icon
          size={24}
          color={layoutMode === 'grid' ? colors.white : colors.neutral[500]}
        />
      </Button>

      <Button
        className="ml-1 bg-transparent p-0"
        style={{ transform: [{ rotateY: '180deg' }] }}
        onPress={handleSetLayout('details')}
      >
        <TablePropertiesIcon
          size={24}
          color={layoutMode === 'details' ? colors.white : colors.neutral[500]}
        />
      </Button>
    </View>
  );
};

export default LayoutSelector;
