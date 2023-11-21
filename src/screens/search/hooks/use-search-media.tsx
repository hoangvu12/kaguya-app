import type { VariablesOf } from '@graphql-typed-document-node/core';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai/react';

import { graphql } from '@/gql';
import anilistClient from '@/services/anilist';

import {
  countryAtom,
  formatAtom,
  genresAtom,
  keywordAtom,
  mediaTypeAtom,
  seasonAtom,
  sortAtom,
  sourceAtom,
  statusAtom,
  tagsAtom,
  yearAtom,
} from '../store';

const document = graphql(`
  query Media(
    $page: Int = 1
    $perPage: Int = 20
    $id: Int
    $idMal: Int
    $startDate: FuzzyDateInt
    $endDate: FuzzyDateInt
    $season: MediaSeason
    $seasonYear: Int
    $type: MediaType
    $format: MediaFormat
    $status: MediaStatus
    $episodes: Int
    $duration: Int
    $chapters: Int
    $volumes: Int
    $isAdult: Boolean
    $genre: String
    $tag: String
    $minimumTagRank: Int
    $tagCategory: String
    $onList: Boolean
    $licensedBy: String
    $licensedById: Int
    $averageScore: Int
    $popularity: Int
    $source: MediaSource
    $countryOfOrigin: CountryCode
    $isLicensed: Boolean
    $search: String
    $id_not: Int
    $id_in: [Int]
    $id_not_in: [Int]
    $idMal_not: Int
    $idMal_in: [Int]
    $idMal_not_in: [Int]
    $startDate_greater: FuzzyDateInt
    $startDate_lesser: FuzzyDateInt
    $startDate_like: String
    $endDate_greater: FuzzyDateInt
    $endDate_lesser: FuzzyDateInt
    $endDate_like: String
    $format_in: [MediaFormat]
    $format_not: MediaFormat
    $format_not_in: [MediaFormat]
    $status_in: [MediaStatus]
    $status_not: MediaStatus
    $status_not_in: [MediaStatus]
    $episodes_greater: Int
    $episodes_lesser: Int
    $duration_greater: Int
    $duration_lesser: Int
    $chapters_greater: Int
    $chapters_lesser: Int
    $volumes_greater: Int
    $volumes_lesser: Int
    $genre_in: [String]
    $genre_not_in: [String]
    $tag_in: [String]
    $tag_not_in: [String]
    $tagCategory_in: [String]
    $tagCategory_not_in: [String]
    $licensedBy_in: [String]
    $licensedById_in: [Int]
    $averageScore_not: Int
    $averageScore_greater: Int
    $averageScore_lesser: Int
    $popularity_not: Int
    $popularity_greater: Int
    $popularity_lesser: Int
    $source_in: [MediaSource]
    $sort: [MediaSort]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        id: $id
        idMal: $idMal
        startDate: $startDate
        endDate: $endDate
        season: $season
        seasonYear: $seasonYear
        type: $type
        format: $format
        status: $status
        episodes: $episodes
        duration: $duration
        chapters: $chapters
        volumes: $volumes
        isAdult: $isAdult
        genre: $genre
        tag: $tag
        minimumTagRank: $minimumTagRank
        tagCategory: $tagCategory
        onList: $onList
        licensedBy: $licensedBy
        licensedById: $licensedById
        averageScore: $averageScore
        popularity: $popularity
        source: $source
        countryOfOrigin: $countryOfOrigin
        isLicensed: $isLicensed
        search: $search
        id_not: $id_not
        id_in: $id_in
        id_not_in: $id_not_in
        idMal_not: $idMal_not
        idMal_in: $idMal_in
        idMal_not_in: $idMal_not_in
        startDate_greater: $startDate_greater
        startDate_lesser: $startDate_lesser
        startDate_like: $startDate_like
        endDate_greater: $endDate_greater
        endDate_lesser: $endDate_lesser
        endDate_like: $endDate_like
        format_in: $format_in
        format_not: $format_not
        format_not_in: $format_not_in
        status_in: $status_in
        status_not: $status_not
        status_not_in: $status_not_in
        episodes_greater: $episodes_greater
        episodes_lesser: $episodes_lesser
        duration_greater: $duration_greater
        duration_lesser: $duration_lesser
        chapters_greater: $chapters_greater
        chapters_lesser: $chapters_lesser
        volumes_greater: $volumes_greater
        volumes_lesser: $volumes_lesser
        genre_in: $genre_in
        genre_not_in: $genre_not_in
        tag_in: $tag_in
        tag_not_in: $tag_not_in
        tagCategory_in: $tagCategory_in
        tagCategory_not_in: $tagCategory_not_in
        licensedBy_in: $licensedBy_in
        licensedById_in: $licensedById_in
        averageScore_not: $averageScore_not
        averageScore_greater: $averageScore_greater
        averageScore_lesser: $averageScore_lesser
        popularity_not: $popularity_not
        popularity_greater: $popularity_greater
        popularity_lesser: $popularity_lesser
        source_in: $source_in
        sort: $sort
      ) {
        ...SearchLayoutContainer
      }
    }
  }
`);

const useSearchMedia = () => {
  const keyword = useAtomValue(keywordAtom);
  const mediaType = useAtomValue(mediaTypeAtom);
  const sort = useAtomValue(sortAtom);
  const genres = useAtomValue(genresAtom);
  const year = useAtomValue(yearAtom);
  const season = useAtomValue(seasonAtom);
  const format = useAtomValue(formatAtom);
  const country = useAtomValue(countryAtom);
  const tags = useAtomValue(tagsAtom);
  const status = useAtomValue(statusAtom);
  const source = useAtomValue(sourceAtom);

  const variables: VariablesOf<typeof document> = {
    ...(format && { format }),
    ...(season && { season }),
    ...(year && { seasonYear: year }),
    ...(country && { countryOfOrigin: country }),
    ...(sort && { sort }),
    ...(status && { status }),
    ...(mediaType && { type: mediaType }),
    ...(tags?.length && { tag_in: tags }),
    ...(genres?.length && { genre_in: genres }),
    // If keyword is given, but there is no media ids found, search the media using keyword.
    ...(keyword && { search: keyword }),
    isAdult: genres.includes('Hentai') || genres.includes('Ecchi'),
    ...(source && { source }),
  };

  return useInfiniteQuery(
    [variables],
    ({ pageParam = 1 }) => {
      return anilistClient.request(document, {
        ...variables,
        page: pageParam,
      });
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage?.Page?.pageInfo?.hasNextPage) return null;

        return (lastPage.Page?.pageInfo?.currentPage ?? 1) + 1;
      },
    }
  );
};

export default useSearchMedia;
