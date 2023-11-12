import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { readAsStringAsync } from 'expo-file-system';
import { useAtomValue } from 'jotai/react';

import type { UseWebViewData } from '@/contexts/webview';
import { useWebView } from '@/contexts/webview';
import { currentModuleIdAtom } from '@/store';
import { getModuleFilePath } from '@/utils/module';

const getFileContent = async (moduleId: string, fileName: string) => {
  const filePath = getModuleFilePath(moduleId, fileName);
  const file = await readAsStringAsync(filePath);

  return file;
};

const useWebViewData = <Type>(
  queryKey: any[],
  queryFn: (webview: UseWebViewData) => Promise<Type>,
  queryOptions?: UseQueryOptions<Type, unknown, Type, any[]>
) => {
  const webview = useWebView();
  const currentModuleId = useAtomValue(currentModuleIdAtom);

  if (currentModuleId) {
    queryKey.push(currentModuleId);
  }

  return useQuery(
    queryKey,
    async () => {
      const moduleCode = await getFileContent(currentModuleId!, 'index.js');

      webview.loadScript(moduleCode);

      return queryFn(webview);
    },
    {
      ...queryOptions,
      enabled: (queryOptions?.enabled ?? true) && !!currentModuleId,
    }
  );
};

export default useWebViewData;
