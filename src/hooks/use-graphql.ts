import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import anilistClient from '@/services/anilist';

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables extends Record<string, never> ? null : TVariables,
  options?: Omit<
    UseQueryOptions<TResult, unknown, TResult, any>,
    'queryKey' | 'queryFn' | 'initialData'
  > & {
    initialData?: () => undefined;
  }
) {
  return useQuery(
    [
      // This logic can be customized as desired
      document,
      variables,
    ] as const,
    async ({ queryKey: [document, variables] }) => {
      const data = await anilistClient.request(document, variables || {});

      return data;
    },
    options
  );
}
