import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from '@react-navigation/native';
import { Colors } from '@/theme/colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const colorScheme = useColorScheme();

  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.light.primary,
      background: Colors.light.background,
      card: Colors.light.card,
      text: Colors.light.text,
      border: Colors.light.border,
      notification: Colors.light.red,

      tint: Colors.light.tint,
      icon: Colors.light.icon,
      tabIconDefault: Colors.light.tabIconDefault,
      tabIconSelected: Colors.light.tabIconSelected,
    },
  };

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.dark.primary,
      background: Colors.dark.background,
      card: Colors.dark.card,
      text: Colors.dark.text,
      border: Colors.dark.border,
      notification: Colors.dark.red,

      tint: Colors.dark.tint,
      icon: Colors.dark.icon,
      tabIconDefault: Colors.dark.tabIconDefault,
      tabIconSelected: Colors.dark.tabIconSelected,
    },
  };

  return (
    <RNThemeProvider
      value={colorScheme === 'dark' ? customDarkTheme : customLightTheme}
    >
      {children}
    </RNThemeProvider>
  );
};
