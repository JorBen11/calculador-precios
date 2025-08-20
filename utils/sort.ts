import { IconSymbolName } from "@/components/ui/IconSymbol";
import { SortConfig, SortOption, SortOrder } from "@/types/sort";
import { UseTranslationResponse } from "react-i18next";

export function generateSortOptions<T>(config: SortConfig<T>, {t}: UseTranslationResponse<"translation", undefined>): SortOption<T>[]{
  
    return config.fields.map(field => ({
        field: field.key,
        order: 'asc',
        label: field.label,
        icon: field.icon || getSortIcon(field.key as string, 'asc'),
        getValue: field.getValue
    }));
}

export function getSortIcon(fieldName: string, order: SortOrder): IconSymbolName {

    const fieldType = getFieldType(fieldName);
    
    switch (fieldType) {
        case 'alphabetical':
            return 'textformat.abc';
        case 'numerical':
            return 'number';
        case 'date':
            return 'calendar';
        case 'currency':
            return 'dollarsign.circle';
        default:
            return order === 'asc' ? 'arrow.up' : 'arrow.down';
    }

}

export function getFieldType(fieldName: string): 'alphabetical' | 'numerical' | 'date' | 'currency' | 'default' {
    const lowerField = fieldName.toLowerCase();

    if (lowerField.includes('name') || lowerField.includes('title') || lowerField.includes('description')) {
        return 'alphabetical';
    } else if (lowerField.includes('price') || lowerField.includes('cost') || lowerField.includes('amount') || lowerField.includes('value')) {
        return 'currency';
    } else if (lowerField.includes('date') || lowerField.includes('time') || lowerField.includes('created') || lowerField.includes('updated')) {
        return 'date';
    } else if (lowerField.includes('quantity') || lowerField.includes('count') || lowerField.includes('number')) {
        return 'numerical';
    } else {
        return 'default';
    }
}