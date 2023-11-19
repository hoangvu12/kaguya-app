import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useURL } from 'expo-linking';
import { User } from 'lucide-react-native';
import React, { useCallback, useEffect } from 'react';
import Toast from 'react-native-toast-message';

import providers from '@/providers';
import type { ProviderType } from '@/storage/provider';
import { deleteProvider, getProviders, saveProvider } from '@/storage/provider';
import { Button, Text, View } from '@/ui';
import Avatar from '@/ui/core/avatar';
import Pressable from '@/ui/core/pressable';
import { paramsToObject } from '@/utils';

const AccountSettings = () => {
  const url = useURL();
  const queryClient = useQueryClient();

  const invalidateProviders = useCallback(() => {
    queryClient.invalidateQueries(['providers']);
  }, [queryClient]);

  const handleAuth = useCallback(
    async (url: string) => {
      if (!url) return;

      const params = paramsToObject(url.split('?')[1]);

      const providerParam = params?.provider as ProviderType;

      if (!providerParam) return;

      if (!providers[providerParam]) return;

      const provider = providers[providerParam];

      const token = await provider.handleCode(url);

      const info = await provider.getInfo(token.accessToken);

      if (!info) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Failed to get ${providerParam} info`,
        });
      }

      saveProvider({
        accessToken: token.accessToken,
        data: info,
        type: providerParam,
        refreshToken: token.refreshToken,
      });

      invalidateProviders();
    },
    [invalidateProviders]
  );

  const signOut = (providerName: ProviderType) => {
    if (!providerName || !providers[providerName]) {
      throw new Error('Provider not found');
    }

    deleteProvider(providerName);

    invalidateProviders();
  };

  useEffect(() => {
    if (!url) return;

    handleAuth(url);
  }, [handleAuth, url]);

  const handleLogin = useCallback(async (provider: ProviderType) => {
    const providerObj = providers[provider];

    providerObj.signIn();
  }, []);

  const { data: storageProviders = [], isLoading } = useQuery(
    ['providers'],
    () => {
      return getProviders();
    }
  );

  return (
    <View>
      <Text className="mb-2 text-xl" weight="medium">
        Account
      </Text>

      {isLoading && <Text>Loading...</Text>}

      {Object.entries(providers).map(([key, provider]) => {
        const storageProvider = storageProviders.find(
          (storageProvider) => key === storageProvider.type
        );

        return (
          <View
            key={key}
            className="flex flex-row items-center justify-between"
          >
            <View className="flex flex-row items-center space-x-4">
              <provider.icon className="h-6 w-6 text-white" />

              {storageProvider?.accessToken ? (
                <View>
                  <Text weight="semibold">{storageProvider.data.name}</Text>
                  <Pressable
                    onPress={() => {
                      signOut(storageProvider.type as ProviderType);
                    }}
                  >
                    <Text>Sign out</Text>
                  </Pressable>
                </View>
              ) : (
                <Button
                  onPress={() => {
                    handleLogin(key as ProviderType);
                  }}
                  className="bg-transparent"
                >
                  <Text weight="semibold">Login</Text>
                </Button>
              )}
            </View>

            {storageProvider?.data?.avatar ? (
              <Avatar
                source={{ uri: storageProvider.data.avatar }}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <User size={24} color="white" />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default AccountSettings;
