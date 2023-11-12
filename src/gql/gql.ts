/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query AiringSchedule($airingAt_greater: Int, $airingAt_lesser: Int) {\n    Page(page: 1, perPage: 20) {\n      airingSchedules(\n        airingAt_greater: $airingAt_greater\n        airingAt_lesser: $airingAt_lesser\n        sort: [TIME_DESC]\n      ) {\n        media {\n          ...CardMedia\n        }\n      }\n    }\n  }\n':
    types.AiringScheduleDocument,
  '\n  query PopularThisSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n':
    types.PopularThisSeasonDocument,
  '\n  query UpcomingNextSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n':
    types.UpcomingNextSeasonDocument,
  '\n  fragment DetailsHeaderMedia on Media {\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    favourites\n    averageScore\n    seasonYear\n    nextAiringEpisode {\n      airingAt\n      episode\n    }\n    coverImage {\n      large\n    }\n  }\n':
    types.DetailsHeaderMediaFragmentDoc,
  '\n  query InfoDetailsScreen($id: Int) {\n    Media(id: $id) {\n      ...DetailsHeaderMedia\n      ...InfoScreenMedia\n      ...UseAnimeEpisode\n    }\n  }\n':
    types.InfoDetailsScreenDocument,
  '\n  fragment UseAnimeId on Media {\n    id\n    title {\n      english\n      native\n      romaji\n      userPreferred\n    }\n  }\n':
    types.UseAnimeIdFragmentDoc,
  '\n  fragment UseAnimeEpisode on Media {\n    ...UseAnimeId\n    id\n    bannerImage\n    coverImage {\n      large\n      extraLarge\n    }\n  }\n':
    types.UseAnimeEpisodeFragmentDoc,
  '\n  fragment CharacterListMedia on CharacterConnection {\n    edges {\n      ...CharacterCard\n      node {\n        id\n      }\n      role\n    }\n  }\n':
    types.CharacterListMediaFragmentDoc,
  '\n  fragment InfoSectionMedia on Media {\n    meanScore\n    status\n    episodes\n    duration\n    format\n    source\n    studios(isMain: true) {\n      nodes {\n        id\n        name\n      }\n    }\n    season\n    seasonYear\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n  }\n':
    types.InfoSectionMediaFragmentDoc,
  '\n  fragment RecommendationListMedia on RecommendationConnection {\n    nodes {\n      mediaRecommendation {\n        ...CardMedia\n      }\n    }\n  }\n':
    types.RecommendationListMediaFragmentDoc,
  '\n  fragment RelationListMedia on MediaEdge {\n    relationType\n    node {\n      ...CardMedia\n    }\n  }\n':
    types.RelationListMediaFragmentDoc,
  '\n  fragment SpecialRelationListMedia on MediaEdge {\n    relationType\n    node {\n      id\n      bannerImage\n      coverImage {\n        large\n      }\n    }\n  }\n':
    types.SpecialRelationListMediaFragmentDoc,
  '\n  fragment StaffListMedia on StaffConnection {\n    edges {\n      node {\n        id\n      }\n      role\n      ...StaffCard\n    }\n  }\n':
    types.StaffListMediaFragmentDoc,
  '\n  fragment TagListMedia on MediaTag {\n    id\n    name\n    rank\n    isMediaSpoiler\n    isGeneralSpoiler\n  }\n':
    types.TagListMediaFragmentDoc,
  '\n  fragment InfoScreenMedia on Media {\n    relations {\n      edges {\n        ...SpecialRelationListMedia\n        ...RelationListMedia\n      }\n    }\n    recommendations {\n      ...RecommendationListMedia\n    }\n    characters {\n      ...CharacterListMedia\n    }\n    staff {\n      ...StaffListMedia\n    }\n    tags {\n      ...TagListMedia\n    }\n    description\n    trailer {\n      id\n      site\n    }\n    synonyms\n    ...InfoSectionMedia\n  }\n':
    types.InfoScreenMediaFragmentDoc,
  '\n  fragment BannerCardMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    ...MediaUnitStatsMedia\n  }\n':
    types.BannerCardMediaFragmentDoc,
  '\n  query BannerCard {\n    Page(page: 1, perPage: 10) {\n      media(type: ANIME, sort: [TRENDING_DESC, POPULARITY_DESC]) {\n        ...BannerCardMedia\n      }\n    }\n  }\n':
    types.BannerCardDocument,
  '\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    ...MediaUnitStatsMedia\n  }\n':
    types.CardMediaFragmentDoc,
  '\n  fragment CharacterCard on CharacterEdge {\n    node {\n      id\n      name {\n        userPreferred\n      }\n      image {\n        large\n      }\n    }\n    role\n  }\n':
    types.CharacterCardFragmentDoc,
  '\n  fragment MediaUnitStatsMedia on Media {\n    type\n    episodes\n    chapters\n    mediaListEntry {\n      progress\n    }\n    nextAiringEpisode {\n      episode\n    }\n  }\n':
    types.MediaUnitStatsMediaFragmentDoc,
  '\n  fragment StaffCard on StaffEdge {\n    node {\n      id\n      name {\n        userPreferred\n      }\n      image {\n        large\n      }\n    }\n    role\n  }\n':
    types.StaffCardFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AiringSchedule($airingAt_greater: Int, $airingAt_lesser: Int) {\n    Page(page: 1, perPage: 20) {\n      airingSchedules(\n        airingAt_greater: $airingAt_greater\n        airingAt_lesser: $airingAt_lesser\n        sort: [TIME_DESC]\n      ) {\n        media {\n          ...CardMedia\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query AiringSchedule($airingAt_greater: Int, $airingAt_lesser: Int) {\n    Page(page: 1, perPage: 20) {\n      airingSchedules(\n        airingAt_greater: $airingAt_greater\n        airingAt_lesser: $airingAt_lesser\n        sort: [TIME_DESC]\n      ) {\n        media {\n          ...CardMedia\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PopularThisSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n'
): (typeof documents)['\n  query PopularThisSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query UpcomingNextSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n'
): (typeof documents)['\n  query UpcomingNextSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment DetailsHeaderMedia on Media {\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    favourites\n    averageScore\n    seasonYear\n    nextAiringEpisode {\n      airingAt\n      episode\n    }\n    coverImage {\n      large\n    }\n  }\n'
): (typeof documents)['\n  fragment DetailsHeaderMedia on Media {\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    favourites\n    averageScore\n    seasonYear\n    nextAiringEpisode {\n      airingAt\n      episode\n    }\n    coverImage {\n      large\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query InfoDetailsScreen($id: Int) {\n    Media(id: $id) {\n      ...DetailsHeaderMedia\n      ...InfoScreenMedia\n      ...UseAnimeEpisode\n    }\n  }\n'
): (typeof documents)['\n  query InfoDetailsScreen($id: Int) {\n    Media(id: $id) {\n      ...DetailsHeaderMedia\n      ...InfoScreenMedia\n      ...UseAnimeEpisode\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment UseAnimeId on Media {\n    id\n    title {\n      english\n      native\n      romaji\n      userPreferred\n    }\n  }\n'
): (typeof documents)['\n  fragment UseAnimeId on Media {\n    id\n    title {\n      english\n      native\n      romaji\n      userPreferred\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment UseAnimeEpisode on Media {\n    ...UseAnimeId\n    id\n    bannerImage\n    coverImage {\n      large\n      extraLarge\n    }\n  }\n'
): (typeof documents)['\n  fragment UseAnimeEpisode on Media {\n    ...UseAnimeId\n    id\n    bannerImage\n    coverImage {\n      large\n      extraLarge\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CharacterListMedia on CharacterConnection {\n    edges {\n      ...CharacterCard\n      node {\n        id\n      }\n      role\n    }\n  }\n'
): (typeof documents)['\n  fragment CharacterListMedia on CharacterConnection {\n    edges {\n      ...CharacterCard\n      node {\n        id\n      }\n      role\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment InfoSectionMedia on Media {\n    meanScore\n    status\n    episodes\n    duration\n    format\n    source\n    studios(isMain: true) {\n      nodes {\n        id\n        name\n      }\n    }\n    season\n    seasonYear\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n  }\n'
): (typeof documents)['\n  fragment InfoSectionMedia on Media {\n    meanScore\n    status\n    episodes\n    duration\n    format\n    source\n    studios(isMain: true) {\n      nodes {\n        id\n        name\n      }\n    }\n    season\n    seasonYear\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment RecommendationListMedia on RecommendationConnection {\n    nodes {\n      mediaRecommendation {\n        ...CardMedia\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment RecommendationListMedia on RecommendationConnection {\n    nodes {\n      mediaRecommendation {\n        ...CardMedia\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment RelationListMedia on MediaEdge {\n    relationType\n    node {\n      ...CardMedia\n    }\n  }\n'
): (typeof documents)['\n  fragment RelationListMedia on MediaEdge {\n    relationType\n    node {\n      ...CardMedia\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment SpecialRelationListMedia on MediaEdge {\n    relationType\n    node {\n      id\n      bannerImage\n      coverImage {\n        large\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment SpecialRelationListMedia on MediaEdge {\n    relationType\n    node {\n      id\n      bannerImage\n      coverImage {\n        large\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment StaffListMedia on StaffConnection {\n    edges {\n      node {\n        id\n      }\n      role\n      ...StaffCard\n    }\n  }\n'
): (typeof documents)['\n  fragment StaffListMedia on StaffConnection {\n    edges {\n      node {\n        id\n      }\n      role\n      ...StaffCard\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment TagListMedia on MediaTag {\n    id\n    name\n    rank\n    isMediaSpoiler\n    isGeneralSpoiler\n  }\n'
): (typeof documents)['\n  fragment TagListMedia on MediaTag {\n    id\n    name\n    rank\n    isMediaSpoiler\n    isGeneralSpoiler\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment InfoScreenMedia on Media {\n    relations {\n      edges {\n        ...SpecialRelationListMedia\n        ...RelationListMedia\n      }\n    }\n    recommendations {\n      ...RecommendationListMedia\n    }\n    characters {\n      ...CharacterListMedia\n    }\n    staff {\n      ...StaffListMedia\n    }\n    tags {\n      ...TagListMedia\n    }\n    description\n    trailer {\n      id\n      site\n    }\n    synonyms\n    ...InfoSectionMedia\n  }\n'
): (typeof documents)['\n  fragment InfoScreenMedia on Media {\n    relations {\n      edges {\n        ...SpecialRelationListMedia\n        ...RelationListMedia\n      }\n    }\n    recommendations {\n      ...RecommendationListMedia\n    }\n    characters {\n      ...CharacterListMedia\n    }\n    staff {\n      ...StaffListMedia\n    }\n    tags {\n      ...TagListMedia\n    }\n    description\n    trailer {\n      id\n      site\n    }\n    synonyms\n    ...InfoSectionMedia\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment BannerCardMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    ...MediaUnitStatsMedia\n  }\n'
): (typeof documents)['\n  fragment BannerCardMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    ...MediaUnitStatsMedia\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query BannerCard {\n    Page(page: 1, perPage: 10) {\n      media(type: ANIME, sort: [TRENDING_DESC, POPULARITY_DESC]) {\n        ...BannerCardMedia\n      }\n    }\n  }\n'
): (typeof documents)['\n  query BannerCard {\n    Page(page: 1, perPage: 10) {\n      media(type: ANIME, sort: [TRENDING_DESC, POPULARITY_DESC]) {\n        ...BannerCardMedia\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    ...MediaUnitStatsMedia\n  }\n'
): (typeof documents)['\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    ...MediaUnitStatsMedia\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CharacterCard on CharacterEdge {\n    node {\n      id\n      name {\n        userPreferred\n      }\n      image {\n        large\n      }\n    }\n    role\n  }\n'
): (typeof documents)['\n  fragment CharacterCard on CharacterEdge {\n    node {\n      id\n      name {\n        userPreferred\n      }\n      image {\n        large\n      }\n    }\n    role\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment MediaUnitStatsMedia on Media {\n    type\n    episodes\n    chapters\n    mediaListEntry {\n      progress\n    }\n    nextAiringEpisode {\n      episode\n    }\n  }\n'
): (typeof documents)['\n  fragment MediaUnitStatsMedia on Media {\n    type\n    episodes\n    chapters\n    mediaListEntry {\n      progress\n    }\n    nextAiringEpisode {\n      episode\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment StaffCard on StaffEdge {\n    node {\n      id\n      name {\n        userPreferred\n      }\n      image {\n        large\n      }\n    }\n    role\n  }\n'
): (typeof documents)['\n  fragment StaffCard on StaffEdge {\n    node {\n      id\n      name {\n        userPreferred\n      }\n      image {\n        large\n      }\n    }\n    role\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
