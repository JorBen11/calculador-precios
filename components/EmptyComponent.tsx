import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { IconSymbol, IconSymbolName } from "./ui/IconSymbol";

type EmptyComponentProps = {
    icon?: IconSymbolName;
    label?: string;
}

const EmptyComponent = ({ icon = 'nosign', label = 'labels.empty' }: EmptyComponentProps) => {
    const theme = useTheme();
    const {t} = useTranslation();
    return (
        <View style={styles.container}>
            <IconSymbol
                name={icon}
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={{ backgroundColor: theme.colors.surfaceVariant, borderRadius: theme.roundness }}
            />
            <Text
                style={[styles.message, { color: theme.colors.onSurfaceDisabled }]}
            >
                {t(label, { defaultValue: 'No hay elementos' })}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row'
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 10,
    }
})

export default EmptyComponent;