import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function ProductsScreen() {
  return (
    <View>
      <Text>Lista de Productos</Text>
      <Button title="Crear Producto" onPress={() => router.push('/products/create')} />
    </View>
  );
}
