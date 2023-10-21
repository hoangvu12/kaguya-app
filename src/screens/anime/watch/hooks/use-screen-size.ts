import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
  }>(Dimensions.get('screen'));

  useEffect(() => {
    const handleScreenChange = ({ screen }: any) => {
      setScreenSize({
        width: screen.width,
        height: screen.height,
      });
    };

    const sub = Dimensions.addEventListener('change', handleScreenChange);

    setScreenSize(Dimensions.get('screen'));

    return () => {
      sub.remove();
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
