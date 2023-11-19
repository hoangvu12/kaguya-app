import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getInfoAsync, readAsStringAsync } from 'expo-file-system';
import { useAtomValue } from 'jotai/react';
import Toast from 'react-native-toast-message';

import type { UseWebViewData } from '@/contexts/webview';
import { useWebView } from '@/contexts/webview';
import { currentModuleIdAtom } from '@/store';
import { getModuleFilePath } from '@/utils/module';

const getFileContent = async (moduleId: string, fileName: string) => {
  const filePath = getModuleFilePath(moduleId, fileName);

  const info = await getInfoAsync(filePath);

  if (!info.exists) return null;

  const file = await readAsStringAsync(filePath);

  return file;
};

const useWebViewData = <Type>(
  queryKey: any[],
  queryFn: (webview: UseWebViewData) => Promise<Type>,
  queryOptions?: UseQueryOptions<Type, Error, Type, any[]>
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

      if (!moduleCode) throw new Error('Module not found');

      webview.loadScript(moduleCode);

      return queryFn(webview);
    },
    {
      ...queryOptions,
      onError: (error: Error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message ?? 'Something went wrong',
        });
      },
      enabled: (queryOptions?.enabled ?? true) && !!currentModuleId,
    }
  );
};

export default useWebViewData;
