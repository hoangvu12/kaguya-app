import { useAtom } from 'jotai/react';
import { ScalingIcon } from 'lucide-react-native';
import React from 'react';
import { ToastAndroid } from 'react-native';

import { playerResizeMode } from '../store';
import Tappable from './tappable';

const ResizeButton = () => {
  const [resizeMode, setResizeMode] = useAtom(playerResizeMode);

  return (
    <Tappable
      onPress={() => {
        if (resizeMode === 'contain') {
          setResizeMode('cover');

          ToastAndroid.show('Resize mode: cover', ToastAndroid.SHORT);
        } else if (resizeMode === 'cover') {
          setResizeMode('stretch');

          ToastAndroid.show('Resize mode: stretch', ToastAndroid.SHORT);
        } else {
          setResizeMode('contain');

          ToastAndroid.show('Resize mode: contain', ToastAndroid.SHORT);
        }
      }}
    >
      <ScalingIcon size={24} color="white" />
    </Tappable>
  );
};

export default ResizeButton;
