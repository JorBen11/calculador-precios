import AppHeader from '@/components/AppHeader';
import { useMaterialStore } from '@/store/materialStore';
import { Material } from '@/types/material';
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
                router.navigate('/(tabs)/inventory/MaterialForm');
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

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={t('menu.inventory')} leftButton={<IconButton icon="sort" onPress={() => router.back()}/>}/>
      <FlatList 
        data={materials}
        keyExtractor={(item) => item.id}
        renderItem={item => CardMaterial({item: item.item, router, t})}
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
