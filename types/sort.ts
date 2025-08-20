import { IconSymbolName } from "@/components/ui/IconSymbol";
import { StyleProp, ViewStyle } from "react-native";

export type SortOrder = 'asc' | 'desc';

export interface SortFieldConfig<T> {
    key: keyof T;
    label: string;
    icon?: IconSymbolName;
    getValue?: (item: T) => unknown;
}

export interface SortOption<T> {
    field: keyof T;
    order: SortOrder;
    label: string;
    icon: IconSymbolName;
    getValue?: (item: T) => unknown;
}

export interface SortConfig<T> {
    fields: SortFieldConfig<T>[];
    defaultSort: {
        field: keyof T;
        order: SortOrder;
    };
}

export interface SortIndicatorProps<T> {
    style?: StyleProp<ViewStyle>;
    itemCount?: number;
    currentSort?: SortOption<T>;
    openSortModal?: () => void;
}

export interface SortModalProps<T> {
    visible: boolean;
    onDismiss: () => void;
    currentSort: SortOption<T>;
    onSortChange: (option: SortOption<T>) => void;
    config: SortConfig<T>;
    title?: string;
}