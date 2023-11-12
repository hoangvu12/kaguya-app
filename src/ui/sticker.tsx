import React from 'react';

import type { ImgProps } from './core';
import { Image } from './core';

const stickers = [
  { image: require('../../assets/stickers/begging.png'), name: 'begging' },
  { image: require('../../assets/stickers/flushed.png'), name: 'flushed' },
  { image: require('../../assets/stickers/persevere.png'), name: 'persevere' },
  { image: require('../../assets/stickers/point_up.png'), name: 'point_up' },
  { image: require('../../assets/stickers/shocked.png'), name: 'shocked' },
  { image: require('../../assets/stickers/smile.png'), name: 'smile' },
  { image: require('../../assets/stickers/sulky.png'), name: 'sulky' },
  { image: require('../../assets/stickers/wink.png'), name: 'wink' },
] as const;

interface StickerProps extends Omit<ImgProps, 'source'> {
  name: (typeof stickers)[number]['name'];
}

const Sticker: React.FC<StickerProps> = ({ name, ...props }) => {
  const sticker = stickers.find((sticker) => sticker.name === name);

  if (!sticker) throw new Error(`Sticker ${name} not found`);

  return <Image source={sticker.image} key={sticker.image} {...props} />;
};

export default Sticker;
