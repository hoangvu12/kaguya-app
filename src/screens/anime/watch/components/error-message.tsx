import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, RefreshCcw } from 'lucide-react-native';
import React from 'react';

import { Button, Text, View } from '@/ui';
import Sticker from '@/ui/sticker';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
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

      <View className="mt-2 flex flex-row items-center space-x-2">
        <Button onPress={handleGoBack}>
          <ArrowLeft size={16} style={{ color: 'white' }} />

          <Text>Go back</Text>
        </Button>

        <Button className="bg-gray-600" onPress={onRetry}>
          <RefreshCcw size={16} style={{ color: 'white' }} />

          <Text className="ml-2">Retry</Text>
        </Button>
      </View>
    </View>
  );
};

export default ErrorMessage;
