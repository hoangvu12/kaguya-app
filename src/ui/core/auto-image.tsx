import type { ImageSource } from 'expo-image';
import React, { useEffect, useMemo, useState } from 'react';
import { Image as RNImage } from 'react-native';

import { Image } from '@/ui/core/image';

import type { ImgProps } from './image';

type Props = {
  width?: number;
  height?: number;
  loadingWidth?: number;
  loadingHeight?: number;
  source: ImageSource;
  onSize?: (width: number, height: number) => void;
};

export type AutoImageProps = Props & Omit<ImgProps, 'source'>;

const AutoImage = ({
  source,
  width: initialWidth,
  height: initialHeight,
  loadingWidth = 0,
  loadingHeight = 0,
  onSize,
  ...props
}: AutoImageProps) => {
  const [imgWidth, setImgWidth] = useState(loadingWidth);
  const [imgHeight, setImgHeight] = useState(loadingHeight);

  useEffect(() => {
    const url = source.uri;

    if (!url) return;

    RNImage.getSize(url, (width, height) => {
      onSize?.(width, height);

      if (initialWidth) {
        setImgWidth(initialWidth);
        setImgHeight(height * (initialWidth / width));
      } else if (initialHeight) {
        setImgWidth(width * (initialHeight / height));
        setImgHeight(initialHeight);
      } else {
        setImgWidth(width);
        setImgHeight(height);
      }
    });
  }, [initialHeight, initialWidth, onSize, source.uri]);

  const aspectRatio = useMemo(() => {
    const ratio = imgWidth / imgHeight;

    if (isNaN(ratio) || ratio === Infinity) {
      return null;
    }

    return imgWidth / imgHeight;
  }, [imgHeight, imgWidth]);

  return (
    <Image
      source={{ width: imgWidth, height: imgHeight, ...source }}
      style={{ ...(aspectRatio && { aspectRatio }) }}
      {...props}
    />
  );
};

export default AutoImage;
