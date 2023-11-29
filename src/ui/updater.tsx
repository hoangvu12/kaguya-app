import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import Markdown from 'react-native-markdown-display';

import { Env } from '@/core/env';

import { Button, Text, View } from './core';
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
      <View className="pb-12">
        <Text className="mb-4 text-xl" weight="bold">
          New update available:{' '}
          <Text className="text-xl text-primary-300" weight="bold">
            {release.name}
          </Text>
        </Text>

        {/* @ts-expect-error  */}
        <Markdown style={markdownStyles}>{release.body}</Markdown>

        <Button loading={isLoading} onPress={handleUpdate}>
          <Text>Update now</Text>
        </Button>

        {errorMessage ? (
          <Text className="mt-4 text-red-300" weight="semibold">
            Error: {errorMessage}
          </Text>
        ) : null}
      </View>
    </BottomSheet>
  );
};

const markdownStyles = {
  // The main container
  body: {},

  // Headings
  heading1: {
    flexDirection: 'row',
    fontSize: 32,
    fontFamily: 'Outfit-Bold',
  },
  heading2: {
    flexDirection: 'row',
    fontSize: 24,
  },
  heading3: {
    flexDirection: 'row',
    fontSize: 18,
  },
  heading4: {
    flexDirection: 'row',
    fontSize: 16,
  },
  heading5: {
    flexDirection: 'row',
    fontSize: 13,
  },
  heading6: {
    flexDirection: 'row',
    fontSize: 11,
  },

  // Horizontal Rule
  hr: {
    backgroundColor: '#000000',
    height: 1,
  },

  // Emphasis
  strong: {
    fontWeight: 'bold',
  },
  em: {
    fontStyle: 'italic',
  },
  s: {
    textDecorationLine: 'line-through',
  },

  // Blockquotes
  blockquote: {
    backgroundColor: '#F5F5F5',
    borderColor: '#CCC',
    borderLeftWidth: 4,
    marginLeft: 5,
    paddingHorizontal: 5,
  },

  // Lists
  bullet_list: {},
  ordered_list: {},
  list_item: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_icon: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white',
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_content: {
    flex: 1,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_content: {
    flex: 1,
  },

  // Code
  code_inline: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },
  code_block: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },
  fence: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'Courier',
      },
      ['android']: {
        fontFamily: 'monospace',
      },
    }),
  },

  // Tables
  table: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3,
  },
  thead: {},
  tbody: {},
  th: {
    flex: 1,
    padding: 5,
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
  },
  td: {
    flex: 1,
    padding: 5,
  },

  // Links
  link: {
    textDecorationLine: 'underline',
  },
  blocklink: {
    flex: 1,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },

  // Images
  image: {
    flex: 1,
  },

  // Text Output
  text: {
    color: 'white',
    fontFamily: 'Outfit-Medium',
  },
  textgroup: {},
  paragraph: {
    marginTop: 24,
    marginBottom: 24,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  hardbreak: {
    width: '100%',
    height: 1,
  },
  softbreak: {},

  // Believe these are never used but retained for completeness
  pre: {},
  inline: {},
  span: {},
};

export default Updater;
