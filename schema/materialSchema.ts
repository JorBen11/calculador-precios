import * as Yup from 'yup';

export const materialSchema = Yup.object().shape({
  name: Yup.string().required('Nombre es obligatorio'),
  description: Yup.string().required().nullable(),
  quantity: Yup.number().required().positive(),
  unit: Yup.string().required(),
  purchasePrice: Yup.number().required('Precio de compra debe ser mayor a 0').positive(),
  purchaseQuantity: Yup.number().required().positive(),
});

export type MaterialSchemaType = Yup.InferType<typeof materialSchema>;