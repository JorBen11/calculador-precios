import { Button, Text, TextInput, View } from 'react-native';

export default function AddIngredientScreen() {
  return (
    <View>
      <Text>Agregar Ingrediente</Text>
      <TextInput placeholder="Nombre del ingrediente" />
      <TextInput placeholder="Cantidad (ej. 500g)" keyboardType="numeric" />
      <TextInput placeholder="Costo total" keyboardType="numeric" />
      <Button title="Guardar" onPress={() => {}} />
    </View>
  );
}
