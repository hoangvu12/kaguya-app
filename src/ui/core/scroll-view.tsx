import { styled } from 'nativewind';
import { ScrollView as NScrollView } from 'react-native-gesture-handler';

export const ScrollView = styled(NScrollView, {
  classProps: ['contentContainerStyle', 'className'],
});
