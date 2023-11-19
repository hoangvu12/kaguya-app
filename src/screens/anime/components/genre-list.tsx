import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { GENRE_LIST } from '@/constants';
import { Image, Text, View } from '@/ui';
import Pressable from '@/ui/core/pressable';

interface Genre {
  label: string;
  thumbnail: string;
  value: string;
}

const GenreList = () => {
  const renderItem = useCallback(({ item }: { item: Genre }) => {
    return <GenreCard genre={item} />;
  }, []);

  return (
    <FlatList
      data={GENRE_LIST}
      horizontal
      style={{ overflow: 'visible' }}
      renderItem={renderItem}
      keyExtractor={(item) => item.value}
      ItemSeparatorComponent={Spacer}
    />
  );
};

const Spacer = () => <View className="w-2" />;

const GenreCard: React.FC<{ genre: Genre }> = React.memo(
  ({ genre: { label, thumbnail } }) => {
    const navigation = useNavigation();

    const handlePress = () => {
      navigation.navigate('Search', { genres: [label] });
    };

    return (
      <Pressable onPress={handlePress}>
        <View className="relative aspect-video w-28">
          <Image
            source={{
              uri: thumbnail,
            }}
            className="h-full w-full rounded-md"
            contentFit="cover"
          />

          <View className="absolute inset-0 flex items-center justify-center bg-thunder-900/70">
            <Text variant="md">{label}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
);

export default GenreList;
