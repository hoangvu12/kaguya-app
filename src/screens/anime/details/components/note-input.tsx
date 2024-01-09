import React from 'react';

import { View } from '@/ui';
import Input from '@/ui/core/input';

interface NoteInputProps {
  note: string | null;
  onNoteChange?: (note: string) => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ onNoteChange, note }) => {
  return (
    <View className="flex grow items-center justify-center rounded-lg border-2 border-thunder-500">
      <Input
        value={note || undefined}
        multiline
        className="z-50 h-auto w-full border-0 p-0 px-5 py-2 font-semibold"
        placeholder="Note"
        onChangeText={(text) => {
          onNoteChange?.(text);
        }}
      />
    </View>
  );
};

export default NoteInput;
