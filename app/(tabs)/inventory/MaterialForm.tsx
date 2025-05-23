import AppHeader from '@/components/AppHeader';
import { materialSchema, MaterialSchemaType } from '@/schema/materialSchema';
import { MaterialFormProps } from '@/types/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, HelperText, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const unitOptions = [
  {abrev: 'g', description: 'Gramos'},
  {abrev: 'kg', description: 'Kilogramos'},
  {abrev: 'ml', description: 'Mililitros'},
  {abrev: 'L', description: 'Litros'}, 
  {abrev: 'un', description: 'Unidades'}
];

const MaterialForm = ({ initialData, onSubmit, submitLabel = 'Guardar' }: MaterialFormProps) => {

  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MaterialSchemaType>({
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      quantity: initialData?.quantity ?? 0,
      unit: initialData?.unit ?? 'g',
      purchasePrice: initialData?.purchasePrice ?? 0,
      purchaseQuantity: initialData?.purchaseQuantity ?? 0,
    },
    resolver: yupResolver(materialSchema),
    mode: 'onChange',
  });

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title='Agrega un material' />
      
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scroll} automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled">
          {/* Nombre */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputGroup}>
                <TextInput
                  label="Nombre"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
                  left={<TextInput.Icon icon="label-outline" />}
                />
                {!!errors.name && 
                  <HelperText type="error"> {errors.name?.message} </HelperText>
                }
              </View>
            )}
          />

          {/* Descripción */}
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputGroup}>
                <TextInput
                  label="Descripción (opcional)"
                  value={value ?? ''}
                  onChangeText={onChange}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  left={<TextInput.Icon icon="text" />}
                />
              </View>
            )}
          />

          {/* Cantidad */}
          <Controller
            control={control}
            name="quantity"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputGroup}>
                <TextInput
                  label="Cantidad"
                  value={String(value)}
                  onChangeText={(v) => onChange(Number(v))}
                  mode="outlined"
                  keyboardType="decimal-pad"
                  left={<TextInput.Icon icon="scale" />}
                />
                {!!errors.quantity && 
                <HelperText type="error">
                  {errors.quantity?.message}
                </HelperText>
                }
              </View>
            )}
          />

          {/* Unidad (dropdown) */}
          <Controller
            control={control}
            name="unit"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputGroup}>
                <Dropdown
                  style={[styles.dropdown, {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.outline,
                    borderWidth: 1,
                    marginVertical: 5
                  }]}
                  data={unitOptions}
                  labelField="description"
                  valueField="abrev"
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={item => onChange(item.abrev)}
                  renderLeftIcon={() => <TextInput.Icon icon="ruler-square"/>}
                  containerStyle={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.outline,
                    borderRadius: theme.roundness,
                  }}
                  itemTextStyle={{ color: theme.colors.onSecondaryContainer }}
                  itemContainerStyle={{borderRadius: theme.roundness}}
                  activeColor={theme.colors.secondaryContainer}
                />
              </View>
            )}
          />

          {/* Precio de compra */}
          <Controller
            control={control}
            name="purchasePrice"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputGroup}>
                <TextInput
                  label="Precio de compra"
                  value={String(value)}
                  onChangeText={(v) => onChange(Number(v))}
                  mode="outlined"
                  keyboardType="decimal-pad"
                  left={<TextInput.Icon icon="currency-usd" />}
                />
                {!!errors.purchasePrice && 
                <HelperText type="error">
                  {errors.purchasePrice?.message}
                </HelperText>
                }
              </View>
            )}
          />

          {/* Cantidad comprada */}
          <Controller
            control={control}
            name="purchaseQuantity"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputGroup}>
                <TextInput
                  label="Cantidad por compra"
                  value={String(value)}
                  onChangeText={(v) => onChange(Number(v))}
                  mode="outlined"
                  keyboardType="decimal-pad"
                  left={<TextInput.Icon icon="package-variant" />}
                />
                {!!errors.purchaseQuantity &&<HelperText type="error"> {errors.purchaseQuantity?.message} </HelperText>}
              </View>
            )}
          />
        </ScrollView>
        {/* Botón enviar */}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.submitButton}
          contentStyle={{ paddingVertical: 8 }}
          icon="content-save"
        >
          {submitLabel}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scroll: {
    flex: 2,
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 6,
  },
  submitButton: {
    marginHorizontal: 16,
    alignContent: 'flex-end',
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default MaterialForm;