import { SortConfig, SortOption } from "@/types/sort";
import { getSortIcon } from "@/utils/sort";
import { useMemo, useState } from "react";

export function useSorting<T>(data: T[], config: SortConfig<T>){
    const [sortModalVisible, setSortModalVisible] = useState(false);

    const defaultOption: SortOption<T> = useMemo(() => {
        const defaultField = config.defaultSort?.field || config.fields[0].key;
        const defaultOrder = config.defaultSort?.order || 'asc';
        const fieldConfig = config.fields.find(field => field.key === defaultField);

        return {
            field: defaultField,
            order: defaultOrder,
            label: fieldConfig?.label || String(defaultField),
            icon: getSortIcon(String(defaultField), defaultOrder),
            getValue: fieldConfig?.getValue
        }
    }, [config]);

    const [currentSort, setCurrentSort] = useState<SortOption<T>>(defaultOption);

    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => {
            let valueA: unknown;
            let valueB: unknown;

            if(currentSort.getValue){
                valueA = currentSort.getValue(a);
                valueB = currentSort.getValue(b);
            } else {
                valueA = a[currentSort.field];
                valueB = b[currentSort.field];
            }

            if(!valueA && !valueB) return 0;
            if(!valueA) return 1;
            if(!valueB) return -1;

            let comparison = 0;

            if(valueA instanceof Date && valueB instanceof Date){
                comparison = valueA.getTime() - valueB.getTime()
            }else if(typeof valueA === 'string' && typeof valueB === 'string'){
                comparison = valueA.localeCompare(valueB);
            } else if(typeof valueA === 'number' && typeof valueB === 'number'){
                comparison = valueA - valueB;
            } else {
                comparison = String(valueA).localeCompare(String(valueB));
            }

            return currentSort.order === 'asc' ? comparison : -comparison;
        })
    }, [data, currentSort]);

    const handleSortChange = (option: SortOption<T>) => {
        setCurrentSort(prev => {
            if(prev.field === option.field){
                const newOrder = prev.order === 'asc' ? 'desc' : 'asc';
                return {
                    ...prev,
                    order: newOrder,
                    icon: getSortIcon(String(option.field), newOrder),
                }
            }else{
                return {
                    ...option,
                    icon: getSortIcon(String(option.field), option.order),
                }
            }
        });
        setSortModalVisible(false);
    }

    const openSortModal = () => setSortModalVisible(true);
    const closeSortModal = () => setSortModalVisible(false);

    return {
        sortedData,
        currentSort,
        sortModalVisible,
        openSortModal,
        closeSortModal,
        handleSortChange,
    };
}