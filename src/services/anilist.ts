import type { RequestMiddleware, ResponseMiddleware } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import { ToastAndroid } from 'react-native';

import { getProvider } from '@/storage/provider';

const endpoint = 'https://graphql.anilist.co';

const requestMiddleware: RequestMiddleware = async (request) => {
  const provider = getProvider('anilist');

  if (!provider?.accessToken) {
    return request;
  }

  return {
    ...request,
    headers: {
      ...request.headers,
      authorization: `Bearer ${provider.accessToken}`,
    },
  };
};

const responseMiddleware: ResponseMiddleware = async (response) => {
  if (response instanceof Error) {
    ToastAndroid.show(
      `[Error AniList Request] (${response.message})`,
      ToastAndroid.LONG
    );
  }

  return response;
};

const anilistClient = new GraphQLClient(endpoint, {
  requestMiddleware,
  responseMiddleware,
});

export default anilistClient;
