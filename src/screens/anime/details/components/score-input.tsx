import React from 'react';

import { Text, View } from '@/ui';
import Input from '@/ui/core/input';

interface ScoreInputProps {
  score: number | null;
  onScoreChange?: (progress: number) => void;
}

const ScoreInput: React.FC<ScoreInputProps> = ({
  onScoreChange: onProgressChange,
  score,
}) => {
  const [localScore, setLocalScore] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLocalScore(score?.toString() || null);
  }, [score]);

  return (
    <View className="relative flex grow items-center justify-center rounded-lg border-2 border-thunder-500">
      <Input
        value={localScore?.toString() || undefined}
        keyboardType="number-pad"
        numberOfLines={1}
        className="relative z-50 h-auto w-full border-0 p-0 px-5 py-2 font-semibold"
        placeholder="Score"
        onChangeText={(text) => {
          setLocalScore(text);
        }}
        onBlur={() => {
          if (localScore === null || localScore === undefined) return;

          let number = Number(localScore);

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
          / 10
        </Text>
      </View>
    </View>
  );
};

export default ScoreInput;
