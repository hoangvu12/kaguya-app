import axios from 'axios';

import type { Media } from '@/gql/graphql';
import { MediaFormat } from '@/gql/graphql';
import { removeArrayOfObjectDup } from '@/utils';
import { getMapping } from '@/utils/mapping';

export declare module TMDBSearch {
  export interface KnownFor {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    adult?: boolean;
    original_title: string;
    release_date: string;
    title: string;
    video?: boolean;
  }

  export interface Result {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    gender?: number;
    known_for: KnownFor[];
    known_for_department: string;
    name: string;
    profile_path: string;
    first_air_date: string;
    origin_country: string[];
    original_name: string;
  }

  export interface Response {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
  }
}

export declare module TMDBTranlations {
  export interface Data {
    name: string;
    overview: string;
    homepage: string;
    tagline: string;
    title: string;
  }

  export interface Translation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: Data;
  }

  export interface Response {
    id: number;
    translations: Translation[];
  }
}

export interface Translation {
  locale: string;
  description: string;
  title: string | null;
}

type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

const TMDB_KEY = 'e8d53ad78d99a4722c3f0f0f6a5c9014';

const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDB_KEY,
  },
});

export const getTMDBId = async (
  media: Pick<Media, 'id' | 'format' | 'title'>
) => {
  const mapping = await getMapping('anilist_id', media.id);

  if (mapping?.themoviedb_id) return mapping.themoviedb_id;

  if (mapping?.thetvdb_id) {
    const { data } = await client.get<any>(`/find/${mapping.thetvdb_id}`, {
      params: {
        external_source: 'tvdb_id',
      },
    });

    if (data?.tv_results?.[0]?.id) return data?.tv_results?.[0]?.id;
  }

  const type = media.format === MediaFormat.Movie ? 'movie' : 'tv';

  const title = media.title?.english || media.title?.userPreferred;

  if (!title) return null;

  const searchResult = await search(title, type);

  return searchResult?.id;
};

export const getSeasons = async (tmdbId: number) => {
  const { data } = await client.get<any>(`/tv/${tmdbId}`);

  if (!data?.seasons) return null;

  const filteredSeasons = data.seasons.filter(
    (season: any) => season?.season_number > 0
  );

  return filteredSeasons as Season[];
};

export const getSeason = async (
  seasons: Season[],
  date: { year: number; month: number; day: number },
  totalEpisodes?: number
) => {
  try {
    const filterSeason = (seasons: Season[], key: keyof typeof date) => {
      return seasons.filter((season) => {
        if (!season?.air_date) return false;

        // 2021-01-11
        let [seasonYearString, seasonMonthString, seasonDayString] =
          season.air_date.split('-');

        const seasonYear = Number(seasonYearString);
        const seasonMonth = Number(seasonMonthString);
        const seasonDay = Number(seasonDayString);

        if (key === 'day') {
          return seasonDay === date.day;
        }

        if (key === 'month') {
          return seasonMonth === date.month;
        }

        if (key === 'year') {
          return seasonYear === date.year;
        }
      });
    };

    const yearSeasons = filterSeason(seasons, 'year');

    if (yearSeasons.length === 0) return null;

    if (yearSeasons.length === 1) return yearSeasons[0];

    const monthSeasons = filterSeason(yearSeasons, 'month');

    if (monthSeasons.length === 0) return null;

    if (monthSeasons.length === 1) return monthSeasons[0];

    const daySeasons = filterSeason(monthSeasons, 'day');

    if (daySeasons.length === 0) return null;

    if (daySeasons.length === 1) return daySeasons[0];

    if (totalEpisodes) {
      const season = daySeasons.find(
        (season) => season.episode_count === totalEpisodes
      );

      if (season) return season;
    }

    return daySeasons[0];
  } catch (err) {
    console.error('getSeason tmdb', err);

    return null;
  }
};

export const getSeasonTranslations = async (tmdbId: number, season: Season) => {
  const { data } = await client.get<any>(
    `/tv/${tmdbId}/season/${season.season_number}/translations`
  );

  if (!data?.translations?.length) return [];

  return data.translations.map((translation: any) => ({
    ...translation,
    season,
  }));
};

export const search = async (keyword: string, type: 'movie' | 'tv') => {
  const { data } = await client.get<TMDBSearch.Response>(`/search/${type}`, {
    params: { language: 'en-US', query: keyword, page: 1, include_adult: true },
  });

  if (!data?.results?.length) return null;

  return data.results[0];
};

export const getMediaTranslations = async (
  media: Media
): Promise<Translation[]> => {
  try {
    const type = media.format === MediaFormat.Movie ? 'movie' : 'tv';

    const id = await getTMDBId(media);

    if (!id) return [];

    const { data } = await client.get<TMDBTranlations.Response>(
      `/${type}/${id}/translations`
    );

    const overallMediaTranslation = removeArrayOfObjectDup(
      data.translations.map((trans) => ({
        locale: trans.iso_639_1,
        description: trans.data.overview,
        title: trans.data.title || trans.data.name || null,
      })),
      'locale'
    );

    if (type === 'movie') return overallMediaTranslation;

    const seasons = await getSeasons(id);

    if (!seasons?.length) return [];

    if (!media.startDate) return [];

    const season = await getSeason(
      seasons,
      media.startDate as any,
      media.episodes as any
    );

    if (!season?.season_number) return overallMediaTranslation;

    const seasonTranslations = await getSeasonTranslations(id, season);

    const translations = overallMediaTranslation.map((translation) => {
      const seasonTranslation = seasonTranslations.find(
        (seasonTranslation: any) =>
          seasonTranslation.iso_639_1 === translation.locale
      );

      const shouldAddSeasonSuffix = seasons?.length > 1;

      const title = translation.title
        ? `${translation.title} ${
            shouldAddSeasonSuffix ? `(${season?.season_number})` : ''
          }`
        : null;

      return {
        locale: translation.locale,
        description:
          seasonTranslation?.data?.overview || translation.description || null,
        title: seasonTranslation?.data?.title || title,
      };
    });

    return translations || [];
  } catch (err) {
    return [];
  }
};

export const getTMDBEpisodes = async (
  tmdbId: number,
  seasonNumber: number,
  language = 'en'
) => {
  const { data } = await client.get<any>(
    `/tv/${tmdbId}/season/${seasonNumber}`,
    {
      params: {
        language,
      },
    }
  );

  if (!data?.episodes?.length) return [];

  return data.episodes;
};

export const getEpisodes = async (
  tmdbId: number,
  seasonNumber: number,
  language = 'en'
) => {
  try {
    const episodes = await (async () => {
      const promises = [];
      const languageEpisodesPromise = getTMDBEpisodes(
        tmdbId,
        seasonNumber,
        language
      );

      promises.push(languageEpisodesPromise);

      // If the requested language is not English, we will fetch english episodes and use them as fallback.
      if (language !== 'en') {
        const fallbackEpisodesPromise = getTMDBEpisodes(
          tmdbId,
          seasonNumber,
          'en'
        );

        promises.push(fallbackEpisodesPromise);
      } else {
        promises.push(Promise.resolve([]));
      }

      const [languageEpisodes = [], fallbackEpisodes = []] = await Promise.all(
        promises
      );

      const episodes = languageEpisodes.map(
        (languageEpisode: any, index: number) => {
          const fallbackEpisode = fallbackEpisodes[index];

          const name = !languageEpisode.name?.startsWith('Episode')
            ? languageEpisode.name
            : fallbackEpisode?.name || languageEpisode.name;

          const overview = languageEpisode.overview
            ? languageEpisode.overview
            : fallbackEpisode?.overview || languageEpisode.overview;

          return {
            ...languageEpisode,
            name: name,
            overview: overview,
            locale: language,
          };
        }
      );

      return episodes;
    })();

    const validEpisodes = episodes.filter(
      (episode: any) => !episode.name?.startsWith('Episode')
    );

    const composedEpisodes = validEpisodes.map((episode: any) => ({
      title: episode.name,
      description: episode.overview,
      image: episode.still_path
        ? 'https://image.tmdb.org/t/p/w500' + episode.still_path
        : null,
      episodeNumber: episode.episode_number,
      locale: episode.locale,
    }));

    return composedEpisodes;
  } catch (err) {
    console.error('getEpisodes tmdb', err);

    return [];
  }
};

export const getEpisodeInfo = async (
  anilist: Pick<Media, 'startDate' | 'episodes' | 'id' | 'format' | 'title'>,
  language = 'en'
) => {
  try {
    const tmdbId = await getTMDBId(anilist);

    if (!tmdbId) return [];

    const seasons = await getSeasons(tmdbId);

    if (!seasons?.length) return [];

    const season = await getSeason(
      seasons,
      anilist.startDate as any,
      anilist.episodes as any
    );

    if (!season?.season_number) return [];

    const episodes = await getEpisodes(tmdbId, season?.season_number, language);

    return episodes as {
      description: string;
      episodeNumber: number;
      image: string;
      locale: string;
      title: string;
    }[];
  } catch (err) {
    console.error('get episode info tmdb', err);

    return [];
  }
};
