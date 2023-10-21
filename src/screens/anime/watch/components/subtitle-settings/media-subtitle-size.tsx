import { useAtom } from 'jotai/react';
import { TypeIcon } from 'lucide-react-native';
import React, { useEffect } from 'react';

import { Text, View } from '@/ui';
import Input from '@/ui/core/input';

import { DEFAULT_FONT_SIZE, subtitleFontSizeAtom } from '../../store';

const MediaSubtitleSize = () => {
  const [fontSize, setFontSize] = useAtom(subtitleFontSizeAtom);
  const [localFontSize, setLocalFontSize] = React.useState(
    fontSize?.toString() || DEFAULT_FONT_SIZE?.toString()
  );

  useEffect(() => {
    setLocalFontSize(fontSize?.toString() || DEFAULT_FONT_SIZE?.toString());
  }, [fontSize]);

  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center px-4 py-2">
        <TypeIcon size={24} color="white" className="h-6 w-6 text-white" />

        <Text variant="lg" weight="semibold" className="ml-2">
          Font size
        </Text>

        <Text className="ml-4 h-1.5 w-1.5 rounded-full bg-thunder-400" />

        <Input
          keyboardType="numeric"
          className="ml-4"
          value={localFontSize}
          onChangeText={(text) => {
            setLocalFontSize(text);
          }}
          onBlur={() => {
            setFontSize(parseInt(localFontSize, 10));
          }}
        />
      </View>
    </View>
  );
};

export default MediaSubtitleSize;
