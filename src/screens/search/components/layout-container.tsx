import { useAtomValue } from 'jotai/react';
import React from 'react';

import type { Media } from '@/types/anilist';

import { layoutAtom } from '../store';
import DetailsList from './details-list';
import GridList from './grid-list';

interface LayoutContainerProps {
  mediaList: Media[];
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ mediaList }) => {
  const layout = useAtomValue(layoutAtom);

  if (layout === 'grid') {
    return <GridList mediaList={mediaList} />;
  }

  return <DetailsList mediaList={mediaList} />;
};

export default LayoutContainer;
