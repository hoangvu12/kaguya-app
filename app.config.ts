import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  backgroundColor: '#1c1414',
  scheme: 'kaguya',
  name: Env.NAME,
  description: `${Env.NAME} is an app with a good user interface that let you watch anime and read manga for free.`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  slug: 'kaguya',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/adaptive-icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#1c1414',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },

  android: {
    permissions: ['READ_EXTERNAL_STORAGE'],
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#1c1414',
    },
    package: Env.PACKAGE,
    icon: './assets/adaptive-icon.png',
    intentFilters: [
      {
        action: 'VIEW',
        data: [
          {
            scheme: 'https',
            host: 'anilist.co',
            pathPrefix: '/anime',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
      {
        action: 'VIEW',
        data: [
          {
            scheme: 'https',
            host: 'anilist.co',
            pathPrefix: '/manga',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
      {
        action: 'VIEW',
        data: {
          scheme: 'content',
          pathPattern: '.*\\\\.kmodule',
          mimeType: 'application/zip',
        },
        category: ['DEFAULT', 'BROWSABLE'],
      },
      {
        action: 'VIEW',
        data: {
          scheme: 'content',
          pathPattern: '.*\\\\.kmodule',
          mimeType: 'application/octet-stream',
        },
        category: ['DEFAULT', 'BROWSABLE'],
      },
    ],
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      '@bacons/link-assets',
      [
        './assets/fonts/Outfit-Black.ttf',
        './assets/fonts/Outfit-Bold.ttf',
        './assets/fonts/Outfit-ExtraBold.ttf',
        './assets/fonts/Outfit-ExtraLight.ttf',
        './assets/fonts/Outfit-Light.ttf',
        './assets/fonts/Outfit-Medium.ttf',
        './assets/fonts/Outfit-Regular.ttf',
        './assets/fonts/Outfit-SemiBold.ttf',
        './assets/fonts/Outfit-Thin.ttf',
      ],
    ],
    [
      'expo-build-properties',
      {
        android: {
          kotlinVersion: '1.7.22', // this is for softinput package
        },
      },
    ],
    [
      'app-icon-badge',
      {
        enabled: true,
        badges: [
          {
            text: Env.APP_ENV,
            type: 'banner',
            color: 'white',
          },
          {
            text: Env.VERSION.toString(),
            type: 'ribbon',
            color: 'white',
          },
        ],
      },
    ],
    [
      'expo-updates',
      {
        username: 'hoangvu12',
      },
    ],
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
