import React from 'react';

import { View } from '@/ui';
import Input from '@/ui/core/input';

interface RepeatInputProps {
  repeat: number | null;
  onRepeatChange?: (repeat: number) => void;
}

const RepeatInput: React.FC<RepeatInputProps> = ({
  onRepeatChange,
  repeat,
}) => {
  const [localRepeat, setLocalRepeat] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLocalRepeat(repeat?.toString() || null);
  }, [repeat]);

  return (
    <View className="flex grow items-center justify-center rounded-lg border-2 border-thunder-500">
      <Input
        value={localRepeat?.toString() || undefined}
        keyboardType="number-pad"
        numberOfLines={1}
        className="z-50 h-auto w-full border-0 p-0 px-5 py-2 font-semibold"
        placeholder="Repeat"
        onChangeText={(text) => {
          setLocalRepeat(text);
        }}
        onBlur={() => {
          if (localRepeat === null || localRepeat === undefined) return;

          let number = Number(localRepeat);

          if (Number.isNaN(number) || number < 0) {
            number = 0;
          } else if (number > 10) {
            number = 10;
          }

          onRepeatChange?.(number);
        }}
      />
    </View>
  );
};

export default RepeatInput;
