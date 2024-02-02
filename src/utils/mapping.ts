import axios from 'axios';

const MAPPING_URL =
  'https://raw.githubusercontent.com/Fribb/anime-lists/master/anime-list-full.json';

export type Mapping = {
  livechart_id?: number;
  thetvdb_id?: number;
  'anime-planet_id'?: string;
  imdb_id?: string;
  anisearch_id?: number;
  themoviedb_id?: number;
  anidb_id?: number;
  kitsu_id?: number;
  mal_id?: number;
  type?: string;
  'notify.moe_id'?: string;
  anilist_id?: number;
};

let mappings: Mapping[] = [];

const init = async () => {
  if (mappings?.length) return;

  const { data } = await axios.get<Mapping[]>(MAPPING_URL);

  if (!Array.isArray(data)) return;

  mappings = data;
};

export const getMapping = async <T extends keyof Mapping>(
  mappingProvider: T,
  id: Mapping[T]
) => {
  await init();

  const mapping = mappings.find((m) => m[mappingProvider] === id);

  return mapping;
};
