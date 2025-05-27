import i18n from '@/i18n';
import { MaterialSchemaType } from '@/types/material';
import { capitalize } from '@/utils/string';
import { TFunction } from 'i18next';
import * as Yup from 'yup';

const isFirstWord = i18n.language === 'en';

const capitalizaXIdioma = (t: TFunction, etiqueta: string) => {
  const retorno = t(etiqueta);
  if (!retorno) return '';
  return isFirstWord ? capitalize(retorno) : retorno.toLowerCase();
}

export const getMaterialSchema = (t: TFunction): Yup.ObjectSchema<MaterialSchemaType> => Yup.object().shape({
  name: Yup.string().required(t('errors.required', { name: t('material.name').toLowerCase() })),
  description: Yup.string().optional(),
  quantity: Yup.number().required().positive(t('errors.number_required', { name: capitalizaXIdioma(t, 'material.quantity') })),
  unit: Yup.string().required(t('errors.select_required', { name: t('material.unit').toLowerCase() })),
  purchasePrice: Yup.number().required().positive(t('errors.number_required', { name: capitalizaXIdioma(t, 'material.purchase_price') })),
  purchaseQuantity: Yup.number().required().positive(t('errors.number_required', { name: capitalizaXIdioma(t, 'material.purchase_quantity') })),
});
