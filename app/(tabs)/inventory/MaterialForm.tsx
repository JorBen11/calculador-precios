import AppHeader from '@/components/AppHeader';
import { getMaterialSchema } from '@/schema/materialSchema';
import { useMaterialStore } from '@/store/materialStore';
import { Material, MaterialSchemaType } from '@/types/material';
import { onlyNumbers, sanitizeLocalizedDecimalInput } from '@/utils/number';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, HelperText, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';

const unitOptions = [
  {abrev: 'g', description: 'Gramos'},
  {abrev: 'kg', description: 'Kilogramos'},
  {abrev: 'ml', description: 'Mililitros'},
  {abrev: 'L', description: 'Litros'}, 
  {abrev: 'un', description: 'Unidades'}
];

const MaterialForm = () => {
  const { t } = useTranslation();
  const materialSchema = getMaterialSchema(t);
  const { selectedMaterial: initialData, clearSelectedMaterial, addMaterial, updateMaterial } = useMaterialStore();
  const submitLabel = initialData ? t('material.update') : t('material.save');
  const title = initialData ? t('material.update_title', { name: initialData.name }) : t('material.add_title');
  const theme = useTheme();
  const { goBack } = useNavigation();

  const [isFocusUnit, setIsFocusUnit] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<MaterialSchemaType>({
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? undefined,
      quantity: initialData?.quantity ?? 0,
      unit: initialData?.unit ?? 'g',
      purchasePrice: initialData?.purchasePrice ?? 0,
      purchaseQuantity: initialData?.purchaseQuantity ?? 0,
    },
    resolver: yupResolver(materialSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    return () => clearSelectedMaterial();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitHandler = useCallback((data: MaterialSchemaType) => {
    try{
      const datoGuardar: Material = {
        ...data,
        dateAdded: initialData?.id ? initialData.dateAdded : new Date().toISOString(),
        id: initialData?.id ?? uuid.v4().toString(),

      }
      if (initialData) {
        updateMaterial(datoGuardar);
      } else {
        addMaterial(datoGuardar);
      }
      Toast.show({ type: 'success', text1: t('material.saved_success'), position: 'bottom' });
      clearSelectedMaterial();
      goBack();
    } catch (error) {
      Toast.show({type: 'error', text1: t('material.save_error'), position: 'bottom'});
      console.error(error);
    }
  }, [initialData, addMaterial, updateMaterial, clearSelectedMaterial, goBack, t]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={title} />
      
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
      >
        <View style={styles.content}>
          <ScrollView style={styles.scroll} automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled">
            {/* Nombre */}
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputGroup}>
                  <TextInput
                    label={t('material.name')}
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    left={<TextInput.Icon icon="label-outline" />}
                    error={!!errors.name}
                    autoCapitalize='words'
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
                    label={`${t('material.description')} (${t('material.optional')})`}
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
                    label={t('material.quantity')}
                    value={value !== undefined ? String(value) : ''}
                    onChangeText={(v) => onChange(sanitizeLocalizedDecimalInput(v))}
                    mode="outlined"
                    keyboardType="decimal-pad"
                    left={<TextInput.Icon icon="scale" />}
                    error={!!errors.quantity}
                  />
                  {!!errors.quantity ? 
                    (<HelperText type="error"> {errors.quantity?.message} </HelperText>):
                    (<HelperText type="info">{t('material.quantity_help')}</HelperText>)
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
                      borderColor: errors.unit ? theme.colors.error : isFocusUnit ? theme.colors.primary : theme.colors.outline,
                      borderWidth: 1,
                      marginVertical: 5
                    }]}
                    data={unitOptions}
                    labelField="description"
                    valueField="abrev"
                    value={value}
                    onChange={item => onChange(item.abrev) }
                    onFocus={() => setIsFocusUnit(true)}
                    onBlur={() => setIsFocusUnit(false)}
                    renderLeftIcon={() => <TextInput.Icon icon="ruler-square" style={{paddingLeft: 15}}/>}
                    containerStyle={{
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.outline,
                      borderRadius: theme.roundness,
                    }}
                    itemTextStyle={{ color: theme.colors.onSecondaryContainer }}
                    itemContainerStyle={{borderRadius: theme.roundness}}
                    activeColor={theme.colors.secondaryContainer}
                    selectedTextStyle={{color: theme.colors.onPrimaryContainer, marginLeft: 45}}
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
                    label={t('material.purchase_price')}
                    value={value !== undefined ? String(value) : ''}
                    onChangeText={(v) => onChange(sanitizeLocalizedDecimalInput(v))}
                    mode="outlined"
                    keyboardType="decimal-pad"
                    left={<TextInput.Icon icon="currency-usd" />}
                    error={!!errors.purchasePrice}
                  />
                  {!!errors.purchasePrice ? 
                    (<HelperText type="error"> {errors.purchasePrice?.message} </HelperText>) : 
                    (<HelperText type="info">{t('material.purchase_price_help')}</HelperText>)
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
                    label={t('material.purchase_quantity')}
                    value={value !== undefined ? String(value) : ''}
                    onChangeText={(v) => onChange(onlyNumbers(v))}
                    mode="outlined"
                    keyboardType="decimal-pad"
                    left={<TextInput.Icon icon="package-variant" />}
                    error={!!errors.purchaseQuantity}
                  />
                  {!!errors.purchaseQuantity ? 
                    (<HelperText type="error"> {errors.purchaseQuantity?.message} </HelperText>) :
                    (<HelperText type="info">{t('material.purchase_quantity_help')}</HelperText>)
                  }
                  
                </View>
              )}
            />
          </ScrollView>
          {/* Botón enviar */}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmitHandler)}
            loading={isSubmitting}
            disabled={isSubmitting || !isValid}
            style={styles.submitButton}
            contentStyle={{ paddingVertical: 8 }}
            icon="content-save"
          >
            {submitLabel}
          </Button>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 6,
  },
  submitButton: {
    marginHorizontal: 16,
    alignContent: 'flex-end',
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