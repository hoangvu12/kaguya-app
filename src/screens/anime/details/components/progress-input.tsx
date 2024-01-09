import React from 'react';

import { Button, Text, View } from '@/ui';
import Input from '@/ui/core/input';

interface ProgressInputProps {
  progress: number | null;
  onProgressChange?: (progress: number) => void;
  totalProgress: number | null;
}

const ProgressInput: React.FC<ProgressInputProps> = ({
  onProgressChange,
  progress,
  totalProgress,
}) => {
  const [localProgress, setLocalProgress] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLocalProgress(progress?.toString() || null);
  }, [progress]);

  return (
    <View className="flex flex-row">
      <View className="relative mr-2 flex grow items-center justify-center rounded-lg border-2 border-thunder-500">
        <Input
          value={localProgress?.toString() || undefined}
          keyboardType="number-pad"
          numberOfLines={1}
          className="relative z-50 h-auto w-full border-0 p-0 px-5 py-2 font-semibold"
          placeholder="Progress"
          onChangeText={(text) => {
            setLocalProgress(text);
          }}
          onBlur={() => {
            if (localProgress === null || localProgress === undefined) return;

            let number = Number(localProgress);

            if (Number.isNaN(number) || number < 0) {
              number = 0;
            } else if (number > 10) {
              number = 10;
            }

            onProgressChange?.(number);
          }}
        />

        <View className="pointer-events-none absolute right-4 z-10">
          <Text weight="semibold" className="text-gray-300">
            / {totalProgress ?? '??'}
          </Text>
        </View>
      </View>

      <Button
        onPress={() => {
          onProgressChange?.((progress || 0) + 1);
        }}
        className="aspect-square shrink-0 rounded-lg border-2 border-thunder-500 bg-transparent py-2"
      >
        <Text>+1</Text>
      </Button>
    </View>
  );
};

export default ProgressInput;
