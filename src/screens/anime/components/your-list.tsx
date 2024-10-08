import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Button, Text } from '@/ui';

const YourList = () => {
  const navigation = useNavigation();

  return (
    <Button
      onPress={() => {
        navigation.navigate('AnimeList');
      }}
      variant="defaults"
      className="mr-2 grow bg-thunder-800"
    >
      <Text>Your Anime List</Text>
    </Button>
  );
};

export default YourList;
