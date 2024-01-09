import axios from 'axios';

export type ContentMetadata = {
  providerId: string;
  data: Metadata[];
};

export type Metadata = {
  id: string;
  description?: string;
  hasDub: boolean;
  img?: string;
  isFiller: boolean;
  number: number;
  title: string;
  updatedAt: number;
  rating: number;
};

export const getContentMetadata = async (anilistId: number) => {
  try {
    const { data } = await axios.get<ContentMetadata[]>(
      `https://api.anify.tv/content-metadata/${anilistId}`
    );

    if (!data.length) {
      return [];
    }

    const metadata = data.find(
      (metadata) =>
        metadata.providerId === 'tmdb' || metadata.providerId === 'tvdb'
    );

    if (!metadata) {
      return data[0]?.data;
    }

    return metadata.data;
  } catch (err) {
    return [];
  }
};
