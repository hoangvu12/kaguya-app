import type { UseQueryOptions } from '@tanstack/react-query';
import { z } from 'zod';

import { SearchResultSchema } from '@/core/search-result';
import useWebViewData from '@/hooks/use-webview-data';
import type { SearchResult } from '@/types';

const useAnimeSearch = (
  query: string,
  options?: UseQueryOptions<SearchResult[], unknown, SearchResult[], any[]>
) => {
  return useWebViewData(
    ['anime-search', query],
    async (webview) => {
      const nonValidatedSearchResults = await webview.sendMessage<
        SearchResult[]
      >('anime.search', {
        query,
      });

      const validation = z
        .array(SearchResultSchema)
        .safeParse(nonValidatedSearchResults);

      if (!validation.success) {
        console.warn(validation.error);

        return [];
      }

      return validation.data;
    },
    { ...options, retry: 0, enabled: options?.enabled && !!query }
  );
};

export default useAnimeSearch;
