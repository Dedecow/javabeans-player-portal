export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidApiUrl = (url: string): boolean => {
  if (!isValidUrl(url)) return false;
  const parsed = new URL(url);
  return parsed.protocol === 'http:' || parsed.protocol === 'https:';
};

export const isNonEmptyArray = <T>(arr: T[]): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

export const isNonEmptyString = (str: string): boolean => {
  return typeof str === 'string' && str.trim().length > 0;
};

export const validateIngredients = (ingredients: string[]): boolean => {
  return isNonEmptyArray(ingredients) && ingredients.every(isNonEmptyString);
};
