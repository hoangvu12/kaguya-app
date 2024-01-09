import { MMKV } from 'react-native-mmkv';
import { z } from 'zod';

import providers from '@/providers';
import { BasicInfoSchema } from '@/providers/core';
import { createParseJSONSchema } from '@/utils/zod';

const NAMESPACE = 'kaguya_providers';

export type ProviderType = keyof typeof providers;

export function getKeys<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj);
}

const StorageProviderSchema = z.object({
  type: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  data: BasicInfoSchema.passthrough(),
});

const parseJSON = createParseJSONSchema(z.array(StorageProviderSchema));

export type StorageProvider = z.infer<typeof StorageProviderSchema>;

const storage = new MMKV();

export function getProviders(): StorageProvider[] {
  try {
    const data = storage.getString(NAMESPACE);

    if (!data) return [];

    const parsedData = parseJSON.safeParse(data);

    if (!parsedData.success) return [];

    return parsedData.data;
  } catch (err) {
    console.error('Failed to get providers', err);

    return [];
  }
}

export function saveProvider(provider: StorageProvider) {
  let existData = storage.getString(NAMESPACE);

  if (!existData) {
    storage.set(NAMESPACE, JSON.stringify([provider]));

    return;
  }

  try {
    const parsedData = parseJSON.safeParse(existData);

    if (!parsedData.success) {
      return;
    }

    const parsedProvider = parsedData.data;

    const existingProvider = parsedProvider.find(
      (p) => p.type === provider.type
    );

    if (existingProvider) {
      existingProvider.accessToken = provider.accessToken;
      existingProvider.refreshToken = provider.refreshToken;
      existingProvider.data = provider.data;
    } else {
      parsedProvider.push(provider);
    }

    storage.set(NAMESPACE, JSON.stringify(parsedProvider));
  } catch (err) {
    console.error('save provider', err);
  }
}

export function getProvider(type: ProviderType): StorageProvider | undefined {
  const providers = getProviders();

  return providers.find((provider) => provider.type === type);
}

export function deleteProvider(type: ProviderType) {
  const providers = getProviders();

  const newProviders = providers.filter((provider) => provider.type !== type);

  storage.set(NAMESPACE, JSON.stringify(newProviders));
}

export function getSignedInProviders() {
  const storageProviders = getProviders();

  const signedInProviders = Object.keys(providers)
    .filter((provider) => {
      return storageProviders.find(
        (storageProvider) => storageProvider.type === provider
      );
    })
    .map((providerName) => providers[providerName as ProviderType]);

  return signedInProviders;
}
