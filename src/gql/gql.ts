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
  '\n  query WatchedList($id_in: [Int], $perPage: Int = 10, $page: Int = 1) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n\n      media(id_in: $id_in) {\n        id\n        ...WatchCard\n        ...CardMedia\n      }\n    }\n  }\n':
    types.WatchedListDocument,
  '\n  query AuthWatchedList(\n    $userId: Int\n    $userName: String\n    $status_in: [MediaListStatus]\n    $type: MediaType\n    $sort: [MediaListSort]\n    $perPage: Int = 10\n    $page: Int = 1\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n\n      mediaList(\n        userId: $userId\n        userName: $userName\n        status_in: $status_in\n        type: $type\n        sort: $sort\n      ) {\n        progress\n        media {\n          id\n          ...WatchCard\n          ...CardMedia\n        }\n      }\n    }\n  }\n':
    types.AuthWatchedListDocument,
  '\n  query Viewer {\n    Viewer {\n      name\n      avatar {\n        medium\n      }\n      id\n    }\n  }\n':
    types.ViewerDocument,
  '\n  mutation SaveMediaListEntry(\n    $id: Int\n    $mediaId: Int\n    $status: MediaListStatus\n    $score: Float\n    $scoreRaw: Int\n    $progress: Int\n    $progressVolumes: Int\n    $repeat: Int\n    $priority: Int\n    $private: Boolean\n    $notes: String\n    $hiddenFromStatusLists: Boolean\n    $customLists: [String]\n    $advancedScores: [Float]\n    $startedAt: FuzzyDateInput\n    $completedAt: FuzzyDateInput\n  ) {\n    SaveMediaListEntry(\n      id: $id\n      mediaId: $mediaId\n      status: $status\n      score: $score\n      scoreRaw: $scoreRaw\n      progress: $progress\n      progressVolumes: $progressVolumes\n      repeat: $repeat\n      priority: $priority\n      private: $private\n      notes: $notes\n      hiddenFromStatusLists: $hiddenFromStatusLists\n      customLists: $customLists\n      advancedScores: $advancedScores\n      startedAt: $startedAt\n      completedAt: $completedAt\n    ) {\n      progress\n      score(format: POINT_10_DECIMAL)\n      status\n    }\n  }\n':
    types.SaveMediaListEntryDocument,
  '\n  mutation DeleteMediaListEntry($id: Int) {\n    DeleteMediaListEntry(id: $id) {\n      deleted\n    }\n  }\n':
    types.DeleteMediaListEntryDocument,
  '\n  query AiringScheduleScreen($airingAt_greater: Int, $airingAt_lesser: Int) {\n    Page(page: 1, perPage: 50) {\n      airingSchedules(\n        airingAt_greater: $airingAt_greater\n        airingAt_lesser: $airingAt_lesser\n        sort: [TIME_DESC]\n      ) {\n        airingAt\n        media {\n          id\n          isAdult\n          ...DetailsCard\n        }\n        episode\n      }\n    }\n  }\n':
    types.AiringScheduleScreenDocument,
  '\n  query AnimeList(\n    $userId: Int\n    $userName: String\n    $type: MediaType\n    $status: MediaListStatus\n    $sort: [MediaListSort]\n  ) {\n    MediaListCollection(\n      userId: $userId\n      userName: $userName\n      type: $type\n      status: $status\n      sort: $sort\n    ) {\n      lists {\n        entries {\n          progress\n          media {\n            id\n            ...WatchCard\n            ...CardMedia\n          }\n        }\n      }\n    }\n  }\n':
    types.AnimeListDocument,
  '\n  query AiringSchedule($airingAt_greater: Int, $airingAt_lesser: Int) {\n    Page(page: 1, perPage: 20) {\n      airingSchedules(\n        airingAt_greater: $airingAt_greater\n        airingAt_lesser: $airingAt_lesser\n        sort: [TIME_DESC]\n      ) {\n        media {\n          isAdult\n          ...CardMedia\n        }\n      }\n    }\n  }\n':
    types.AiringScheduleDocument,
  '\n  query PopularThisSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n        isAdult: false\n        countryOfOrigin: "JP"\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n':
    types.PopularThisSeasonDocument,
  '\n  query GetMedia($page: Int!) {\n    Page(page: $page, perPage: 1) {\n      media(type: ANIME, isAdult: false) {\n        id\n      }\n    }\n  }\n':
    types.GetMediaDocument,
  '\n  query UpcomingNextSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n        isAdult: false\n        countryOfOrigin: "JP"\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n':
    types.UpcomingNextSeasonDocument,
  '\n  fragment WatchCard on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    bannerImage\n    ...MediaUnitStatsMedia\n  }\n':
    types.WatchCardFragmentDoc,
  '\n  query AddToListQuery($mediaId: Int) {\n    Media(id: $mediaId) {\n      mediaListEntry {\n        id\n        status\n        score(format: POINT_10)\n        progress\n        repeat\n        notes\n        startedAt {\n          year\n          month\n          day\n        }\n        completedAt {\n          year\n          month\n          day\n        }\n        private\n      }\n      episodes\n    }\n  }\n':
    types.AddToListQueryDocument,
  '\n  fragment DetailsHeaderMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    favourites\n    averageScore\n    seasonYear\n    nextAiringEpisode {\n      airingAt\n      episode\n    }\n    coverImage {\n      large\n    }\n  }\n':
    types.DetailsHeaderMediaFragmentDoc,
  '\n  query InfoDetailsScreen($id: Int) {\n    Media(id: $id) {\n      title {\n        userPreferred\n      }\n      ...DetailsHeaderMedia\n      ...InfoScreenMedia\n      ...EpisodeContainer\n    }\n  }\n':
    types.InfoDetailsScreenDocument,
  '\n  fragment EpisodeContainer on Media {\n    id\n    mediaListEntry {\n      progress\n    }\n    duration\n    ...WrongTitle\n    ...UseAnimeEpisode\n  }\n':
    types.EpisodeContainerFragmentDoc,
  '\n  fragment WrongTitle on Media {\n    id\n    title {\n      english\n      romaji\n      native\n    }\n  }\n':
    types.WrongTitleFragmentDoc,
  '\n  fragment UseAnimeId on Media {\n    id\n    title {\n      english\n      native\n      romaji\n      userPreferred\n    }\n  }\n':
    types.UseAnimeIdFragmentDoc,
  '\n  fragment UseAnimeEpisode on Media {\n    ...UseAnimeId\n    id\n    bannerImage\n    coverImage {\n      large\n      extraLarge\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    episodes\n    format\n    title {\n      english\n      userPreferred\n    }\n  }\n':
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
  '\n  fragment InfoScreenMedia on Media {\n    relations {\n      edges {\n        ...SpecialRelationListMedia\n        ...RelationListMedia\n      }\n    }\n    recommendations(page: 1, perPage: 15) {\n      ...RecommendationListMedia\n    }\n    characters {\n      ...CharacterListMedia\n    }\n    staff {\n      ...StaffListMedia\n    }\n    tags {\n      ...TagListMedia\n    }\n    description\n    trailer {\n      id\n      site\n    }\n    synonyms\n    ...InfoSectionMedia\n  }\n':
    types.InfoScreenMediaFragmentDoc,
  '\n  query AnimeWatchScreenQuery($mediaId: Int!) {\n    Media(id: $mediaId) {\n      title {\n        userPreferred\n      }\n      isAdult\n      idMal\n      ...UseAnimeEpisode\n    }\n  }\n':
    types.AnimeWatchScreenQueryDocument,
  '\n  fragment CharacterAnime on Character {\n    media(perPage: 12, sort: [FAVOURITES_DESC]) {\n      edges {\n        node {\n          id\n          type\n          coverImage {\n            large\n          }\n          title {\n            userPreferred\n          }\n        }\n        voiceActors(language: JAPANESE, sort: ROLE) {\n          id\n          name {\n            userPreferred\n          }\n          age\n          image {\n            large\n          }\n        }\n      }\n    }\n  }\n':
    types.CharacterAnimeFragmentDoc,
  '\n  fragment CharacterInfo on Character {\n    id\n    name {\n      userPreferred\n    }\n    image {\n      large\n    }\n    gender\n    dateOfBirth {\n      year\n      month\n      day\n    }\n    age\n    bloodType\n    favourites\n  }\n':
    types.CharacterInfoFragmentDoc,
  '\n  fragment CharacterManga on Character {\n    media(perPage: 12, sort: [FAVOURITES_DESC]) {\n      edges {\n        node {\n          id\n          type\n          coverImage {\n            large\n          }\n          title {\n            userPreferred\n          }\n        }\n      }\n    }\n  }\n':
    types.CharacterMangaFragmentDoc,
  '\n  query CharacterDetails($id: Int) {\n    Character(id: $id) {\n      ...CharacterInfo\n      ...CharacterAnime\n      ...CharacterManga\n    }\n  }\n':
    types.CharacterDetailsDocument,
  '\n  fragment DetailsCard on Media {\n    id\n    title {\n      userPreferred\n    }\n    genres\n    averageScore\n    favourites\n    coverImage {\n      large\n    }\n  }\n':
    types.DetailsCardFragmentDoc,
  '\n  fragment SearchLayoutContainer on Media {\n    ...CardMedia\n    ...DetailsCard\n  }\n':
    types.SearchLayoutContainerFragmentDoc,
  '\n  query Media(\n    $page: Int = 1\n    $perPage: Int = 20\n    $id: Int\n    $idMal: Int\n    $startDate: FuzzyDateInt\n    $endDate: FuzzyDateInt\n    $season: MediaSeason\n    $seasonYear: Int\n    $type: MediaType\n    $format: MediaFormat\n    $status: MediaStatus\n    $episodes: Int\n    $duration: Int\n    $chapters: Int\n    $volumes: Int\n    $isAdult: Boolean\n    $genre: String\n    $tag: String\n    $minimumTagRank: Int\n    $tagCategory: String\n    $onList: Boolean\n    $licensedBy: String\n    $licensedById: Int\n    $averageScore: Int\n    $popularity: Int\n    $source: MediaSource\n    $countryOfOrigin: CountryCode\n    $isLicensed: Boolean\n    $search: String\n    $id_not: Int\n    $id_in: [Int]\n    $id_not_in: [Int]\n    $idMal_not: Int\n    $idMal_in: [Int]\n    $idMal_not_in: [Int]\n    $startDate_greater: FuzzyDateInt\n    $startDate_lesser: FuzzyDateInt\n    $startDate_like: String\n    $endDate_greater: FuzzyDateInt\n    $endDate_lesser: FuzzyDateInt\n    $endDate_like: String\n    $format_in: [MediaFormat]\n    $format_not: MediaFormat\n    $format_not_in: [MediaFormat]\n    $status_in: [MediaStatus]\n    $status_not: MediaStatus\n    $status_not_in: [MediaStatus]\n    $episodes_greater: Int\n    $episodes_lesser: Int\n    $duration_greater: Int\n    $duration_lesser: Int\n    $chapters_greater: Int\n    $chapters_lesser: Int\n    $volumes_greater: Int\n    $volumes_lesser: Int\n    $genre_in: [String]\n    $genre_not_in: [String]\n    $tag_in: [String]\n    $tag_not_in: [String]\n    $tagCategory_in: [String]\n    $tagCategory_not_in: [String]\n    $licensedBy_in: [String]\n    $licensedById_in: [Int]\n    $averageScore_not: Int\n    $averageScore_greater: Int\n    $averageScore_lesser: Int\n    $popularity_not: Int\n    $popularity_greater: Int\n    $popularity_lesser: Int\n    $source_in: [MediaSource]\n    $sort: [MediaSort]\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(\n        id: $id\n        idMal: $idMal\n        startDate: $startDate\n        endDate: $endDate\n        season: $season\n        seasonYear: $seasonYear\n        type: $type\n        format: $format\n        status: $status\n        episodes: $episodes\n        duration: $duration\n        chapters: $chapters\n        volumes: $volumes\n        isAdult: $isAdult\n        genre: $genre\n        tag: $tag\n        minimumTagRank: $minimumTagRank\n        tagCategory: $tagCategory\n        onList: $onList\n        licensedBy: $licensedBy\n        licensedById: $licensedById\n        averageScore: $averageScore\n        popularity: $popularity\n        source: $source\n        countryOfOrigin: $countryOfOrigin\n        isLicensed: $isLicensed\n        search: $search\n        id_not: $id_not\n        id_in: $id_in\n        id_not_in: $id_not_in\n        idMal_not: $idMal_not\n        idMal_in: $idMal_in\n        idMal_not_in: $idMal_not_in\n        startDate_greater: $startDate_greater\n        startDate_lesser: $startDate_lesser\n        startDate_like: $startDate_like\n        endDate_greater: $endDate_greater\n        endDate_lesser: $endDate_lesser\n        endDate_like: $endDate_like\n        format_in: $format_in\n        format_not: $format_not\n        format_not_in: $format_not_in\n        status_in: $status_in\n        status_not: $status_not\n        status_not_in: $status_not_in\n        episodes_greater: $episodes_greater\n        episodes_lesser: $episodes_lesser\n        duration_greater: $duration_greater\n        duration_lesser: $duration_lesser\n        chapters_greater: $chapters_greater\n        chapters_lesser: $chapters_lesser\n        volumes_greater: $volumes_greater\n        volumes_lesser: $volumes_lesser\n        genre_in: $genre_in\n        genre_not_in: $genre_not_in\n        tag_in: $tag_in\n        tag_not_in: $tag_not_in\n        tagCategory_in: $tagCategory_in\n        tagCategory_not_in: $tagCategory_not_in\n        licensedBy_in: $licensedBy_in\n        licensedById_in: $licensedById_in\n        averageScore_not: $averageScore_not\n        averageScore_greater: $averageScore_greater\n        averageScore_lesser: $averageScore_lesser\n        popularity_not: $popularity_not\n        popularity_greater: $popularity_greater\n        popularity_lesser: $popularity_lesser\n        source_in: $source_in\n        sort: $sort\n      ) {\n        ...SearchLayoutContainer\n      }\n    }\n  }\n':
    types.MediaDocument,
  '\n  fragment BannerCardMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    ...MediaUnitStatsMedia\n  }\n':
    types.BannerCardMediaFragmentDoc,
  '\n  query BannerCard {\n    Page(page: 1, perPage: 10) {\n      media(type: ANIME, sort: [TRENDING_DESC, POPULARITY_DESC]) {\n        ...BannerCardMedia\n      }\n    }\n  }\n':
    types.BannerCardDocument,
  '\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    averageScore\n    ...MediaUnitStatsMedia\n  }\n':
    types.CardMediaFragmentDoc,
  '\n  fragment CharacterCard on CharacterEdge {\n    node {\n      id\n      name {\n        userPreferred\n      }\n      image {\n        large\n      }\n    }\n    role\n  }\n':
    types.CharacterCardFragmentDoc,
  '\n  fragment MediaUnitStatsMedia on Media {\n    type\n    episodes\n    chapters\n    mediaListEntry {\n      progress\n    }\n    nextAiringEpisode {\n      episode\n    }\n    status\n  }\n':
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
  source: '\n  query WatchedList($id_in: [Int], $perPage: Int = 10, $page: Int = 1) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n\n      media(id_in: $id_in) {\n        id\n        ...WatchCard\n        ...CardMedia\n      }\n    }\n  }\n'
): (typeof documents)['\n  query WatchedList($id_in: [Int], $perPage: Int = 10, $page: Int = 1) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n\n      media(id_in: $id_in) {\n        id\n        ...WatchCard\n        ...CardMedia\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AuthWatchedList(\n    $userId: Int\n    $userName: String\n    $status_in: [MediaListStatus]\n    $type: MediaType\n    $sort: [MediaListSort]\n    $perPage: Int = 10\n    $page: Int = 1\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n\n      mediaList(\n        userId: $userId\n        userName: $userName\n        status_in: $status_in\n        type: $type\n        sort: $sort\n      ) {\n        progress\n        media {\n          id\n          ...WatchCard\n          ...CardMedia\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query AuthWatchedList(\n    $userId: Int\n    $userName: String\n    $status_in: [MediaListStatus]\n    $type: MediaType\n    $sort: [MediaListSort]\n    $perPage: Int = 10\n    $page: Int = 1\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n\n      mediaList(\n        userId: $userId\n        userName: $userName\n        status_in: $status_in\n        type: $type\n        sort: $sort\n      ) {\n        progress\n        media {\n          id\n          ...WatchCard\n          ...CardMedia\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Viewer {\n    Viewer {\n      name\n      avatar {\n        medium\n      }\n      id\n    }\n  }\n'
): (typeof documents)['\n  query Viewer {\n    Viewer {\n      name\n      avatar {\n        medium\n      }\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SaveMediaListEntry(\n    $id: Int\n    $mediaId: Int\n    $status: MediaListStatus\n    $score: Float\n    $scoreRaw: Int\n    $progress: Int\n    $progressVolumes: Int\n    $repeat: Int\n    $priority: Int\n    $private: Boolean\n    $notes: String\n    $hiddenFromStatusLists: Boolean\n    $customLists: [String]\n    $advancedScores: [Float]\n    $startedAt: FuzzyDateInput\n    $completedAt: FuzzyDateInput\n  ) {\n    SaveMediaListEntry(\n      id: $id\n      mediaId: $mediaId\n      status: $status\n      score: $score\n      scoreRaw: $scoreRaw\n      progress: $progress\n      progressVolumes: $progressVolumes\n      repeat: $repeat\n      priority: $priority\n      private: $private\n      notes: $notes\n      hiddenFromStatusLists: $hiddenFromStatusLists\n      customLists: $customLists\n      advancedScores: $advancedScores\n      startedAt: $startedAt\n      completedAt: $completedAt\n    ) {\n      progress\n      score(format: POINT_10_DECIMAL)\n      status\n    }\n  }\n'
): (typeof documents)['\n  mutation SaveMediaListEntry(\n    $id: Int\n    $mediaId: Int\n    $status: MediaListStatus\n    $score: Float\n    $scoreRaw: Int\n    $progress: Int\n    $progressVolumes: Int\n    $repeat: Int\n    $priority: Int\n    $private: Boolean\n    $notes: String\n    $hiddenFromStatusLists: Boolean\n    $customLists: [String]\n    $advancedScores: [Float]\n    $startedAt: FuzzyDateInput\n    $completedAt: FuzzyDateInput\n  ) {\n    SaveMediaListEntry(\n      id: $id\n      mediaId: $mediaId\n      status: $status\n      score: $score\n      scoreRaw: $scoreRaw\n      progress: $progress\n      progressVolumes: $progressVolumes\n      repeat: $repeat\n      priority: $priority\n      private: $private\n      notes: $notes\n      hiddenFromStatusLists: $hiddenFromStatusLists\n      customLists: $customLists\n      advancedScores: $advancedScores\n      startedAt: $startedAt\n      completedAt: $completedAt\n    ) {\n      progress\n      score(format: POINT_10_DECIMAL)\n      status\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteMediaListEntry($id: Int) {\n    DeleteMediaListEntry(id: $id) {\n      deleted\n    }\n  }\n'
): (typeof documents)['\n  mutation DeleteMediaListEntry($id: Int) {\n    DeleteMediaListEntry(id: $id) {\n      deleted\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AiringScheduleScreen($airingAt_greater: Int, $airingAt_lesser: Int) {\n    Page(page: 1, perPage: 50) {\n      airingSchedules(\n        airingAt_greater: $airingAt_greater\n        airingAt_lesser: $airingAt_lesser\n        sort: [TIME_DESC]\n      ) {\n        airingAt\n        media {\n          id\n          isAdult\n          ...DetailsCard\n        }\n        episode\n      }\n    }\n  }\n'
): (typeof documents)['\n  query AiringScheduleScreen($airingAt_greater: Int, $airingAt_lesser: Int) {\n    Page(page: 1, perPage: 50) {\n      airingSchedules(\n        airingAt_greater: $airingAt_greater\n        airingAt_lesser: $airingAt_lesser\n        sort: [TIME_DESC]\n      ) {\n        airingAt\n        media {\n          id\n          isAdult\n          ...DetailsCard\n        }\n        episode\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AnimeList(\n    $userId: Int\n    $userName: String\n    $type: MediaType\n    $status: MediaListStatus\n    $sort: [MediaListSort]\n  ) {\n    MediaListCollection(\n      userId: $userId\n      userName: $userName\n      type: $type\n      status: $status\n      sort: $sort\n    ) {\n      lists {\n        entries {\n          progress\n          media {\n            id\n            ...WatchCard\n            ...CardMedia\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query AnimeList(\n    $userId: Int\n    $userName: String\n    $type: MediaType\n    $status: MediaListStatus\n    $sort: [MediaListSort]\n  ) {\n    MediaListCollection(\n      userId: $userId\n      userName: $userName\n      type: $type\n      status: $status\n      sort: $sort\n    ) {\n      lists {\n        entries {\n          progress\n          media {\n            id\n            ...WatchCard\n            ...CardMedia\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AiringSchedule($airingAt_greater: Int, $airingAt_lesser: Int) {\n    Page(page: 1, perPage: 20) {\n      airingSchedules(\n        airingAt_greater: $airingAt_greater\n        airingAt_lesser: $airingAt_lesser\n        sort: [TIME_DESC]\n      ) {\n        media {\n          isAdult\n          ...CardMedia\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query AiringSchedule($airingAt_greater: Int, $airingAt_lesser: Int) {\n    Page(page: 1, perPage: 20) {\n      airingSchedules(\n        airingAt_greater: $airingAt_greater\n        airingAt_lesser: $airingAt_lesser\n        sort: [TIME_DESC]\n      ) {\n        media {\n          isAdult\n          ...CardMedia\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query PopularThisSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n        isAdult: false\n        countryOfOrigin: "JP"\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n'
): (typeof documents)['\n  query PopularThisSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n        isAdult: false\n        countryOfOrigin: "JP"\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetMedia($page: Int!) {\n    Page(page: $page, perPage: 1) {\n      media(type: ANIME, isAdult: false) {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetMedia($page: Int!) {\n    Page(page: $page, perPage: 1) {\n      media(type: ANIME, isAdult: false) {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query UpcomingNextSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n        isAdult: false\n        countryOfOrigin: "JP"\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n'
): (typeof documents)['\n  query UpcomingNextSeason($season: MediaSeason, $seasonYear: Int) {\n    Page(page: 1, perPage: 10) {\n      media(\n        type: ANIME\n        sort: [POPULARITY_DESC]\n        season: $season\n        seasonYear: $seasonYear\n        isAdult: false\n        countryOfOrigin: "JP"\n      ) {\n        ...CardMedia\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment WatchCard on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    bannerImage\n    ...MediaUnitStatsMedia\n  }\n'
): (typeof documents)['\n  fragment WatchCard on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    bannerImage\n    ...MediaUnitStatsMedia\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AddToListQuery($mediaId: Int) {\n    Media(id: $mediaId) {\n      mediaListEntry {\n        id\n        status\n        score(format: POINT_10)\n        progress\n        repeat\n        notes\n        startedAt {\n          year\n          month\n          day\n        }\n        completedAt {\n          year\n          month\n          day\n        }\n        private\n      }\n      episodes\n    }\n  }\n'
): (typeof documents)['\n  query AddToListQuery($mediaId: Int) {\n    Media(id: $mediaId) {\n      mediaListEntry {\n        id\n        status\n        score(format: POINT_10)\n        progress\n        repeat\n        notes\n        startedAt {\n          year\n          month\n          day\n        }\n        completedAt {\n          year\n          month\n          day\n        }\n        private\n      }\n      episodes\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment DetailsHeaderMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    favourites\n    averageScore\n    seasonYear\n    nextAiringEpisode {\n      airingAt\n      episode\n    }\n    coverImage {\n      large\n    }\n  }\n'
): (typeof documents)['\n  fragment DetailsHeaderMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    bannerImage\n    genres\n    favourites\n    averageScore\n    seasonYear\n    nextAiringEpisode {\n      airingAt\n      episode\n    }\n    coverImage {\n      large\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query InfoDetailsScreen($id: Int) {\n    Media(id: $id) {\n      title {\n        userPreferred\n      }\n      ...DetailsHeaderMedia\n      ...InfoScreenMedia\n      ...EpisodeContainer\n    }\n  }\n'
): (typeof documents)['\n  query InfoDetailsScreen($id: Int) {\n    Media(id: $id) {\n      title {\n        userPreferred\n      }\n      ...DetailsHeaderMedia\n      ...InfoScreenMedia\n      ...EpisodeContainer\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment EpisodeContainer on Media {\n    id\n    mediaListEntry {\n      progress\n    }\n    duration\n    ...WrongTitle\n    ...UseAnimeEpisode\n  }\n'
): (typeof documents)['\n  fragment EpisodeContainer on Media {\n    id\n    mediaListEntry {\n      progress\n    }\n    duration\n    ...WrongTitle\n    ...UseAnimeEpisode\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment WrongTitle on Media {\n    id\n    title {\n      english\n      romaji\n      native\n    }\n  }\n'
): (typeof documents)['\n  fragment WrongTitle on Media {\n    id\n    title {\n      english\n      romaji\n      native\n    }\n  }\n'];
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
  source: '\n  fragment UseAnimeEpisode on Media {\n    ...UseAnimeId\n    id\n    bannerImage\n    coverImage {\n      large\n      extraLarge\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    episodes\n    format\n    title {\n      english\n      userPreferred\n    }\n  }\n'
): (typeof documents)['\n  fragment UseAnimeEpisode on Media {\n    ...UseAnimeId\n    id\n    bannerImage\n    coverImage {\n      large\n      extraLarge\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    episodes\n    format\n    title {\n      english\n      userPreferred\n    }\n  }\n'];
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
  source: '\n  fragment InfoScreenMedia on Media {\n    relations {\n      edges {\n        ...SpecialRelationListMedia\n        ...RelationListMedia\n      }\n    }\n    recommendations(page: 1, perPage: 15) {\n      ...RecommendationListMedia\n    }\n    characters {\n      ...CharacterListMedia\n    }\n    staff {\n      ...StaffListMedia\n    }\n    tags {\n      ...TagListMedia\n    }\n    description\n    trailer {\n      id\n      site\n    }\n    synonyms\n    ...InfoSectionMedia\n  }\n'
): (typeof documents)['\n  fragment InfoScreenMedia on Media {\n    relations {\n      edges {\n        ...SpecialRelationListMedia\n        ...RelationListMedia\n      }\n    }\n    recommendations(page: 1, perPage: 15) {\n      ...RecommendationListMedia\n    }\n    characters {\n      ...CharacterListMedia\n    }\n    staff {\n      ...StaffListMedia\n    }\n    tags {\n      ...TagListMedia\n    }\n    description\n    trailer {\n      id\n      site\n    }\n    synonyms\n    ...InfoSectionMedia\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AnimeWatchScreenQuery($mediaId: Int!) {\n    Media(id: $mediaId) {\n      title {\n        userPreferred\n      }\n      isAdult\n      idMal\n      ...UseAnimeEpisode\n    }\n  }\n'
): (typeof documents)['\n  query AnimeWatchScreenQuery($mediaId: Int!) {\n    Media(id: $mediaId) {\n      title {\n        userPreferred\n      }\n      isAdult\n      idMal\n      ...UseAnimeEpisode\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CharacterAnime on Character {\n    media(perPage: 12, sort: [FAVOURITES_DESC]) {\n      edges {\n        node {\n          id\n          type\n          coverImage {\n            large\n          }\n          title {\n            userPreferred\n          }\n        }\n        voiceActors(language: JAPANESE, sort: ROLE) {\n          id\n          name {\n            userPreferred\n          }\n          age\n          image {\n            large\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CharacterAnime on Character {\n    media(perPage: 12, sort: [FAVOURITES_DESC]) {\n      edges {\n        node {\n          id\n          type\n          coverImage {\n            large\n          }\n          title {\n            userPreferred\n          }\n        }\n        voiceActors(language: JAPANESE, sort: ROLE) {\n          id\n          name {\n            userPreferred\n          }\n          age\n          image {\n            large\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CharacterInfo on Character {\n    id\n    name {\n      userPreferred\n    }\n    image {\n      large\n    }\n    gender\n    dateOfBirth {\n      year\n      month\n      day\n    }\n    age\n    bloodType\n    favourites\n  }\n'
): (typeof documents)['\n  fragment CharacterInfo on Character {\n    id\n    name {\n      userPreferred\n    }\n    image {\n      large\n    }\n    gender\n    dateOfBirth {\n      year\n      month\n      day\n    }\n    age\n    bloodType\n    favourites\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CharacterManga on Character {\n    media(perPage: 12, sort: [FAVOURITES_DESC]) {\n      edges {\n        node {\n          id\n          type\n          coverImage {\n            large\n          }\n          title {\n            userPreferred\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CharacterManga on Character {\n    media(perPage: 12, sort: [FAVOURITES_DESC]) {\n      edges {\n        node {\n          id\n          type\n          coverImage {\n            large\n          }\n          title {\n            userPreferred\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CharacterDetails($id: Int) {\n    Character(id: $id) {\n      ...CharacterInfo\n      ...CharacterAnime\n      ...CharacterManga\n    }\n  }\n'
): (typeof documents)['\n  query CharacterDetails($id: Int) {\n    Character(id: $id) {\n      ...CharacterInfo\n      ...CharacterAnime\n      ...CharacterManga\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment DetailsCard on Media {\n    id\n    title {\n      userPreferred\n    }\n    genres\n    averageScore\n    favourites\n    coverImage {\n      large\n    }\n  }\n'
): (typeof documents)['\n  fragment DetailsCard on Media {\n    id\n    title {\n      userPreferred\n    }\n    genres\n    averageScore\n    favourites\n    coverImage {\n      large\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment SearchLayoutContainer on Media {\n    ...CardMedia\n    ...DetailsCard\n  }\n'
): (typeof documents)['\n  fragment SearchLayoutContainer on Media {\n    ...CardMedia\n    ...DetailsCard\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Media(\n    $page: Int = 1\n    $perPage: Int = 20\n    $id: Int\n    $idMal: Int\n    $startDate: FuzzyDateInt\n    $endDate: FuzzyDateInt\n    $season: MediaSeason\n    $seasonYear: Int\n    $type: MediaType\n    $format: MediaFormat\n    $status: MediaStatus\n    $episodes: Int\n    $duration: Int\n    $chapters: Int\n    $volumes: Int\n    $isAdult: Boolean\n    $genre: String\n    $tag: String\n    $minimumTagRank: Int\n    $tagCategory: String\n    $onList: Boolean\n    $licensedBy: String\n    $licensedById: Int\n    $averageScore: Int\n    $popularity: Int\n    $source: MediaSource\n    $countryOfOrigin: CountryCode\n    $isLicensed: Boolean\n    $search: String\n    $id_not: Int\n    $id_in: [Int]\n    $id_not_in: [Int]\n    $idMal_not: Int\n    $idMal_in: [Int]\n    $idMal_not_in: [Int]\n    $startDate_greater: FuzzyDateInt\n    $startDate_lesser: FuzzyDateInt\n    $startDate_like: String\n    $endDate_greater: FuzzyDateInt\n    $endDate_lesser: FuzzyDateInt\n    $endDate_like: String\n    $format_in: [MediaFormat]\n    $format_not: MediaFormat\n    $format_not_in: [MediaFormat]\n    $status_in: [MediaStatus]\n    $status_not: MediaStatus\n    $status_not_in: [MediaStatus]\n    $episodes_greater: Int\n    $episodes_lesser: Int\n    $duration_greater: Int\n    $duration_lesser: Int\n    $chapters_greater: Int\n    $chapters_lesser: Int\n    $volumes_greater: Int\n    $volumes_lesser: Int\n    $genre_in: [String]\n    $genre_not_in: [String]\n    $tag_in: [String]\n    $tag_not_in: [String]\n    $tagCategory_in: [String]\n    $tagCategory_not_in: [String]\n    $licensedBy_in: [String]\n    $licensedById_in: [Int]\n    $averageScore_not: Int\n    $averageScore_greater: Int\n    $averageScore_lesser: Int\n    $popularity_not: Int\n    $popularity_greater: Int\n    $popularity_lesser: Int\n    $source_in: [MediaSource]\n    $sort: [MediaSort]\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(\n        id: $id\n        idMal: $idMal\n        startDate: $startDate\n        endDate: $endDate\n        season: $season\n        seasonYear: $seasonYear\n        type: $type\n        format: $format\n        status: $status\n        episodes: $episodes\n        duration: $duration\n        chapters: $chapters\n        volumes: $volumes\n        isAdult: $isAdult\n        genre: $genre\n        tag: $tag\n        minimumTagRank: $minimumTagRank\n        tagCategory: $tagCategory\n        onList: $onList\n        licensedBy: $licensedBy\n        licensedById: $licensedById\n        averageScore: $averageScore\n        popularity: $popularity\n        source: $source\n        countryOfOrigin: $countryOfOrigin\n        isLicensed: $isLicensed\n        search: $search\n        id_not: $id_not\n        id_in: $id_in\n        id_not_in: $id_not_in\n        idMal_not: $idMal_not\n        idMal_in: $idMal_in\n        idMal_not_in: $idMal_not_in\n        startDate_greater: $startDate_greater\n        startDate_lesser: $startDate_lesser\n        startDate_like: $startDate_like\n        endDate_greater: $endDate_greater\n        endDate_lesser: $endDate_lesser\n        endDate_like: $endDate_like\n        format_in: $format_in\n        format_not: $format_not\n        format_not_in: $format_not_in\n        status_in: $status_in\n        status_not: $status_not\n        status_not_in: $status_not_in\n        episodes_greater: $episodes_greater\n        episodes_lesser: $episodes_lesser\n        duration_greater: $duration_greater\n        duration_lesser: $duration_lesser\n        chapters_greater: $chapters_greater\n        chapters_lesser: $chapters_lesser\n        volumes_greater: $volumes_greater\n        volumes_lesser: $volumes_lesser\n        genre_in: $genre_in\n        genre_not_in: $genre_not_in\n        tag_in: $tag_in\n        tag_not_in: $tag_not_in\n        tagCategory_in: $tagCategory_in\n        tagCategory_not_in: $tagCategory_not_in\n        licensedBy_in: $licensedBy_in\n        licensedById_in: $licensedById_in\n        averageScore_not: $averageScore_not\n        averageScore_greater: $averageScore_greater\n        averageScore_lesser: $averageScore_lesser\n        popularity_not: $popularity_not\n        popularity_greater: $popularity_greater\n        popularity_lesser: $popularity_lesser\n        source_in: $source_in\n        sort: $sort\n      ) {\n        ...SearchLayoutContainer\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Media(\n    $page: Int = 1\n    $perPage: Int = 20\n    $id: Int\n    $idMal: Int\n    $startDate: FuzzyDateInt\n    $endDate: FuzzyDateInt\n    $season: MediaSeason\n    $seasonYear: Int\n    $type: MediaType\n    $format: MediaFormat\n    $status: MediaStatus\n    $episodes: Int\n    $duration: Int\n    $chapters: Int\n    $volumes: Int\n    $isAdult: Boolean\n    $genre: String\n    $tag: String\n    $minimumTagRank: Int\n    $tagCategory: String\n    $onList: Boolean\n    $licensedBy: String\n    $licensedById: Int\n    $averageScore: Int\n    $popularity: Int\n    $source: MediaSource\n    $countryOfOrigin: CountryCode\n    $isLicensed: Boolean\n    $search: String\n    $id_not: Int\n    $id_in: [Int]\n    $id_not_in: [Int]\n    $idMal_not: Int\n    $idMal_in: [Int]\n    $idMal_not_in: [Int]\n    $startDate_greater: FuzzyDateInt\n    $startDate_lesser: FuzzyDateInt\n    $startDate_like: String\n    $endDate_greater: FuzzyDateInt\n    $endDate_lesser: FuzzyDateInt\n    $endDate_like: String\n    $format_in: [MediaFormat]\n    $format_not: MediaFormat\n    $format_not_in: [MediaFormat]\n    $status_in: [MediaStatus]\n    $status_not: MediaStatus\n    $status_not_in: [MediaStatus]\n    $episodes_greater: Int\n    $episodes_lesser: Int\n    $duration_greater: Int\n    $duration_lesser: Int\n    $chapters_greater: Int\n    $chapters_lesser: Int\n    $volumes_greater: Int\n    $volumes_lesser: Int\n    $genre_in: [String]\n    $genre_not_in: [String]\n    $tag_in: [String]\n    $tag_not_in: [String]\n    $tagCategory_in: [String]\n    $tagCategory_not_in: [String]\n    $licensedBy_in: [String]\n    $licensedById_in: [Int]\n    $averageScore_not: Int\n    $averageScore_greater: Int\n    $averageScore_lesser: Int\n    $popularity_not: Int\n    $popularity_greater: Int\n    $popularity_lesser: Int\n    $source_in: [MediaSource]\n    $sort: [MediaSort]\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        perPage\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(\n        id: $id\n        idMal: $idMal\n        startDate: $startDate\n        endDate: $endDate\n        season: $season\n        seasonYear: $seasonYear\n        type: $type\n        format: $format\n        status: $status\n        episodes: $episodes\n        duration: $duration\n        chapters: $chapters\n        volumes: $volumes\n        isAdult: $isAdult\n        genre: $genre\n        tag: $tag\n        minimumTagRank: $minimumTagRank\n        tagCategory: $tagCategory\n        onList: $onList\n        licensedBy: $licensedBy\n        licensedById: $licensedById\n        averageScore: $averageScore\n        popularity: $popularity\n        source: $source\n        countryOfOrigin: $countryOfOrigin\n        isLicensed: $isLicensed\n        search: $search\n        id_not: $id_not\n        id_in: $id_in\n        id_not_in: $id_not_in\n        idMal_not: $idMal_not\n        idMal_in: $idMal_in\n        idMal_not_in: $idMal_not_in\n        startDate_greater: $startDate_greater\n        startDate_lesser: $startDate_lesser\n        startDate_like: $startDate_like\n        endDate_greater: $endDate_greater\n        endDate_lesser: $endDate_lesser\n        endDate_like: $endDate_like\n        format_in: $format_in\n        format_not: $format_not\n        format_not_in: $format_not_in\n        status_in: $status_in\n        status_not: $status_not\n        status_not_in: $status_not_in\n        episodes_greater: $episodes_greater\n        episodes_lesser: $episodes_lesser\n        duration_greater: $duration_greater\n        duration_lesser: $duration_lesser\n        chapters_greater: $chapters_greater\n        chapters_lesser: $chapters_lesser\n        volumes_greater: $volumes_greater\n        volumes_lesser: $volumes_lesser\n        genre_in: $genre_in\n        genre_not_in: $genre_not_in\n        tag_in: $tag_in\n        tag_not_in: $tag_not_in\n        tagCategory_in: $tagCategory_in\n        tagCategory_not_in: $tagCategory_not_in\n        licensedBy_in: $licensedBy_in\n        licensedById_in: $licensedById_in\n        averageScore_not: $averageScore_not\n        averageScore_greater: $averageScore_greater\n        averageScore_lesser: $averageScore_lesser\n        popularity_not: $popularity_not\n        popularity_greater: $popularity_greater\n        popularity_lesser: $popularity_lesser\n        source_in: $source_in\n        sort: $sort\n      ) {\n        ...SearchLayoutContainer\n      }\n    }\n  }\n'];
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
  source: '\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    averageScore\n    ...MediaUnitStatsMedia\n  }\n'
): (typeof documents)['\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      large\n    }\n    averageScore\n    ...MediaUnitStatsMedia\n  }\n'];
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
  source: '\n  fragment MediaUnitStatsMedia on Media {\n    type\n    episodes\n    chapters\n    mediaListEntry {\n      progress\n    }\n    nextAiringEpisode {\n      episode\n    }\n    status\n  }\n'
): (typeof documents)['\n  fragment MediaUnitStatsMedia on Media {\n    type\n    episodes\n    chapters\n    mediaListEntry {\n      progress\n    }\n    nextAiringEpisode {\n      episode\n    }\n    status\n  }\n'];
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
