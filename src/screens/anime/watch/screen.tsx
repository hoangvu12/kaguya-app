import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';

import MediaContainer from './components/media-container';

export const AnimeWatchScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    Orientation.lockToLandscapeLeft();

    const parent = navigation.getParent();

    parent?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });

    return () => {
      parent?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  return (
    <MediaContainer
      container={{
        videos: [
          {
            file: {
              url: 'https://eno.tendoloads.com/_v6/6f92a07ef6940b8501bb3aa52b4d82ec98485760d376a8c6c6303a9c69d0c22b3408bf7bfee5510210967dbc44183c16cfd431d1f3ce3b009b9baaf916b7d1dda93b5011ff9afc6910bbac8009d4719aa29c514494ba06ef2ef9373dc5b7543291c64a15c27c14c237768a8ec7871aad4801e31b56e1e0ca7d95b78f72b4de81/master.m3u8',
            },
            format: 'hls',
          },
        ],
        subtitles: [
          {
            file: {
              url: 'https://cc.zorores.com/60/af/60af38b69266939d65762b8fb6d0bc30/ara-6.vtt',
            },
            language: 'Arabic',
            format: 'vtt',
          },
          {
            file: {
              url: 'https://cc.zorores.com/60/af/60af38b69266939d65762b8fb6d0bc30/eng-2.vtt',
            },
            language: 'English',
            format: 'vtt',
          },
          {
            file: {
              url: 'https://cc.zorores.com/60/af/60af38b69266939d65762b8fb6d0bc30/fre-7.vtt',
            },
            language: 'French',
            format: 'vtt',
          },
          {
            file: {
              url: 'https://cc.zorores.com/60/af/60af38b69266939d65762b8fb6d0bc30/ger-8.vtt',
            },
            language: 'German',
            format: 'vtt',
          },
          {
            file: {
              url: 'https://cc.zorores.com/60/af/60af38b69266939d65762b8fb6d0bc30/ita-9.vtt',
            },
            language: 'Italian',
            format: 'vtt',
          },
          {
            file: {
              url: 'https://cc.zorores.com/60/af/60af38b69266939d65762b8fb6d0bc30/por-3.vtt',
            },
            language: 'Portuguese - Portuguese(Brazil)',
            format: 'vtt',
          },
          {
            file: {
              url: 'https://cc.zorores.com/60/af/60af38b69266939d65762b8fb6d0bc30/rus-10.vtt',
            },
            language: 'Russian',
            format: 'vtt',
          },
          {
            file: {
              url: 'https://cc.zorores.com/60/af/60af38b69266939d65762b8fb6d0bc30/spa-5.vtt',
            },
            language: 'Spanish',
            format: 'vtt',
          },
          {
            file: {
              url: 'https://cc.zorores.com/60/af/60af38b69266939d65762b8fb6d0bc30/spa-4.vtt',
            },
            language: 'Spanish - Spanish(Latin_America)',
            format: 'vtt',
          },
        ],
        timestamps: [
          {
            type: 'Intro',
            startTime: 67,
            endTime: 157,
          },
          {
            type: 'Outro',
            startTime: 1320,
            endTime: 1409,
          },
        ],
        fonts: [],
      }}
    />
  );
};
