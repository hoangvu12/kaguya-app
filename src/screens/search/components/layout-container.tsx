import { useAtomValue } from 'jotai/react';
import React from 'react';

import type { FragmentType } from '@/gql';
import { graphql, useFragment } from '@/gql';

import { layoutAtom } from '../store';
import DetailsList from './details-list';
import GridList from './grid-list';

export const SearchLayoutContainerFragment = graphql(`
  fragment SearchLayoutContainer on Media {
    ...CardMedia
    ...DetailsCard
  }
`);

interface LayoutContainerProps {
  mediaList: FragmentType<typeof SearchLayoutContainerFragment>[];
  onLoadMore: () => void;
  refetch: () => void;
  isRefetching: boolean;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({
  mediaList: mediaListProps,
  onLoadMore,
  isRefetching,
  refetch,
}) => {
  const layout = useAtomValue(layoutAtom);

  const mediaListFragment = useFragment(
    SearchLayoutContainerFragment,
    mediaListProps
  );

  if (layout === 'grid') {
    return (
      <GridList
        isRefetching={isRefetching}
        refetch={refetch}
        onLoadMore={onLoadMore}
        mediaList={mediaListFragment}
      />
    );
  }

  return (
    <DetailsList
      isRefetching={isRefetching}
      refetch={refetch}
      onLoadMore={onLoadMore}
      mediaList={mediaListFragment}
    />
  );
};

export default LayoutContainer;
