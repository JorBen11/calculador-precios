import AppHeader from "@/components/AppHeader";
import { Language, ThemeMode, useSettingsStore } from "@/store/settingsStore";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Card, List, RadioButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {

    const {language, setLanguage, setTheme, theme: themePref} = useSettingsStore();
    const {t, i18n} = useTranslation();
    const theme = useTheme();

    const handleThemeChange = (value: string) => setTheme(value as ThemeMode);
    const handleLanguageChange = (value: string) => {
        setLanguage(value as Language);
        i18n.changeLanguage(value);
    };


    return (
        <SafeAreaView style={styles.container}>
            <AppHeader title={t('menu.settings')} leftButton={<></>}/>
            <List.Section>
                <List.Subheader style={styles.sectionTitle}>{t('settings.theme')}</List.Subheader>
                <Card mode="outlined" style={styles.cardContainer}>
                    <RadioButton.Group onValueChange={handleThemeChange} value={themePref}>
                        <List.Item title={t('settings.light')} left={() => <RadioButton value="light" />} />
                        <List.Item title={t('settings.dark')} left={() => <RadioButton value="dark" />} />
                    </RadioButton.Group>
                </Card>
            </List.Section>
            <List.Section>
                <List.Subheader style={styles.sectionTitle}>{t('settings.language')}</List.Subheader>
                <Card mode="outlined" style={styles.cardContainer}>
                    <RadioButton.Group onValueChange={handleLanguageChange} value={language}>
                    <List.Item
                        title={t('language.es')}
                        left={() => <RadioButton value="es" />}
                    />
                    <List.Item
                        title={t('language.en')}
                        left={() => <RadioButton value="en" />}
                    />
                    </RadioButton.Group>
                    <Text variant="bodySmall" style={[styles.helper, {color: theme.colors.secondary}]}>
                        {t('settings.language_note')}
                    </Text>
                </Card>
            </List.Section>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        marginHorizontal: 16,
        paddingLeft: 10,
    },
    sectionTitle: {
        fontWeight: 'bold',
    },
    item: {
        paddingVertical: 4,
    },
    divider: {
        marginLeft: 16,
    },
    helper: {
        marginHorizontal: 16,
        marginVertical: 8,
    }
});