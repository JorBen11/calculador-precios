import { formatDate } from '@/utils/fecha';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, FAB, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Material {
  id: string;
  name: string;
  quantity: number;
  unidadMedida: string;
  price: number;
  fechaCompra: Date;
}

const CardMaterial = ({ item }: { item: Material }) => {
  return (
    <Card style={styles.card}>
      <Card.Title 
        title={item.name}
        subtitle={`${item.quantity} ${item.unidadMedida} - $${item.price} - ${formatDate(item.fechaCompra)}`} 
        right={() => (
          <Card.Actions>
            <IconButton icon="pencil"/>
            <IconButton icon="delete" />
          </Card.Actions>
        )}
      />
    </Card>
  )
}
const InventoryScreen = () => {

  const [data, setData] = useState<Material[]>([
    { id: '1', name: 'Material 1', quantity: 10, unidadMedida: 'kg', price: 100.21, fechaCompra: new Date() },
    { id: '2', name: 'Material 2', quantity: 20, unidadMedida: 'kg', price: 200, fechaCompra: new Date() },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={CardMaterial}
      />
      <FAB 
        style={styles.fab}
        onPress={() => console.log('Pressed')}
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
