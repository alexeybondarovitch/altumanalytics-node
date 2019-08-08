import {
  isString,
  isObject,
  isSafePositiveInteger
} from '@utils/type';

export const parseUserId = testValue => {
  let userId = isSafePositiveInteger(testValue)
  ?
  testValue.toString() :
  testValue;

  return userId;
}

export const parseEventType = event => {
  const eventType = isObject(event) && event.type ||
    isString(event) && event;

  return eventType;
}

export const parseTimeStamp = testValue => {
  let timeStamp = null;

  if (isString(timeStamp)) {
    timeStamp = Date.parse(testValue);
  } else if (isSafePositiveInteger(testValue)) {
    timeStamp = testValue;
  }
  if (isNaN(timeStamp) || !timeStamp) {
    timeStamp = new Date().getTime();
  }

  return timeStamp;
}

export const parseCount = testValue => {
  let count = testValue;

  if (isString(count)) {
    count = Number(count);
  }

  return count;
}

export const parseData = testValue => {
  if (isString(testValue)) {
    try {
      const parsedData = JSON.parse(testValue);
      if (isObject(parsedData)) {
        return parsedData;
      }
    } catch {}
  }

  return testValue;
}
