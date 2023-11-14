import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Button, Text, View } from '@/ui';
import Sticker from '@/ui/sticker';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('AnimeHome');
    }
  };

  return (
    <View className="flex flex-1 items-center justify-center">
      <Sticker name="persevere" className="mb-4 h-24 w-24" />

      <Text>{message}</Text>

      <Button className="mt-2" onPress={handleGoBack}>
        <Text>Go back</Text>
      </Button>
    </View>
  );
};

export default ErrorMessage;
