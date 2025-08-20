import AppHeader from '@/components/AppHeader';
import SortComponent from '@/components/SortComponent';
import SortIndicator from '@/components/SortIndicator';
import { useSorting } from '@/hooks/useSorting';
import { useMaterialStore } from '@/store/materialStore';
import { Material } from '@/types/material';
import { SortConfig } from '@/types/sort';
import { formatDate } from '@/utils/fecha';
import { Router, useRouter } from 'expo-router';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';
import { Card, FAB, IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const CardMaterial = ({ item, router, t }: { item: Material, router: Router, t: TFunction }) => {
  return (
    <Card style={styles.card}>
      <Card.Title 
        title={item.name}
        subtitle={`${item.quantity} ${item.unit} - $${item.purchasePrice}`} 
        right={() => (
          <Card.Actions>
            <IconButton 
              icon="pencil" 
              onPress={() => {
                useMaterialStore.setState({ selectedMaterial: item });
                router.navigate('/inventory/MaterialForm');
              }}
            />
            <IconButton icon="delete" onPress={() => useMaterialStore.getState().deleteMaterial(item.id)}/>
          </Card.Actions>
        )}
      />
      <Card.Content>
        <Text variant="labelSmall" style={{ marginTop: -5, color: '#64748B' }}>{`${t('labels.date_added')}: ${formatDate(item.dateAdded)}`}</Text>
      </Card.Content>
    </Card>
  )
}

const InventoryScreen = () => {

  const {materials} = useMaterialStore();
  const router = useRouter();
  const {t} = useTranslation();

  const sortConfig: SortConfig<Material> = {
    fields: [
      { key: 'name', label: t('material.name', { defaultValue: 'Nombre' }), icon: 'textformat.abc' },
      { key: 'quantity', label: t('material.quantity', { defaultValue: 'Cantidad' }), icon: 'number' },
      { key: 'dateAdded', label: t('labels.date_added', { defaultValue: 'Fecha' }), icon: 'calendar', getValue: (item) => new Date(item.dateAdded)  }
    ],
    defaultSort: { field: 'dateAdded', order: 'desc' }
  }

  const {openSortModal, closeSortModal, sortedData: sortedMaterials, currentSort, sortModalVisible, handleSortChange} = useSorting<Material>(materials, sortConfig);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={t('menu.inventory')} leftButton={<></>}/>
      <SortIndicator currentSort={currentSort} itemCount={materials.length} openSortModal={openSortModal}/>
      <FlatList 
        data={sortedMaterials}
        keyExtractor={(item) => item.id}
        renderItem={item => CardMaterial({item: item.item, router, t})}
      />
      <SortComponent
        config={sortConfig} title={t('sort.materials_title', { defaultValue: 'Ordenar Materiales' })}
        onDismiss={closeSortModal} visible={sortModalVisible} currentSort={currentSort} onSortChange={handleSortChange}
      />
      <FAB 
        style={styles.fab}
        onPress={() => router.push('/(tabs)/inventory/MaterialForm')}
        icon="plus"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    marginTop: 10,
    marginHorizontal: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 50
  }
});

export default InventoryScreen;
