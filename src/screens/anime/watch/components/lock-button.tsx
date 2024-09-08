import { useSetAtom } from 'jotai/react';
import { LockIcon } from 'lucide-react-native';
import React from 'react';

import { isLockedAtom } from '../store';
import Tappable from './tappable';

const LockButton = () => {
  const setIsLocked = useSetAtom(isLockedAtom);

  return (
    <Tappable
      onPress={() => {
        setIsLocked(true);
      }}
    >
      <LockIcon size={24} color="white" />
    </Tappable>
  );
};

export default LockButton;
