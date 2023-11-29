import type { ImageProps } from 'expo-image';
import { Image as NImage } from 'expo-image';
import { styled } from 'nativewind';
import * as React from 'react';

const SImage = styled(NImage);
export type ImgProps = ImageProps & {
  className?: string;
};

export const Image = ({
  style,
  className,
  placeholder = 'L0Eyb[xufQxu-;fQfQfQfQfQfQfQ',
  source,
  ...props
}: ImgProps) => {
  const [isError, setIsError] = React.useState(false);

  return (
    <SImage
      className={className}
      placeholder={placeholder}
      style={style}
      transition={{
        effect: 'cross-dissolve',
        duration: 200,
      }}
      onError={() => setIsError(true)}
      source={isError ? require('../../../assets/image-fallback.png') : source}
      {...props}
    />
  );
};

export const preloadImages = (sources: string[]) => {
  NImage.prefetch(sources);
};
