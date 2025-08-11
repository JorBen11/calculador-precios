import { create } from "zustand";
import { persist } from "zustand/middleware";
import { zustandAsyncStorage } from "./zustandAsyncStorage";

export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'en' | 'es' | 'system';

interface SettingsState {
    theme: ThemeMode;
    language: Language;
    setTheme: (theme: ThemeMode) => void;
    setLanguage: (language: Language) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        set => ({
            theme: 'system',
            language: 'system',
            setTheme: theme => set({ theme }),
            setLanguage: language => set({ language }),
        }),
        {name : 'settings-storage', storage: zustandAsyncStorage } // Persistencia en AsyncStorage
    ),
);