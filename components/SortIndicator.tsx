import { SortIndicatorProps } from "@/types/sort";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";
import { IconSymbol, IconSymbolName } from "./ui/IconSymbol";

function SortIndicator<T>({itemCount, style, currentSort, openSortModal}: SortIndicatorProps<T>){
    const {t} = useTranslation();
    const theme = useTheme();
    return (
        <View style={[styles.sortIndicator, style]}>
            <Chip
                icon={() => <IconSymbol name={currentSort?.icon as IconSymbolName} size={16} color={theme.colors.primary} />}
                onPress={openSortModal}
            >
                {`${currentSort?.label} ${t(`sort.${currentSort?.order}`, { defaultValue: currentSort?.order === 'asc' ? '↑' : '↓' })}`}
            </Chip>
            {itemCount !== undefined && (
                <Text variant="labelSmall">
                    {t('labels.items', { count: itemCount })}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
  sortIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
});

export default SortIndicator;