import { useMaterialStore } from '@/store/materialStore';
import { Material } from '@/types/material';
import { formatDate } from '@/utils/fecha';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';
import { Card, FAB, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const CardMaterial = ({ item }: { item: Material }) => {
  return (
    <Card style={styles.card}>
      <Card.Title 
        title={item.name}
        subtitle={`${item.quantity} ${item.unit} - $${item.purchasePrice} - ${formatDate(item.dateAdded)}`} 
        right={() => (
          <Card.Actions>
            <IconButton icon="pencil" onPress={() => console.log('Pressed')}/>
            <IconButton icon="delete" onPress={() => console.log('Pressed')}/>
          </Card.Actions>
        )}
      />
    </Card>
  )
}
const InventoryScreen = () => {

  const {materials} = useMaterialStore();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={materials}
        keyExtractor={(item) => item.id}
        renderItem={CardMaterial}
      />
      <FAB 
        style={styles.fab}
        onPress={() => router.push('/inventory/MaterialForm')}
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
