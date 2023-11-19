import AnilistProvider from './anilist';

const providers = {
  anilist: new AnilistProvider(),
} as const;

export default providers;
