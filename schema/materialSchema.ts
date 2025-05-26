import { MaterialSchemaType } from '@/types/material';
import * as Yup from 'yup';

export const materialSchema: Yup.ObjectSchema<MaterialSchemaType> = Yup.object().shape({
  name: Yup.string().required('Nombre es obligatorio'),
  description: Yup.string().optional(),//.transform((value, originalValue) => (originalValue === undefined ? undefined : value)),
  quantity: Yup.number().required().positive(),
  unit: Yup.string().required('Debe seleccionar una unidad de medida'),
  purchasePrice: Yup.number().required().positive('Precio de compra debe ser mayor a 0'),
  purchaseQuantity: Yup.number().required().positive('Cantidad de compra debe ser mayor a 0'),
});
