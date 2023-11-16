import type { Theme } from '@react-navigation/native';
import { DarkTheme as _DarkTheme } from '@react-navigation/native';

import { colors } from '@/ui/theme';

const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: colors.primary[200],
    background: colors.thunder[950],
    text: colors.thunder[100],
    border: colors.thunder[500],
    card: colors.thunder[800],
  },
};

// const LightTheme: Theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: colors.primary[400],
//     background: colors.white,
//   },
// };

export function useThemeConfig() {
  // if (colorScheme === 'dark') return DarkTheme;

  // return LightTheme;

  return DarkTheme;
}
