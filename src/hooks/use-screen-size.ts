import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

import { HEIGHT, WIDTH } from '@/ui';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: WIDTH,
    height: HEIGHT,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      setScreenSize({
        width: screen.width,
        height: screen.height,
      });
    });
    return () => subscription?.remove();
  });

  return screenSize;
};

export default useScreenSize;
