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
  '\n  fragment BannerCardMedia on Media {\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    ...MediaUnitStatsMedia\n  }\n':
    types.BannerCardMediaFragmentDoc,
  '\n  query BannerCard {\n    Page(page: 1, perPage: 10) {\n      media(type: ANIME, sort: [TRENDING_DESC, POPULARITY_DESC]) {\n        ...BannerCardMedia\n      }\n    }\n  }\n':
    types.BannerCardDocument,
  '\n  fragment CardMedia on Media {\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    ...MediaUnitStatsMedia\n  }\n':
    types.CardMediaFragmentDoc,
  '\n  fragment MediaUnitStatsMedia on Media {\n    type\n    episodes\n    chapters\n    mediaListEntry {\n      progress\n    }\n    nextAiringEpisode {\n      episode\n    }\n  }\n':
    types.MediaUnitStatsMediaFragmentDoc,
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
  source: '\n  fragment BannerCardMedia on Media {\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    ...MediaUnitStatsMedia\n  }\n'
): (typeof documents)['\n  fragment BannerCardMedia on Media {\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    ...MediaUnitStatsMedia\n  }\n'];
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
  source: '\n  fragment CardMedia on Media {\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    ...MediaUnitStatsMedia\n  }\n'
): (typeof documents)['\n  fragment CardMedia on Media {\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    ...MediaUnitStatsMedia\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment MediaUnitStatsMedia on Media {\n    type\n    episodes\n    chapters\n    mediaListEntry {\n      progress\n    }\n    nextAiringEpisode {\n      episode\n    }\n  }\n'
): (typeof documents)['\n  fragment MediaUnitStatsMedia on Media {\n    type\n    episodes\n    chapters\n    mediaListEntry {\n      progress\n    }\n    nextAiringEpisode {\n      episode\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
