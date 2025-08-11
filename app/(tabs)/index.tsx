
import { useMaterialStore } from '@/store/materialStore';
import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const { materials } = useMaterialStore();

  // TODO: Integrar store de productos y stock real
  const products: {stock: number}[] = [];
  const totalStock = products.reduce((acc, item) => acc + (item.stock || 0), 0);


  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Resumen" />
        <Card.Content>
          <Text>Materiales: {materials.length}</Text>
          <Text>Productos: {products.length}</Text>
          <Text>Stock total: {totalStock}</Text> 
        </Card.Content>
      </Card>

      <Button mode='contained' style={styles.button} onPress={() => {}}>
        + Agregar material
      </Button>

      <Button mode='contained' style={styles.button} onPress={() => {}}>
        + Agregar producto
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 16,
  },
})
