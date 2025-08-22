import { SortModalProps } from "@/types/sort";
import { generateSortOptions } from "@/utils/sort";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Divider, List, Modal, Portal, Text, useTheme } from "react-native-paper";
import { IconSymbol } from "./ui/IconSymbol";

function SortComponent<T>({
    visible,
    onDismiss,
    currentSort,
    onSortChange,
    config,
    title
}: SortModalProps<T>) {

    const { t } = useTranslation();
    const theme = useTheme();
    const sortOptions = generateSortOptions(config, useTranslation());

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[styles.modalContent, { backgroundColor: theme.colors.surface }]}
                dismissable
            >
                <Text variant="titleLarge" style={styles.modalTitle}>{title ?? t('sort.title', { defaultValue: 'Ordenar por' })}</Text>
                <Divider style={styles.divider}/>
                {sortOptions.map((option, index) => {
                    const selected = option.field === currentSort.field;
                    return (
                        <List.Item
                            key={`${String(option.field)}_${option.order}_${index}`}
                            title={option.label}
                            titleStyle={selected ? { color: theme.colors.primary } : {}}
                            left={() => <IconSymbol name={option.icon} size={20} color={theme.colors.primary}/> }
                            right={() => selected ? <IconSymbol name={currentSort.order === 'asc' ? 'arrow.up' : 'arrow.down'} size={24} color={theme.colors.primary}/> : null}
                            onPress={() => onSortChange(option)}
                            style={[styles.sortItem, selected && {backgroundColor: theme.colors.primaryContainer, ...styles.selectedSortItem}]}
                        />
                    )
                })}
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        margin: 20,
        borderRadius: 12,
        maxHeight: '80%',
    },
    modalTitle: {
        padding: 10,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18,
    },
    divider: {
        marginHorizontal: 20
    },
    sortItem: {
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    selectedSortItem: {
        borderRadius: 24,
    }
});

export default SortComponent;