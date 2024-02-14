import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';

import { graphql } from '@/gql';
import { useGraphQL } from '@/hooks/use-graphql';
import { Text } from '@/ui';
import CardSwiper, { CardSwiperSkeleton } from '@/ui/card-swiper';

const document = graphql(`
  query AiringSchedule($airingAt_greater: Int, $airingAt_lesser: Int) {
    Page(page: 1, perPage: 20) {
      airingSchedules(
        airingAt_greater: $airingAt_greater
        airingAt_lesser: $airingAt_lesser
        sort: [TIME_DESC]
      ) {
        media {
          isAdult
          ...CardMedia
        }
      }
    }
  }
`);

const AiringTodayList = () => {
  const today = dayjs();

  const airingAt_greater = today.startOf('day').unix();
  const airingAt_lesser = today.endOf('day').unix();

  const { data, isLoading, refetch } = useGraphQL(document, {
    airingAt_greater,
    airingAt_lesser,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const mediaList = data?.Page?.airingSchedules
    ?.map((schedule) => schedule?.media)
    ?.filter((media) => !media?.isAdult)
    ?.filter(Boolean);

  if (isLoading) {
    return <CardSwiperSkeleton />;
  }

  if (!mediaList?.length) return <Text>There are no airing animes today.</Text>;

  return <CardSwiper data={mediaList} />;
};

export default AiringTodayList;
