// 💙

// *******************************************************
// *******************************************************
//
// GENERATED FILE, DO NOT MODIFY
//
// Made by Victor Garcia ®
//
// https://github.com/victorgarciaesgi
// *******************************************************
// *******************************************************
// 💙

/** Page of data */
export interface Page {
  /** The pagination information*/
  pageInfo: PageInfo;
  media: Media[];
  characters: Character[];
  staff: Staff[];
  studios: Studio[];
  mediaList: MediaList[];
  airingSchedules: AiringSchedule[];
  mediaTrends: MediaTrend[];
  recommendations: Recommendation[];
}

export interface PageInfo {
  /** The total number of items. Note: This value is not guaranteed to be accurate, do not rely on this for logic*/
  total: number;
  /** The count on a page*/
  perPage: number;
  /** The current page*/
  currentPage: number;
  /** The last page*/
  lastPage: number;
  /** If there is another page*/
  hasNextPage: boolean;
}

export interface PageArgs {
  /** The page number*/
  page?: number;
  /** The amount of entries per page, max 50*/
  perPage?: number;
}

/** Media list watching/reading status enum. */
export enum MediaListStatus {
  Current = 'CURRENT',
  Planning = 'PLANNING',
  Completed = 'COMPLETED',
  Dropped = 'DROPPED',
  Paused = 'PAUSED',
  Repeating = 'REPEATING',
}

export interface MediaConnection {
  edges: MediaEdge[];
  nodes: Media[];
  /** The pagination information*/
  pageInfo: PageInfo;
}

/** Media connection edge */
export interface MediaEdge {
  node: Media;
  /** The id of the connection*/
  id: number;
  /** The type of relation to the parent model*/
  relationType: MediaRelation;
  /** If the studio is the main animation studio of the media (For Studio->MediaConnection field only)*/
  isMainStudio: boolean;
  /** The characters in the media voiced by the parent actor*/
  characters: Character[];
  /** The characters role in the media*/
  characterRole: CharacterRole;
  /** Media specific character name*/
  characterName: string;
  /** Notes regarding the VA's role for the character*/
  roleNotes: string;
  /** Used for grouping roles where multiple dubs exist for the same language. Either dubbing company name or language variant.*/
  dubGroup: string;
  /** The role of the staff member in the production of the media*/
  staffRole: string;
  /** The voice actors of the character*/
  voiceActors: Staff[];
  /** The voice actors of the character with role date*/
  voiceActorRoles: StaffRoleType[];
  /** The order the media should be displayed from the users favourites*/
  favouriteOrder: number;
}

/** Anime or Manga */
export interface Media {
  /** The id of the media*/
  id: number;
  /** The mal id of the media*/
  idMal: number;
  /** The official titles of the media in various languages*/
  title: MediaTitle;
  /** The type of the media; anime or manga*/
  type: MediaType;
  /** The format the media was released in*/
  format: MediaFormat;
  /** The current releasing status of the media*/
  status: MediaStatus;
  /** Short description of the media's story and characters*/
  description: string;
  /** The first official release date of the media*/
  startDate: FuzzyDate;
  /** The last official release date of the media*/
  endDate: FuzzyDate;
  /** The season the media was initially released in*/
  season: MediaSeason;
  /** The season year the media was initially released in*/
  seasonYear: number;
  /** The year & season the media was initially released in*/
  seasonInt: number;
  /** The amount of episodes the anime has when complete*/
  episodes: number;
  /** The general length of each anime episode in minutes*/
  duration: number;
  /** The amount of chapters the manga has when complete*/
  chapters: number;
  /** The amount of volumes the manga has when complete*/
  volumes: number;
  /** Where the media was created. (ISO 3166-1 alpha-2)*/
  countryOfOrigin: string;
  /** If the media is officially licensed or a self-published doujin release*/
  isLicensed: boolean;
  /** Source type the media was adapted from.*/
  source: MediaSource;
  /** Official Twitter hashtags for the media*/
  hashtag: string;
  /** Media trailer or advertisement*/
  trailer: MediaTrailer;
  /** When the media's data was last updated*/
  updatedAt: number;
  /** The cover images of the media*/
  coverImage: MediaCoverImage;
  /** The banner image of the media*/
  bannerImage: string;
  /** The genres of the media*/
  genres: string[];
  /** Alternative titles of the media*/
  synonyms: string[];
  /** A weighted average score of all the user's scores of the media*/
  averageScore: number;
  /** Mean score of all the user's scores of the media*/
  meanScore: number;
  /** The number of users with the media on their list*/
  popularity: number;
  /** Locked media may not be added to lists our favorited. This may be due to the entry pending for deletion or other reasons.*/
  isLocked: boolean;
  /** The amount of related activity in the past hour*/
  trending: number;
  /** The amount of user's who have favourited the media*/
  favourites: number;
  /** List of tags that describes elements and themes of the media*/
  tags: MediaTag[];
  /** Other media in the same or connecting franchise*/
  relations: MediaConnection;
  /** The characters in the media*/
  characters: CharacterConnection;
  /** The staff who produced the media*/
  staff: StaffConnection;
  /** The companies who produced the media*/
  studios: StudioConnection;
  /** If the media is marked as favourite by the current authenticated user*/
  isFavourite: boolean;
  /** If the media is blocked from being added to favourites*/
  isFavouriteBlocked: boolean;
  /** If the media is intended only for 18+ adult audiences*/
  isAdult: boolean;
  /** The media's next episode airing schedule*/
  nextAiringEpisode: AiringSchedule;
  /** The media's entire airing schedule*/
  airingSchedule: AiringScheduleConnection;
  /** The media's daily trend stats*/
  trends: MediaTrendConnection;
  /** External links to another site related to the media*/
  externalLinks: MediaExternalLink[];
  /** Data and links to legal streaming episodes on external sites*/
  streamingEpisodes: MediaStreamingEpisode[];
  /** The ranking of the media in a particular time span and format compared to other media*/
  rankings: MediaRank[];
  /** The authenticated user's media list entry for the media*/
  mediaListEntry: MediaList;
  /** User recommendations for similar media*/
  recommendations: RecommendationConnection;
  /** The url for the media page on the AniList website*/
  siteUrl: string;
  /** If the media should have forum thread automatically created for it on airing episode release*/
  autoCreateForumThread: boolean;
  /** If the media is blocked from being recommended to/from*/
  isRecommendationBlocked: boolean;
  /** If the media is blocked from being reviewed*/
  isReviewBlocked: boolean;
  /** Notes for site moderators*/
  modNotes: string;
}

/** Media query */
export interface MediaArgs {
  /** Filter by the media id*/
  id?: number;
  /** Filter by the media's MyAnimeList id*/
  idMal?: number;
  /** Filter by the start date of the media*/
  startDate?: undefined;
  /** Filter by the end date of the media*/
  endDate?: undefined;
  /** Filter by the season the media was released in*/
  season?: MediaSeason;
  /** The year of the season (Winter 2017 would also include December 2016 releases). Requires season argument*/
  seasonYear?: number;
  /** Filter by the media's type*/
  type?: MediaType;
  /** Filter by the media's format*/
  format?: MediaFormat;
  /** Filter by the media's current release status*/
  status?: MediaStatus;
  /** Filter by amount of episodes the media has*/
  episodes?: number;
  /** Filter by the media's episode length*/
  duration?: number;
  /** Filter by the media's chapter count*/
  chapters?: number;
  /** Filter by the media's volume count*/
  volumes?: number;
  /** Filter by if the media's intended for 18+ adult audiences*/
  isAdult?: boolean;
  /** Filter by the media's genres*/
  genre?: string;
  /** Filter by the media's tags*/
  tag?: string;
  /** Only apply the tags filter argument to tags above this rank. Default: 18*/
  minimumTagRank?: number;
  /** Filter by the media's tags with in a tag category*/
  tagCategory?: string;
  /** Filter by the media on the authenticated user's lists*/
  onList?: boolean;
  /** Filter media by sites name with a online streaming or reading license*/
  licensedBy?: string;
  /** Filter media by sites id with a online streaming or reading license*/
  licensedById?: number;
  /** Filter by the media's average score*/
  averageScore?: number;
  /** Filter by the number of users with this media on their list*/
  popularity?: number;
  /** Filter by the source type of the media*/
  source?: MediaSource;
  /** Filter by the media's country of origin*/
  countryOfOrigin?: string;
  /** If the media is officially licensed or a self-published doujin release*/
  isLicensed?: boolean;
  /** Filter by search query*/
  search?: string;
  /** Filter by the media id*/
  id_not?: number;
  /** Filter by the media id*/
  id_in?: number[];
  /** Filter by the media id*/
  id_not_in?: number[];
  /** Filter by the media's MyAnimeList id*/
  idMal_not?: number;
  /** Filter by the media's MyAnimeList id*/
  idMal_in?: number[];
  /** Filter by the media's MyAnimeList id*/
  idMal_not_in?: number[];
  /** Filter by the start date of the media*/
  startDate_greater?: undefined;
  /** Filter by the start date of the media*/
  startDate_lesser?: undefined;
  /** Filter by the start date of the media*/
  startDate_like?: string;
  /** Filter by the end date of the media*/
  endDate_greater?: undefined;
  /** Filter by the end date of the media*/
  endDate_lesser?: undefined;
  /** Filter by the end date of the media*/
  endDate_like?: string;
  /** Filter by the media's format*/
  format_in?: MediaFormat[];
  /** Filter by the media's format*/
  format_not?: MediaFormat;
  /** Filter by the media's format*/
  format_not_in?: MediaFormat[];
  /** Filter by the media's current release status*/
  status_in?: MediaStatus[];
  /** Filter by the media's current release status*/
  status_not?: MediaStatus;
  /** Filter by the media's current release status*/
  status_not_in?: MediaStatus[];
  /** Filter by amount of episodes the media has*/
  episodes_greater?: number;
  /** Filter by amount of episodes the media has*/
  episodes_lesser?: number;
  /** Filter by the media's episode length*/
  duration_greater?: number;
  /** Filter by the media's episode length*/
  duration_lesser?: number;
  /** Filter by the media's chapter count*/
  chapters_greater?: number;
  /** Filter by the media's chapter count*/
  chapters_lesser?: number;
  /** Filter by the media's volume count*/
  volumes_greater?: number;
  /** Filter by the media's volume count*/
  volumes_lesser?: number;
  /** Filter by the media's genres*/
  genre_in?: string[];
  /** Filter by the media's genres*/
  genre_not_in?: string[];
  /** Filter by the media's tags*/
  tag_in?: string[];
  /** Filter by the media's tags*/
  tag_not_in?: string[];
  /** Filter by the media's tags with in a tag category*/
  tagCategory_in?: string[];
  /** Filter by the media's tags with in a tag category*/
  tagCategory_not_in?: string[];
  /** Filter media by sites name with a online streaming or reading license*/
  licensedBy_in?: string[];
  /** Filter media by sites id with a online streaming or reading license*/
  licensedById_in?: number[];
  /** Filter by the media's average score*/
  averageScore_not?: number;
  /** Filter by the media's average score*/
  averageScore_greater?: number;
  /** Filter by the media's average score*/
  averageScore_lesser?: number;
  /** Filter by the number of users with this media on their list*/
  popularity_not?: number;
  /** Filter by the number of users with this media on their list*/
  popularity_greater?: number;
  /** Filter by the number of users with this media on their list*/
  popularity_lesser?: number;
  /** Filter by the source type of the media*/
  source_in?: MediaSource[];
  /** The order the results will be returned in*/
  sort?: MediaSort[];
}

/** The official titles of the media in various languages */
export interface MediaTitle extends Record<string, string> {
  /** The romanization of the native language title*/
  romaji: string;
  /** The official english title*/
  english: string;
  /** Official title in it's native language*/
  native: string;
  /** The currently authenticated users preferred title language. Default romaji for non-authenticated*/
  userPreferred: string;
}

/** Media type enum, anime or manga. */
export enum MediaType {
  Anime = 'ANIME',
  Manga = 'MANGA',
}
/** The format the media was released in */
export enum MediaFormat {
  Tv = 'TV',
  Tv_short = 'TV_SHORT',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Ova = 'OVA',
  Ona = 'ONA',
  Music = 'MUSIC',
  Manga = 'MANGA',
  Novel = 'NOVEL',
  One_shot = 'ONE_SHOT',
}
/** The current releasing status of the media */
export enum MediaStatus {
  Finished = 'FINISHED',
  Releasing = 'RELEASING',
  Not_yet_released = 'NOT_YET_RELEASED',
  Cancelled = 'CANCELLED',
  Hiatus = 'HIATUS',
}
/** Date object that allows for incomplete date values (fuzzy) */
export interface FuzzyDate {
  /** Numeric Year (2017)*/
  year: number;
  /** Numeric Month (3)*/
  month: number;
  /** Numeric Day (24)*/
  day: number;
}

export enum MediaSeason {
  Winter = 'WINTER',
  Spring = 'SPRING',
  Summer = 'SUMMER',
  Fall = 'FALL',
}

/** Source type the media was adapted from */
export enum MediaSource {
  Original = 'ORIGINAL',
  Manga = 'MANGA',
  Light_novel = 'LIGHT_NOVEL',
  Visual_novel = 'VISUAL_NOVEL',
  Video_game = 'VIDEO_GAME',
  Other = 'OTHER',
  Novel = 'NOVEL',
  Doujinshi = 'DOUJINSHI',
  Anime = 'ANIME',
  Web_novel = 'WEB_NOVEL',
  Live_action = 'LIVE_ACTION',
  Game = 'GAME',
  Comic = 'COMIC',
  Multimedia_project = 'MULTIMEDIA_PROJECT',
  Picture_book = 'PICTURE_BOOK',
}
/** Media trailer or advertisement */
export interface MediaTrailer {
  /** The trailer video id*/
  id: string;
  /** The site the video is hosted by (Currently either youtube or dailymotion)*/
  site: string;
  /** The url for the thumbnail image of the video*/
  thumbnail: string;
}

export interface MediaCoverImage {
  /** The cover image url of the media at its largest size. If this size isn't available, large will be provided instead.*/
  extraLarge: string;
  /** The cover image url of the media at a large size*/
  large: string;
  /** The cover image url of the media at medium size*/
  medium: string;
  /** Average #hex color of cover image*/
  color: string;
}

/** A tag that describes a theme or element of the media */
export interface MediaTag {
  /** The id of the tag*/
  id: number;
  /** The name of the tag*/
  name: string;
  /** A general description of the tag*/
  description: string;
  /** The categories of tags this tag belongs to*/
  category: string;
  /** The relevance ranking of the tag out of the 100 for this media*/
  rank: number;
  /** If the tag could be a spoiler for any media*/
  isGeneralSpoiler: boolean;
  /** If the tag is a spoiler for this media*/
  isMediaSpoiler: boolean;
  /** If the tag is only for adult 18+ media*/
  isAdult: boolean;
  /** The user who submitted the tag*/
  userId: number;
}

/** Character sort enums */
export enum CharacterSort {
  Id = 'ID',
  Id_desc = 'ID_DESC',
  Role = 'ROLE',
  Role_desc = 'ROLE_DESC',
  Search_match = 'SEARCH_MATCH',
  Favourites = 'FAVOURITES',
  Favourites_desc = 'FAVOURITES_DESC',
  Relevance = 'RELEVANCE',
}
/** The role the character plays in the media */
export enum CharacterRole {
  Main = 'MAIN',
  Supporting = 'SUPPORTING',
  Background = 'BACKGROUND',
}
export interface CharacterConnection {
  edges: CharacterEdge[];
  nodes: Character[];
  /** The pagination information*/
  pageInfo: PageInfo;
}

/** Character connection edge */
export interface CharacterEdge {
  node: Character;
  /** The id of the connection*/
  id: number;
  /** The characters role in the media*/
  role: CharacterRole;
  /** Media specific character name*/
  name: string;
  /** The voice actors of the character*/
  voiceActors: Staff[];
  /** The voice actors of the character with role date*/
  voiceActorRoles: StaffRoleType[];
  /** The media the character is in*/
  media: Media[];
  /** The order the character should be displayed from the users favourites*/
  favouriteOrder: number;
}

/** A character that features in an anime or manga */
export interface Character {
  /** The id of the character*/
  id: number;
  /** The names of the character*/
  name: CharacterName;
  /** Character images*/
  image: CharacterImage;
  /** A general description of the character*/
  description: string;
  /** The character's gender. Usually Male, Female, or Non-binary but can be any string.*/
  gender: string;
  /** The character's birth date*/
  dateOfBirth: FuzzyDate;
  /** The character's age. Note this is a string, not an int, it may contain further text and additional ages.*/
  age: string;
  /** The characters blood type*/
  bloodType: string;
  /** If the character is marked as favourite by the currently authenticated user*/
  isFavourite: boolean;
  /** If the character is blocked from being added to favourites*/
  isFavouriteBlocked: boolean;
  /** The url for the character page on the AniList website*/
  siteUrl: string;
  /** Media that includes the character*/
  media: MediaConnection;
  /** @deprecated No data available*/
  updatedAt: number;
  /** The amount of user's who have favourited the character*/
  favourites: number;
  /** Notes for site moderators*/
  modNotes: string;
}

/** The names of the character */
export interface CharacterName {
  /** The character's given name*/
  first: string;
  /** The character's middle name*/
  middle: string;
  /** The character's surname*/
  last: string;
  /** The character's first and last name*/
  full: string;
  /** The character's full name in their native language*/
  native: string;
  /** Other names the character might be referred to as*/
  alternative: string[];
  /** Other names the character might be referred to as but are spoilers*/
  alternativeSpoiler: string[];
  /** The currently authenticated users preferred name language. Default romaji for non-authenticated*/
  userPreferred: string;
}

export interface CharacterImage {
  /** The character's image of media at its largest size*/
  large: string;
  /** The character's image of media at medium size*/
  medium: string;
}

/** Media sort enums */
export enum MediaSort {
  Id = 'ID',
  Id_desc = 'ID_DESC',
  Title_romaji = 'TITLE_ROMAJI',
  Title_romaji_desc = 'TITLE_ROMAJI_DESC',
  Title_english = 'TITLE_ENGLISH',
  Title_english_desc = 'TITLE_ENGLISH_DESC',
  Title_native = 'TITLE_NATIVE',
  Title_native_desc = 'TITLE_NATIVE_DESC',
  Type = 'TYPE',
  Type_desc = 'TYPE_DESC',
  Format = 'FORMAT',
  Format_desc = 'FORMAT_DESC',
  Start_date = 'START_DATE',
  Start_date_desc = 'START_DATE_DESC',
  End_date = 'END_DATE',
  End_date_desc = 'END_DATE_DESC',
  Score = 'SCORE',
  Score_desc = 'SCORE_DESC',
  Popularity = 'POPULARITY',
  Popularity_desc = 'POPULARITY_DESC',
  Trending = 'TRENDING',
  Trending_desc = 'TRENDING_DESC',
  Episodes = 'EPISODES',
  Episodes_desc = 'EPISODES_DESC',
  Duration = 'DURATION',
  Duration_desc = 'DURATION_DESC',
  Status = 'STATUS',
  Status_desc = 'STATUS_DESC',
  Chapters = 'CHAPTERS',
  Chapters_desc = 'CHAPTERS_DESC',
  Volumes = 'VOLUMES',
  Volumes_desc = 'VOLUMES_DESC',
  Updated_at = 'UPDATED_AT',
  Updated_at_desc = 'UPDATED_AT_DESC',
  Search_match = 'SEARCH_MATCH',
  Favourites = 'FAVOURITES',
  Favourites_desc = 'FAVOURITES_DESC',
}
/** The primary language of the voice actor */
export enum StaffLanguage {
  Japanese = 'JAPANESE',
  English = 'ENGLISH',
  Korean = 'KOREAN',
  Italian = 'ITALIAN',
  Spanish = 'SPANISH',
  Portuguese = 'PORTUGUESE',
  French = 'FRENCH',
  German = 'GERMAN',
  Hebrew = 'HEBREW',
  Hungarian = 'HUNGARIAN',
}
/** Staff sort enums */
export enum StaffSort {
  Id = 'ID',
  Id_desc = 'ID_DESC',
  Role = 'ROLE',
  Role_desc = 'ROLE_DESC',
  Language = 'LANGUAGE',
  Language_desc = 'LANGUAGE_DESC',
  Search_match = 'SEARCH_MATCH',
  Favourites = 'FAVOURITES',
  Favourites_desc = 'FAVOURITES_DESC',
  Relevance = 'RELEVANCE',
}
/** Voice actors or production staff */
export interface Staff {
  /** The id of the staff member*/
  id: number;
  /** The names of the staff member*/
  name: StaffName;
  /** @deprecated Replaced with languageV2The primary language the staff member dub's in*/
  language: StaffLanguage;
  /** The primary language of the staff member. Current values: Japanese, English, Korean, Italian, Spanish, Portuguese, French, German, Hebrew, Hungarian, Chinese, Arabic, Filipino, Catalan, Finnish, Turkish, Dutch, Swedish, Thai, Tagalog, Malaysian, Indonesian, Vietnamese, Nepali, Hindi, Urdu*/
  languageV2: string;
  /** The staff images*/
  image: StaffImage;
  /** A general description of the staff member*/
  description: string;
  /** The person's primary occupations*/
  primaryOccupations: string[];
  /** The staff's gender. Usually Male, Female, or Non-binary but can be any string.*/
  gender: string;
  dateOfBirth: FuzzyDate;
  dateOfDeath: FuzzyDate;
  /** The person's age in years*/
  age: number;
  /** [startYear, endYear] (If the 2nd value is not present staff is still active)*/
  yearsActive: number[];
  /** The persons birthplace or hometown*/
  homeTown: string;
  /** The persons blood type*/
  bloodType: string;
  /** If the staff member is marked as favourite by the currently authenticated user*/
  isFavourite: boolean;
  /** If the staff member is blocked from being added to favourites*/
  isFavouriteBlocked: boolean;
  /** The url for the staff page on the AniList website*/
  siteUrl: string;
  /** Media where the staff member has a production role*/
  staffMedia: MediaConnection;
  /** Characters voiced by the actor*/
  characters: CharacterConnection;
  /** Media the actor voiced characters in. (Same data as characters with media as node instead of characters)*/
  characterMedia: MediaConnection;
  /** @deprecated No data available*/
  updatedAt: number;
  /** Staff member that the submission is referencing*/
  staff: Staff;
  /** Status of the submission*/
  submissionStatus: number;
  /** Inner details of submission status*/
  submissionNotes: string;
  /** The amount of user's who have favourited the staff member*/
  favourites: number;
  /** Notes for site moderators*/
  modNotes: string;
}

/** The names of the staff member */
export interface StaffName {
  /** The person's given name*/
  first: string;
  /** The person's middle name*/
  middle: string;
  /** The person's surname*/
  last: string;
  /** The person's first and last name*/
  full: string;
  /** The person's full name in their native language*/
  native: string;
  /** Other names the staff member might be referred to as (pen names)*/
  alternative: string[];
  /** The currently authenticated users preferred name language. Default romaji for non-authenticated*/
  userPreferred: string;
}

export interface StaffImage {
  /** The person's image of media at its largest size*/
  large: string;
  /** The person's image of media at medium size*/
  medium: string;
}

/** Voice actor role for a character */
export interface StaffRoleType {
  /** The voice actors of the character*/
  voiceActor: Staff;
  /** Notes regarding the VA's role for the character*/
  roleNotes: string;
  /** Used for grouping roles where multiple dubs exist for the same language. Either dubbing company name or language variant.*/
  dubGroup: string;
}

export interface StaffConnection {
  edges: StaffEdge[];
  nodes: Staff[];
  /** The pagination information*/
  pageInfo: PageInfo;
}

/** Staff connection edge */
export interface StaffEdge {
  node: Staff;
  /** The id of the connection*/
  id: number;
  /** The role of the staff member in the production of the media*/
  role: string;
  /** The order the staff should be displayed from the users favourites*/
  favouriteOrder: number;
}

/** Studio sort enums */
export enum StudioSort {
  Id = 'ID',
  Id_desc = 'ID_DESC',
  Name = 'NAME',
  Name_desc = 'NAME_DESC',
  Search_match = 'SEARCH_MATCH',
  Favourites = 'FAVOURITES',
  Favourites_desc = 'FAVOURITES_DESC',
}
export interface StudioConnection {
  edges: StudioEdge[];
  nodes: Studio[];
  /** The pagination information*/
  pageInfo: PageInfo;
}

/** Studio connection edge */
export interface StudioEdge {
  node: Studio;
  /** The id of the connection*/
  id: number;
  /** If the studio is the main animation studio of the anime*/
  isMain: boolean;
  /** The order the character should be displayed from the users favourites*/
  favouriteOrder: number;
}

/** Animation or production company */
export interface Studio {
  /** The id of the studio*/
  id: number;
  /** The name of the studio*/
  name: string;
  /** If the studio is an animation studio or a different kind of company*/
  isAnimationStudio: boolean;
  /** The media the studio has worked on*/
  media: MediaConnection;
  /** The url for the studio page on the AniList website*/
  siteUrl: string;
  /** If the studio is marked as favourite by the currently authenticated user*/
  isFavourite: boolean;
  /** The amount of user's who have favourited the studio*/
  favourites: number;
}

/** Media Airing Schedule. NOTE: We only aim to guarantee that FUTURE airing data is present and accurate. */
export interface AiringSchedule {
  /** The id of the airing schedule item*/
  id: number;
  /** The time the episode airs at*/
  airingAt: number;
  /** Seconds until episode starts airing*/
  timeUntilAiring: number;
  /** The airing episode number*/
  episode: number;
  /** The associate media id of the airing episode*/
  mediaId: number;
  /** The associate media of the airing episode*/
  media: Media;
}

export interface AiringScheduleConnection {
  edges: AiringScheduleEdge[];
  nodes: AiringSchedule[];
  /** The pagination information*/
  pageInfo: PageInfo;
}

/** AiringSchedule connection edge */
export interface AiringScheduleEdge {
  node: AiringSchedule;
  /** The id of the connection*/
  id: number;
}

/** Media trend sort enums */
export enum MediaTrendSort {
  Id = 'ID',
  Id_desc = 'ID_DESC',
  Media_id = 'MEDIA_ID',
  Media_id_desc = 'MEDIA_ID_DESC',
  Date = 'DATE',
  Date_desc = 'DATE_DESC',
  Score = 'SCORE',
  Score_desc = 'SCORE_DESC',
  Popularity = 'POPULARITY',
  Popularity_desc = 'POPULARITY_DESC',
  Trending = 'TRENDING',
  Trending_desc = 'TRENDING_DESC',
  Episode = 'EPISODE',
  Episode_desc = 'EPISODE_DESC',
}
export interface MediaTrendConnection {
  edges: MediaTrendEdge[];
  nodes: MediaTrend[];
  /** The pagination information*/
  pageInfo: PageInfo;
}

/** Media trend connection edge */
export interface MediaTrendEdge {
  node: MediaTrend;
}

/** Daily media statistics */
export interface MediaTrend {
  /** The id of the tag*/
  mediaId: number;
  /** The day the data was recorded (timestamp)*/
  date: number;
  /** The amount of media activity on the day*/
  trending: number;
  /** A weighted average score of all the user's scores of the media*/
  averageScore: number;
  /** The number of users with the media on their list*/
  popularity: number;
  /** The number of users with watching/reading the media*/
  inProgress: number;
  /** If the media was being released at this time*/
  releasing: boolean;
  /** The episode number of the anime released on this day*/
  episode: number;
  /** The related media*/
  media: Media;
}

/** An external link to another site related to the media or staff member */
export interface MediaExternalLink {
  /** The id of the external link*/
  id: number;
  /** The url of the external link or base url of link source*/
  url: string;
  /** The links website site name*/
  site: string;
  /** The links website site id*/
  siteId: number;
  type: ExternalLinkType;
  /** Language the site content is in. See Staff language field for values.*/
  language: string;
  color: string;
  /** The icon image url of the site. Not available for all links. Transparent PNG 64x64*/
  icon: string;
  notes: string;
  isDisabled: boolean;
}

export enum ExternalLinkType {
  Info = 'INFO',
  Streaming = 'STREAMING',
  Social = 'SOCIAL',
}
/** Data and links to legal streaming episodes on external sites */
export interface MediaStreamingEpisode {
  /** Title of the episode*/
  title: string;
  /** Url of episode image thumbnail*/
  thumbnail: string;
  /** The url of the episode*/
  url: string;
  /** The site location of the streaming episodes*/
  site: string;
}

/** The ranking of a media in a particular time span and format compared to other media */
export interface MediaRank {
  /** The id of the rank*/
  id: number;
  /** The numerical rank of the media*/
  rank: number;
  /** The type of ranking*/
  type: MediaRankType;
  /** The format the media is ranked within*/
  format: MediaFormat;
  /** The year the media is ranked within*/
  year: number;
  /** The season the media is ranked within*/
  season: MediaSeason;
  /** If the ranking is based on all time instead of a season/year*/
  allTime: boolean;
  /** String that gives context to the ranking type and time span*/
  context: string;
}

/** The type of ranking */
export enum MediaRankType {
  Rated = 'RATED',
  Popular = 'POPULAR',
}

/** Recommendation sort enums */
export enum RecommendationSort {
  Id = 'ID',
  Id_desc = 'ID_DESC',
  Rating = 'RATING',
  Rating_desc = 'RATING_DESC',
}
export interface RecommendationConnection {
  edges: RecommendationEdge[];
  nodes: Recommendation[];
  /** The pagination information*/
  pageInfo: PageInfo;
}

/** Recommendation connection edge */
export interface RecommendationEdge {
  node: Recommendation;
}

/** Media recommendation */
export interface Recommendation {
  /** The id of the recommendation*/
  id: number;
  /** Users rating of the recommendation*/
  rating: number;
  /** The rating of the recommendation by currently authenticated user*/
  userRating: RecommendationRating;
  /** The media the recommendation is from*/
  media: Media;
  /** The recommended media*/
  mediaRecommendation: Media;
  /** The user that first created the recommendation*/
}

/** Recommendation rating enums */
export enum RecommendationRating {
  No_rating = 'NO_RATING',
  Rate_up = 'RATE_UP',
  Rate_down = 'RATE_DOWN',
}

/** Type of relation media has to its parent. */
export enum MediaRelation {
  Adaptation = 'ADAPTATION',
  Prequel = 'PREQUEL',
  Sequel = 'SEQUEL',
  Parent = 'PARENT',
  Side_story = 'SIDE_STORY',
  Character = 'CHARACTER',
  Summary = 'SUMMARY',
  Alternative = 'ALTERNATIVE',
  Spin_off = 'SPIN_OFF',
  Other = 'OTHER',
  Source = 'SOURCE',
  Compilation = 'COMPILATION',
  Contains = 'CONTAINS',
}

/** Media list sort enums */
export enum MediaListSort {
  Media_id = 'MEDIA_ID',
  Media_id_desc = 'MEDIA_ID_DESC',
  Score = 'SCORE',
  Score_desc = 'SCORE_DESC',
  Status = 'STATUS',
  Status_desc = 'STATUS_DESC',
  Progress = 'PROGRESS',
  Progress_desc = 'PROGRESS_DESC',
  Progress_volumes = 'PROGRESS_VOLUMES',
  Progress_volumes_desc = 'PROGRESS_VOLUMES_DESC',
  Repeat = 'REPEAT',
  Repeat_desc = 'REPEAT_DESC',
  Priority = 'PRIORITY',
  Priority_desc = 'PRIORITY_DESC',
  Started_on = 'STARTED_ON',
  Started_on_desc = 'STARTED_ON_DESC',
  Finished_on = 'FINISHED_ON',
  Finished_on_desc = 'FINISHED_ON_DESC',
  Added_time = 'ADDED_TIME',
  Added_time_desc = 'ADDED_TIME_DESC',
  Updated_time = 'UPDATED_TIME',
  Updated_time_desc = 'UPDATED_TIME_DESC',
  Media_title_romaji = 'MEDIA_TITLE_ROMAJI',
  Media_title_romaji_desc = 'MEDIA_TITLE_ROMAJI_DESC',
  Media_title_english = 'MEDIA_TITLE_ENGLISH',
  Media_title_english_desc = 'MEDIA_TITLE_ENGLISH_DESC',
  Media_title_native = 'MEDIA_TITLE_NATIVE',
  Media_title_native_desc = 'MEDIA_TITLE_NATIVE_DESC',
  Media_popularity = 'MEDIA_POPULARITY',
  Media_popularity_desc = 'MEDIA_POPULARITY_DESC',
}
/** Airing schedule sort enums */
export enum AiringSort {
  Id = 'ID',
  Id_desc = 'ID_DESC',
  Media_id = 'MEDIA_ID',
  Media_id_desc = 'MEDIA_ID_DESC',
  Time = 'TIME',
  Time_desc = 'TIME_DESC',
  Episode = 'EPISODE',
  Episode_desc = 'EPISODE_DESC',
}

export enum ExternalLinkMediaType {
  Anime = 'ANIME',
  Manga = 'MANGA',
  Staff = 'STAFF',
}

/** A user's list options for anime or manga lists */
export interface MediaListOptionsInput {
  /** The order each list should be displayed in*/
  sectionOrder?: string[];
  /** If the completed sections of the list should be separated by format*/
  splitCompletedSectionByFormat?: boolean;
  /** The names of the user's custom lists*/
  customLists?: string[];
  /** The names of the user's advanced scoring sections*/
  advancedScoring?: string[];
  /** If advanced scoring is enabled*/
  advancedScoringEnabled?: boolean;
  /** list theme*/
  theme?: string;
}

export interface ListActivityOptionInput {
  disabled?: boolean;
  type?: MediaListStatus;
}

/** Date object that allows for incomplete date values (fuzzy) */
export interface FuzzyDateInput {
  /** Numeric Year (2017)*/
  year?: number;
  /** Numeric Month (3)*/
  month?: number;
  /** Numeric Day (24)*/
  day?: number;
}

/** Deleted data type */
export interface Deleted {
  /** If an item has been successfully deleted*/
  deleted: boolean;
}

/** Internal - Media characters separated */
export interface MediaCharacter {
  /** The id of the connection*/
  id: number;
  /** The characters role in the media*/
  role: CharacterRole;
  roleNotes: string;
  dubGroup: string;
  /** Media specific character name*/
  characterName: string;
  /** The characters in the media voiced by the parent actor*/
  character: Character;
  /** The voice actor of the character*/
  voiceActor: Staff;
}

/** The official titles of the media in various languages */
export interface MediaTitleInput {
  /** The romanization of the native language title*/
  romaji?: string;
  /** The official english title*/
  english?: string;
  /** Official title in it's native language*/
  native?: string;
}

export interface AiringScheduleInput {
  airingAt?: number;
  episode?: number;
  timeUntilAiring?: number;
}

/** An external link to another site related to the media */
export interface MediaExternalLinkInput {
  /** The id of the external link*/
  id: number;
  /** The url of the external link*/
  url: string;
  /** The site location of the external link*/
  site: string;
}

/** The names of the character */
export interface CharacterNameInput {
  /** The character's given name*/
  first?: string;
  /** The character's middle name*/
  middle?: string;
  /** The character's surname*/
  last?: string;
  /** The character's full name in their native language*/
  native?: string;
  /** Other names the character might be referred by*/
  alternative?: string[];
  /** Other names the character might be referred to as but are spoilers*/
  alternativeSpoiler?: string[];
}

/** The names of the staff member */
export interface StaffNameInput {
  /** The person's given name*/
  first?: string;
  /** The person's middle name*/
  middle?: string;
  /** The person's surname*/
  last?: string;
  /** The person's full name in their native language*/
  native?: string;
  /** Other names the character might be referred by*/
  alternative?: string[];
}

/** Airing schedule query */
export interface AiringScheduleArgs {
  /** Filter by the id of the airing schedule item*/
  id?: number;
  /** Filter by the id of associated media*/
  mediaId?: number;
  /** Filter by the airing episode number*/
  episode?: number;
  /** Filter by the time of airing*/
  airingAt?: number;
  /** Filter to episodes that haven't yet aired*/
  notYetAired?: boolean;
  /** Filter by the id of the airing schedule item*/
  id_not?: number;
  /** Filter by the id of the airing schedule item*/
  id_in?: number[];
  /** Filter by the id of the airing schedule item*/
  id_not_in?: number[];
  /** Filter by the id of associated media*/
  mediaId_not?: number;
  /** Filter by the id of associated media*/
  mediaId_in?: number[];
  /** Filter by the id of associated media*/
  mediaId_not_in?: number[];
  /** Filter by the airing episode number*/
  episode_not?: number;
  /** Filter by the airing episode number*/
  episode_in?: number[];
  /** Filter by the airing episode number*/
  episode_not_in?: number[];
  /** Filter by the airing episode number*/
  episode_greater?: number;
  /** Filter by the airing episode number*/
  episode_lesser?: number;
  /** Filter by the time of airing*/
  airingAt_greater?: number;
  /** Filter by the time of airing*/
  airingAt_lesser?: number;
  /** The order the results will be returned in*/
  sort?: AiringSort[];
}

/** Character query */
export interface CharacterArgs {
  /** Filter by character id*/
  id?: number;
  /** Filter by character by if its their birthday today*/
  isBirthday?: boolean;
  /** Filter by search query*/
  search?: string;
  /** Filter by character id*/
  id_not?: number;
  /** Filter by character id*/
  id_in?: number[];
  /** Filter by character id*/
  id_not_in?: number[];
  /** The order the results will be returned in*/
  sort?: CharacterSort[];
}

/** Staff query */
export interface StaffArgs {
  /** Filter by the staff id*/
  id?: number;
  /** Filter by staff by if its their birthday today*/
  isBirthday?: boolean;
  /** Filter by search query*/
  search?: string;
  /** Filter by the staff id*/
  id_not?: number;
  /** Filter by the staff id*/
  id_in?: number[];
  /** Filter by the staff id*/
  id_not_in?: number[];
  /** The order the results will be returned in*/
  sort?: StaffSort[];
}

/** Media list query */
export interface MediaListArgs {
  /** Filter by a list entry's id*/
  id?: number;
  /** Filter by a user's id*/
  userId?: number;
  /** Filter by a user's name*/
  userName?: string;
  /** Filter by the list entries media type*/
  type?: MediaType;
  /** Filter by the watching/reading status*/
  status?: MediaListStatus;
  /** Filter by the media id of the list entry*/
  mediaId?: number;
  /** Filter list entries to users who are being followed by the authenticated user*/
  isFollowing?: boolean;
  /** Filter by note words and #tags*/
  notes?: string;
  /** Filter by the date the user started the media*/
  startedAt?: undefined;
  /** Filter by the date the user completed the media*/
  completedAt?: undefined;
  /** Limit to only entries also on the auth user's list. Requires user id or name arguments.*/
  compareWithAuthList?: boolean;
  /** Filter by a user's id*/
  userId_in?: number[];
  /** Filter by the watching/reading status*/
  status_in?: MediaListStatus[];
  /** Filter by the watching/reading status*/
  status_not_in?: MediaListStatus[];
  /** Filter by the watching/reading status*/
  status_not?: MediaListStatus;
  /** Filter by the media id of the list entry*/
  mediaId_in?: number[];
  /** Filter by the media id of the list entry*/
  mediaId_not_in?: number[];
  /** Filter by note words and #tags*/
  notes_like?: string;
  /** Filter by the date the user started the media*/
  startedAt_greater?: undefined;
  /** Filter by the date the user started the media*/
  startedAt_lesser?: undefined;
  /** Filter by the date the user started the media*/
  startedAt_like?: string;
  /** Filter by the date the user completed the media*/
  completedAt_greater?: undefined;
  /** Filter by the date the user completed the media*/
  completedAt_lesser?: undefined;
  /** Filter by the date the user completed the media*/
  completedAt_like?: string;
  /** The order the results will be returned in*/
  sort?: MediaListSort[];
}

/** Media list collection query, provides list pre-grouped by status & custom lists. User ID and Media Type arguments required. */
export interface MediaListCollectionArgs {
  /** Filter by a user's id*/
  userId?: number;
  /** Filter by a user's name*/
  userName?: string;
  /** Filter by the list entries media type*/
  type?: MediaType;
  /** Filter by the watching/reading status*/
  status?: MediaListStatus;
  /** Filter by note words and #tags*/
  notes?: string;
  /** Filter by the date the user started the media*/
  startedAt?: undefined;
  /** Filter by the date the user completed the media*/
  completedAt?: undefined;
  /** Always return completed list entries in one group, overriding the user's split completed option.*/
  forceSingleCompletedList?: boolean;
  /** Which chunk of list entries to load*/
  chunk?: number;
  /** The amount of entries per chunk, max 500*/
  perChunk?: number;
  /** Filter by the watching/reading status*/
  status_in?: MediaListStatus[];
  /** Filter by the watching/reading status*/
  status_not_in?: MediaListStatus[];
  /** Filter by the watching/reading status*/
  status_not?: MediaListStatus;
  /** Filter by note words and #tags*/
  notes_like?: string;
  /** Filter by the date the user started the media*/
  startedAt_greater?: undefined;
  /** Filter by the date the user started the media*/
  startedAt_lesser?: undefined;
  /** Filter by the date the user started the media*/
  startedAt_like?: string;
  /** Filter by the date the user completed the media*/
  completedAt_greater?: undefined;
  /** Filter by the date the user completed the media*/
  completedAt_lesser?: undefined;
  /** Filter by the date the user completed the media*/
  completedAt_like?: string;
  /** The order the results will be returned in*/
  sort?: MediaListSort[];
}

/** Collection of all the possible media genres */
export interface GenreCollectionArgs {}

/** Collection of all the possible media tags */
export interface MediaTagCollectionArgs {
  /** Mod Only*/
  status?: number;
}

/** Studio query */
export interface StudioArgs {
  /** Filter by the studio id*/
  id?: number;
  /** Filter by search query*/
  search?: string;
  /** Filter by the studio id*/
  id_not?: number;
  /** Filter by the studio id*/
  id_in?: number[];
  /** Filter by the studio id*/
  id_not_in?: number[];
  /** The order the results will be returned in*/
  sort?: StudioSort[];
}

/** Recommendation query */
export interface RecommendationArgs {
  /** Filter by recommendation id*/
  id?: number;
  /** Filter by media id*/
  mediaId?: number;
  /** Filter by media recommendation id*/
  mediaRecommendationId?: number;
  /** Filter by user who created the recommendation*/
  userId?: number;
  /** Filter by total rating of the recommendation*/
  rating?: number;
  /** Filter by the media on the authenticated user's lists*/
  onList?: boolean;
  /** Filter by total rating of the recommendation*/
  rating_greater?: number;
  /** Filter by total rating of the recommendation*/
  rating_lesser?: number;
  /** The order the results will be returned in*/
  sort?: RecommendationSort[];
}

/** List of anime or manga */
export interface MediaList {
  /** The id of the list entry*/
  id: number;
  /** The id of the user owner of the list entry*/
  userId: number;
  /** The id of the media*/
  mediaId: number;
  /** The watching/reading status*/
  status: MediaListStatus;
  /** The score of the entry*/
  score: number;
  /** The amount of episodes/chapters consumed by the user*/
  progress: number;
  /** The amount of volumes read by the user*/
  progressVolumes: number;
  /** The amount of times the user has rewatched/read the media*/
  repeat: number;
  /** Priority of planning*/
  priority: number;
  /** If the entry should only be visible to authenticated user*/
  private: boolean;
  /** Text notes*/
  notes: string;
  /** If the entry shown be hidden from non-custom lists*/
  hiddenFromStatusLists: boolean;
  /** Map of booleans for which custom lists the entry are in*/
  customLists: string;
  /** Map of advanced scores with name keys*/
  advancedScores: string;
  /** When the entry was started by the user*/
  startedAt: FuzzyDate;
  /** When the entry was completed by the user*/
  completedAt: FuzzyDate;
  /** When the entry data was last updated*/
  updatedAt: number;
  /** When the entry data was created*/
  createdAt: number;
  media: Media;
  user: User;
}

/** A user */
export interface User {
  /** The id of the user*/
  id: number;
  /** The name of the user*/
  name: string;
  /** The bio written by user (Markdown)*/
  about: string;
  /** The user's avatar images*/
  avatar: UserAvatar;
  /** The user's banner images*/
  bannerImage: string;
  /** If the authenticated user if following this user*/
  isFollowing: boolean;
  /** If this user if following the authenticated user*/
  isFollower: boolean;
  /** If the user is blocked by the authenticated user*/
  isBlocked: boolean;
  bans: string;
  /** The user's general options*/
  options: UserOptions;
  /** The user's media list options*/
  mediaListOptions: MediaListOptions;
  /** The users favourites*/
  favourites: Favourites;
  /** The users anime & manga list statistics*/
  statistics: UserStatisticTypes;
  /** The number of unread notifications the user has*/
  unreadNotificationCount: number;
  /** The url for the user page on the AniList website*/
  siteUrl: string;
  /** The donation tier of the user*/
  donatorTier: number;
  /** Custom donation badge text*/
  donatorBadge: string;
  /** When the user's account was created. (Does not exist for accounts created before 2020)*/
  createdAt: number;
}

/** A user's avatars */
export interface UserAvatar {
  /** The avatar of user at its largest size*/
  large: string;
  /** The avatar of user at medium size*/
  medium: string;
}

export enum UserStaffNameLanguage {
  Romaji_western = 'ROMAJI_WESTERN',
  Romaji = 'ROMAJI',
  Native = 'NATIVE',
}

/** A user's general options */
export interface UserOptions {
  /** The language the user wants to see media titles in*/
  titleLanguage: UserTitleLanguage;
  /** Whether the user has enabled viewing of 18+ content*/
  displayAdultContent: boolean;
  /** Whether the user receives notifications when a show they are watching aires*/
  airingNotifications: boolean;
  /** Profile highlight color (blue, purple, pink, orange, red, green, gray)*/
  profileColor: string;
  /** The user's timezone offset (Auth user only)*/
  timezone: string;
  /** Minutes between activity for them to be merged together. 0 is Never, Above 2 weeks (20160 mins) is Always.*/
  activityMergeTime: number;
  /** The language the user wants to see staff and character names in*/
  staffNameLanguage: UserStaffNameLanguage;
  /** Whether the user only allow messages from users they follow*/
  restrictMessagesToFollowing: boolean;
}

/** The language the user wants to see media titles in */
export enum UserTitleLanguage {
  Romaji = 'ROMAJI',
  English = 'ENGLISH',
  Native = 'NATIVE',
  Romaji_stylised = 'ROMAJI_STYLISED',
  English_stylised = 'ENGLISH_STYLISED',
  Native_stylised = 'NATIVE_STYLISED',
}

/** A user's list options */
export interface MediaListOptions {
  /** The score format the user is using for media lists*/
  scoreFormat: ScoreFormat;
  /** The default order list rows should be displayed in*/
  rowOrder: string;
  /** @deprecated No longer used*/
  useLegacyLists: boolean;
  /** The user's anime list options*/
  animeList: MediaListTypeOptions;
  /** The user's manga list options*/
  mangaList: MediaListTypeOptions;
  /** @deprecated No longer usedThe list theme options for both lists*/
  sharedTheme: string;
  /** @deprecated No longer usedIf the shared theme should be used instead of the individual list themes*/
  sharedThemeEnabled: boolean;
}

/** Media list scoring type */
export enum ScoreFormat {
  Point_100 = 'POINT_100',
  Point_10_decimal = 'POINT_10_DECIMAL',
  Point_10 = 'POINT_10',
  Point_5 = 'POINT_5',
  Point_3 = 'POINT_3',
}

/** A user's list options for anime or manga lists */
export interface MediaListTypeOptions {
  /** The order each list should be displayed in*/
  sectionOrder: string[];
  /** If the completed sections of the list should be separated by format*/
  splitCompletedSectionByFormat: boolean;
  /** @deprecated This field has not yet been fully implemented and may change without warningThe list theme options*/
  theme: string;
  /** The names of the user's custom lists*/
  customLists: string[];
  /** The names of the user's advanced scoring sections*/
  advancedScoring: string[];
  /** If advanced scoring is enabled*/
  advancedScoringEnabled: boolean;
}

/** User's favourite anime, manga, characters, staff & studios */
export interface Favourites {
  /** Favourite anime*/
  anime: MediaConnection;
  /** Favourite manga*/
  manga: MediaConnection;
  /** Favourite characters*/
  characters: CharacterConnection;
  /** Favourite staff*/
  staff: StaffConnection;
  /** Favourite studios*/
  studios: StudioConnection;
}

export interface UserStatisticTypes {
  anime: UserStatistics;
  manga: UserStatistics;
}

export interface UserStatistics {
  count: number;
  meanScore: number;
  standardDeviation: number;
  minutesWatched: number;
  episodesWatched: number;
  chaptersRead: number;
  volumesRead: number;
  formats: UserFormatStatistic[];
  statuses: UserStatusStatistic[];
  scores: UserScoreStatistic[];
  lengths: UserLengthStatistic[];
  releaseYears: UserReleaseYearStatistic[];
  startYears: UserStartYearStatistic[];
  genres: UserGenreStatistic[];
  tags: UserTagStatistic[];
  countries: UserCountryStatistic[];
  voiceActors: UserVoiceActorStatistic[];
  staff: UserStaffStatistic[];
  studios: UserStudioStatistic[];
}

export interface UserStatusStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  status: MediaListStatus;
}

export interface UserScoreStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  score: number;
}

export interface UserLengthStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  length: string;
}

export interface UserReleaseYearStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  releaseYear: number;
}

export interface UserStartYearStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  startYear: number;
}

export interface UserGenreStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  genre: string;
}

export interface UserTagStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  tag: MediaTag;
}

export interface UserCountryStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  country: undefined;
}

export interface UserVoiceActorStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  voiceActor: Staff;
  characterIds: number[];
}

export interface UserStaffStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  staff: Staff;
}

export interface UserStudioStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  studio: Studio;
}

export interface UserFormatStatistic {
  count: number;
  meanScore: number;
  minutesWatched: number;
  chaptersRead: number;
  mediaIds: number[];
  format: MediaFormat;
}
