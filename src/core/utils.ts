import * as Clipboard from 'expo-clipboard';
import { ToastAndroid } from 'react-native';

export const formatNumberToAbbreviated = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
};

export const stripHTML = (str: string) => {
  return str.replace(/(<([^>]+)>)/gi, '');
};

export const copyToClipboard = async (str: string) => {
  await Clipboard.setStringAsync(str);

  ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
};
