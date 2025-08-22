import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Detalles del Producto ID: {id}</Text>
    </View>
  );
}
