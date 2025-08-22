import { container, fab } from '@/assets/styles/globalStyle';
import AppHeader from '@/components/AppHeader';
import EmptyComponent from '@/components/EmptyComponent';
import SortComponent from '@/components/SortComponent';
import SortIndicator from '@/components/SortIndicator';
import { useSorting } from '@/hooks/useSorting';
import { useProductStore } from '@/store/producStore';
import { Product } from '@/types/product';
import { SortConfig } from '@/types/sort';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList, Text } from 'react-native';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductsScreen = () => {

	const { products } = useProductStore();
	const router = useRouter();
	const { t } = useTranslation();
	
	const sortConfig: SortConfig<Product> = {
		fields: [
			{ key: 'name', label: t('material.name', { defaultValue: 'Nombre' }), icon: 'textformat.abc' },
			{ key: 'quantity', label: t('material.quantity', { defaultValue: 'Cantidad' }), icon: 'number' },
			{ key: 'dateAdded', label: t('labels.date_added', { defaultValue: 'Fecha' }), icon: 'calendar', getValue: (item) => new Date(item.dateAdded)  }
		],
		defaultSort: { field: 'dateAdded', order: 'desc' }
	}

	const {openSortModal, closeSortModal, sortedData: sortedMaterials, currentSort, sortModalVisible, handleSortChange} = useSorting<Product>(products, sortConfig);
	
  return (
    <SafeAreaView style={container}>
			<AppHeader title={t('menu.products')} leftButton={<></>} rightButton={<></>}/>
      <SortIndicator currentSort={currentSort} itemCount={products.length} openSortModal={openSortModal}/>
      <FlatList
        data={sortedMaterials}
        keyExtractor={(item) => item.id}
        renderItem={item => <Text>{item.item.name}</Text>}
        ListEmptyComponent={<EmptyComponent label='product.no_products'/>}
      />
      <SortComponent
        config={sortConfig} title={t('sort.products_title', { defaultValue: 'Ordenar Productos' })}
        onDismiss={closeSortModal} visible={sortModalVisible} currentSort={currentSort} onSortChange={handleSortChange}
      />
      <FAB icon="plus" style={fab} onPress={() => router.push('/products/create')} />
    </SafeAreaView>
  );
}

export default ProductsScreen;