import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useURL } from 'expo-linking';
import * as Linking from 'expo-linking';
import { useCallback, useEffect } from 'react';
import Toast from 'react-native-toast-message';

import { parseKModule, processKModule } from '@/utils/module';

import useModules from './use-modules';

const scheme = Linking.createURL('');

const useModuleLinking = () => {
  const url = useURL();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const installModule = useCallback(
    async (filePath: string) => {
      const { metadata: module, path } = await parseKModule(filePath);

      if (module && path) {
        navigation.navigate('Module');
      }

      await processKModule(module.id, path);

      queryClient.invalidateQueries(useModules.getKey(), { type: 'all' });

      Toast.show({
        text2: `Successfully installed module ${module.name}`,
        type: 'success',
      });
    },
    [navigation, queryClient]
  );

  useEffect(() => {
    if (!url) return;

    if (
      url.includes(scheme) ||
      url.includes('https://') ||
      url.includes('http://')
    )
      return;

    installModule(url);
  }, [installModule, url]);
};

export default useModuleLinking;
