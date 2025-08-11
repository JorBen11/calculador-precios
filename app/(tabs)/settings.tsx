import AppHeader from "@/components/AppHeader";
import { Language, ThemeMode, useSettingsStore } from "@/store/settingsStore";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Divider, List, RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {

    const {language, setLanguage, setTheme, theme} = useSettingsStore();
    const {t, i18n} = useTranslation();

    const handleThemeChange = (value: string) => setTheme(value as ThemeMode);
    const handleLanguageChange = (value: string) => {
        setLanguage(value as Language);
        i18n.changeLanguage(value);
    };


    return (
        <SafeAreaView style={styles.container}>
            <AppHeader title={t('menu.settings')} leftButton={<></>}/>
            <List.Section>
                <List.Subheader>{t('settings.theme')}</List.Subheader>
                <RadioButton.Group onValueChange={handleThemeChange} value={theme}>
                    <List.Item title={t('settings.light')} right={() => <RadioButton value="light" />} />
                    <List.Item title={t('settings.dark')} right={() => <RadioButton value="dark" />} />
                    <List.Item title={t('settings.system')} right={() => <RadioButton value="system" />} />
                </RadioButton.Group>
                <Divider style={{marginVertical: 10}}/>
            </List.Section>
            <List.Section>
                <List.Subheader>{t('settings.language')}</List.Subheader>
                <RadioButton.Group onValueChange={handleLanguageChange} value={language}>
                <List.Item
                    title={t('language.es')}
                    right={() => <RadioButton value="es" />}
                />
                <List.Item
                    title={t('language.en')}
                    right={() => <RadioButton value="en" />}
                />
                </RadioButton.Group>
            </List.Section>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});