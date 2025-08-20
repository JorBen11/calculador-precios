/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { darkTheme, lightTheme } from "@/theme/theme";

export const Colors = {
  light: {
    text: lightTheme.colors?.onSurface,
    background: lightTheme.colors?.background,
    tint: lightTheme.colors?.primary,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: lightTheme.colors?.primary,
  },
  dark: {
    text: darkTheme.colors?.onSurface,
    background: darkTheme.colors?.background,
    tint: darkTheme.colors?.primary,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: darkTheme.colors?.primary,
  },
};
