export const isString = value =>
                                typeof value === 'string' ||
                                value instanceof String;

export const isObject = value =>
                                typeof value === 'object' &&
                                value !== null;

export const isEmpty = value =>
                                value == null ||
                                value === '' ||
                                typeof value === 'undefined';

export const isNumber = value => !isNaN(value);

export const isSafePositiveInteger = value =>
                                        isNumber(value) &&
                                        Number.isSafeInteger(value) &&
                                        value > 0;

export const isTimeStamp = value => (new Date(value)).getTime() > 0;

export const isJson = value => {
  if (!isObject(value)){
    return false;
  }
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
}
