import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

let adaptiveIcon = '';
let icon = '';
let name = '';

if (Env.APP_ENV === 'development') {
  adaptiveIcon = './assets/dev-adaptive-icon.png';
  icon = './assets/dev-icon.png';
  name = `${Env.NAME} Dev`;
} else if (Env.APP_ENV === 'alpha') {
  adaptiveIcon = './assets/alpha-adaptive-icon.png';
  icon = './assets/alpha-icon.png';
  name = `${Env.NAME} Alpha`;
} else {
  adaptiveIcon = './assets/adaptive-icon.png';
  icon = './assets/icon.png';
  name = Env.NAME;
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  backgroundColor: '#1c1414',
  scheme: 'kaguya',
  name,
  description: `${Env.NAME} is an app with a good user interface that let you watch anime and read manga for free.`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  slug: 'kaguya',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: adaptiveIcon,
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#1c1414',
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/164546e7-f02b-4311-904c-c00f24be990b',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },

  android: {
    permissions: ['READ_EXTERNAL_STORAGE', 'REQUEST_INSTALL_PACKAGES'],
    adaptiveIcon: {
      foregroundImage: adaptiveIcon,
      backgroundColor: '#1c1414',
    },
    package: Env.PACKAGE,
    icon: icon,
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
          kotlinVersion: '1.7.22', // this is for softinput package,
          compileSdkVersion: 34,
        },
      },
    ],
    [
      'expo-updates',
      {
        username: 'hoangvu12',
      },
    ],
    'sentry-expo',
    '@config-plugins/react-native-google-cast',
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },

  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'kaguya-et',
          project: 'kaguya-app',
        },
      },
    ],
  },
});
