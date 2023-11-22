import React, { useMemo } from 'react';

import { graphql } from '@/gql';
import { useGraphQL } from '@/hooks/use-graphql';
import { getSeason, Text } from '@/ui';
import CardSwiper, { CardSwiperSkeleton } from '@/ui/card-swiper';

const document = graphql(`
  query PopularThisSeason($season: MediaSeason, $seasonYear: Int) {
    Page(page: 1, perPage: 10) {
      media(
        type: ANIME
        sort: [POPULARITY_DESC]
        season: $season
        seasonYear: $seasonYear
        isAdult: false
        countryOfOrigin: "JP"
      ) {
        ...CardMedia
      }
    }
  }
`);

const PopularThisSeason = () => {
  const { season, year } = useMemo(() => {
    return getSeason();
  }, []);

  const { data, isLoading } = useGraphQL(document, {
    season,
    seasonYear: year,
  });

  const mediaList = data?.Page?.media?.filter(Boolean);

  if (isLoading) {
    return <CardSwiperSkeleton />;
  }

  if (!mediaList?.length) return <Text>There are no animes.</Text>;

  return <CardSwiper data={mediaList} />;
};

export default PopularThisSeason;
