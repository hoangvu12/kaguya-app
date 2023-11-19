import type { RequestMiddleware } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';

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

const anilistClient = new GraphQLClient(endpoint, { requestMiddleware });

export default anilistClient;
