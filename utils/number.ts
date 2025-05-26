import * as Localization from 'expo-localization';

export const getDecimalSeparator = (): string => {
  const numberWithDecimal = 1.1;
  const formatter = new Intl.NumberFormat(Localization.getLocales()[0].languageCode ?? 'en');
  const parts = formatter.formatToParts(numberWithDecimal);
  const decimal = parts.find(p => p.type === 'decimal');
  return decimal?.value || '.';
};


/**
 * Convierte el número a un float válido usando el separador decimal correcto.
 */
export const parseLocalizedNumber = (value: string): number => {
  const separator = getDecimalSeparator();
  const normalized = value.replace(separator, '.');
  const num = parseFloat(normalized);
  return isNaN(num) ? 0 : num;
};

/**
 * Limpia y valida el input del usuario permitiendo solo números y un separador decimal, con hasta dos decimales.
 */
export const sanitizeLocalizedDecimalInput = (value: string): string => {
  if (!value) return '0';

  const separator = getDecimalSeparator(); // Ejemplo: '.' o ','

  // Permitir solo números y separador decimal
  const allowedRegex = new RegExp(`[^0-9${separator}]`, 'g');
  let sanitized = value.replace(allowedRegex, '');

  // Dividir por separador
  const parts = sanitized.split(separator);

  // Manejar más de un separador: dejar solo el primero y concatenar el resto sin separador
  if (parts.length > 2) {
    sanitized = parts[0] + separator + parts.slice(1).join('');
  }

  // Separar la parte entera y decimal otra vez con la cadena ya saneada
  const finalParts = sanitized.split(separator);

  // Eliminar ceros a la izquierda en la parte entera (pero dejar un 0 si queda vacío)
  let integerPart = finalParts[0].replace(/^0+(?=\d)/, '');
  if (integerPart === '') integerPart = '0';

  // Parte decimal limitada a 2 dígitos (si existe)
  let decimalPart = finalParts[1] ? finalParts[1].slice(0, 2) : '';

  // Si el valor termina con el separador, permitir que el usuario lo vea para seguir escribiendo
  const endsWithSeparator = value.endsWith(separator);

  if (endsWithSeparator) {
    return integerPart + separator;
  }

  return decimalPart ? integerPart + separator + decimalPart : integerPart;
};



export const onlyNumbers = (value: string): string => {
  if(!value) return '0';
  const allowedRegex = /[^0-9]/g;
  let sanitized = value.replace(allowedRegex, '');

  // Eliminar ceros a la izquierda, pero dejar al menos un cero si todo era cero
  sanitized = sanitized.replace(/^0+(?=\d)/, '');
  return sanitized === '' ? '0' : sanitized;
};
