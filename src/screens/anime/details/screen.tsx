import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft } from 'lucide-react-native';
import * as React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

import { copyToClipboard } from '@/core';
import { graphql } from '@/gql';
import { useGraphQL } from '@/hooks/use-graphql';
import type { RootStackParamList } from '@/navigation/types';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/ui';
import colors from '@/ui/theme/colors';

import Header from './components/header';
import EpisodeScreen from './screens/episode-screen/screen';
import InfoScreen from './screens/info-screen/screen';

const document = graphql(`
  query InfoDetailsScreen($id: Int) {
    Media(id: $id) {
      title {
        userPreferred
      }
      ...DetailsHeaderMedia
      ...InfoScreenMedia
      ...EpisodeContainer
    }
  }
`);

type Props = NativeStackScreenProps<RootStackParamList, 'AnimeDetails'>;

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

export const AnimeDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState<'details' | 'episodes'>(
    route.params.tab || 'details'
  );
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const navigationTopProgress = useSharedValue(0);

  const handleChangeTab = (tab: 'details' | 'episodes') => () => {
    setActiveTab(tab);
  };

  const mediaId = route.params?.mediaId ?? 0;

  const { data, isLoading } = useGraphQL(document, { id: mediaId });

  const anime = data?.Media;

  const containerStyles = useAnimatedStyle(() => {
    return {
      opacity: navigationTopProgress.value,
    };
  });

  const titleStyles = useAnimatedStyle(() => {
    return {
      opacity: navigationTopProgress.value,
      transform: [
        {
          translateY: interpolate(
            navigationTopProgress.value,
            [0, 1],
            [100, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          ),
        },
      ],
    };
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={colors.primary[500]} size={48} />
      </View>
    );
  }

  if (!anime) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <>
      <FocusAwareStatusBar />

      <View className="relative">
        <AnimatedView
          style={containerStyles}
          className="absolute top-0 z-50 flex w-full flex-row items-center gap-2 overflow-hidden bg-thunder-900 p-4"
        >
          <Button
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('AnimeHome');
              }
            }}
            className="h-7 w-7 bg-transparent p-0"
          >
            <ArrowLeft size={28} color="white" />
          </Button>

          <AnimatedText
            onLongPress={() => {
              copyToClipboard(anime!.title!.userPreferred!);
            }}
            numberOfLines={1}
            style={titleStyles}
          >
            {anime?.title?.userPreferred}
          </AnimatedText>
        </AnimatedView>

        <ScrollView
          onScroll={(e) => {
            const scrollY = e.nativeEvent.contentOffset.y;

            navigationTopProgress.value = interpolate(
              scrollY,
              [0, headerHeight / 2],
              [0, 1]
            );
          }}
        >
          <View
            onLayout={(e) => {
              setHeaderHeight(e.nativeEvent.layout.height);
            }}
          >
            <Header media={anime} />
          </View>

          <View className="flex flex-row space-x-2 bg-thunder-950 p-4">
            <Button
              onPress={handleChangeTab('details')}
              className={twMerge(
                'flex-1 bg-thunder-900/60',
                activeTab === 'details' ? 'bg-primary-500' : 'bg-thunder-900/60'
              )}
            >
              <Text className="text-center">Details</Text>
            </Button>

            <Button
              onPress={handleChangeTab('episodes')}
              className={twMerge(
                'flex-1 bg-thunder-900/60',
                activeTab === 'episodes'
                  ? 'bg-primary-500'
                  : 'bg-thunder-900/60'
              )}
            >
              <Text className="text-center">Episodes</Text>
            </Button>
          </View>

          <View className="px-4">
            {activeTab === 'details' && <InfoScreen media={anime} />}
            {activeTab === 'episodes' && <EpisodeScreen media={anime} />}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
