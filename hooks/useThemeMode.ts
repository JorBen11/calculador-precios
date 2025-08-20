import { useSettingsStore } from "@/store/settingsStore";
import { useColorScheme } from "react-native";
import { useTheme } from "react-native-paper";

export function useThemeMode() {
    const systemScheme = useColorScheme(); // 'light' | 'dark' | null
    const {theme: themeSettings} = useSettingsStore();
    const theme = useTheme();

    const resolvedTheme =
    themeSettings === 'system'
      ? systemScheme === 'dark'
        ? 'dark'
        : 'light'
      : themeSettings;
  
    const isDark = resolvedTheme === 'dark';

    return {
        themeSettings,   // preferencia (light | dark | system)
        resolvedTheme,   // valor final (light | dark)
        isDark,
        theme,
    };
}