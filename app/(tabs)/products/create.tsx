import { Button, Text, TextInput, View } from 'react-native';

export default function CreateProductScreen() {
  return (
    <View>
      <Text>Crear Producto</Text>
      <TextInput placeholder="Nombre del producto" />
      <TextInput placeholder="Imagen (opcional)" />
      <Button title="Añadir ingredientes" onPress={() => {}} />
    </View>
  );
}
