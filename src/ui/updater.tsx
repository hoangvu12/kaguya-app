import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';

import { Env } from '@/core/env';

import { Button, Text } from './core';
import BottomSheet from './core/bottom-sheet';

export interface Release {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: Author;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: Asset[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}

export interface Asset {
  url: string;
  id: number;
  node_id: string;
  name: string;
  label: string;
  uploader: Author;
  content_type: string;
  state: string;
  size: number;
  download_count: number;
  created_at: string;
  updated_at: string;
  browser_download_url: string;
}

export interface Author {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

const getReleases = async () => {
  const { data: releases } = await axios.get<Release[]>(
    'https://api.github.com/repos/hoangvu12/kaguya-app/releases',
    { validateStatus: () => true }
  );

  if (!releases?.length) return [];

  if (Env.APP_ENV === 'alpha') {
    return releases.filter((release) => release.prerelease);
  }

  if (Env.APP_ENV === 'production') {
    return releases.filter((release) => !release.prerelease);
  }

  return [];
};

const Updater = () => {
  const [release, setRelease] = useState<Release | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const bottomSheetRef = useRef<BottomSheetModal | null>(null);

  const handleGetUpdate = useCallback(async () => {
    const releases = await getReleases();

    const release = releases[0]; // hoping that the latest release is the first one

    if (!release) return;

    // release.name starts with a 'v' so we need to remove it
    if (release.name.substring(1) === Env.VERSION) return;

    setRelease(release);
  }, []);

  const handleUpdate = useCallback(async () => {
    try {
      setErrorMessage('');
      setIsLoading(true);

      const assets = release?.assets;

      if (!assets?.length) {
        throw new Error('Failed to get the apk url');
      }

      const apkUrl = assets.find((asset) => asset.name.endsWith('.apk'));

      if (!apkUrl) {
        throw new Error('Failed to get the apk url');
      }

      const downloadedApkUrl = `${FileSystem.cacheDirectory}${apkUrl.name}`;

      const result = await FileSystem.downloadAsync(
        apkUrl.browser_download_url,
        downloadedApkUrl
      );

      if (result.status !== 200) throw new Error('Failed to download the apk');

      const contentUri = await FileSystem.getContentUriAsync(downloadedApkUrl);

      const startActivityAsync = await IntentLauncher.startActivityAsync(
        'android.intent.action.INSTALL_PACKAGE',
        {
          data: contentUri,
          flags: 1,
        }
      );

      setIsLoading(false);

      if (startActivityAsync.resultCode === 0) {
        throw new Error('Failed to update the app, did you cancel it?');
      }
    } catch (err: any) {
      setErrorMessage(JSON.stringify(err));
      setIsLoading(false);
    }
  }, [release]);

  useEffect(() => {
    if (Env.APP_ENV === 'development') return;

    handleGetUpdate();
  }, [handleGetUpdate]);

  useEffect(() => {
    if (!release) return;

    bottomSheetRef.current?.present();
  }, [release]);

  if (!release) return null;

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={['80%']}>
      <Text className="mb-2 text-xl" weight="bold">
        New update available:{' '}
        <Text className="text-xl text-primary-300" weight="bold">
          {release.name}
        </Text>
      </Text>

      <Text className="mb-4 text-lg">Changelog:</Text>

      <Text className="mb-8 bg-thunder-800 p-4">{release.body}</Text>

      <Button loading={isLoading} onPress={handleUpdate}>
        <Text>Update now</Text>
      </Button>

      {errorMessage ? (
        <Text className="mt-4 text-red-300" weight="semibold">
          Error: {errorMessage}
        </Text>
      ) : null}
    </BottomSheet>
  );
};

export default Updater;
