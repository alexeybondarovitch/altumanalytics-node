import { isObject, isString, isNumber, isEmpty, isJson } from '../type';
import { ValidationError } from '@errors';
import { DEFAULT_ERROR_MESSAGES } from './const';

class Schema {
  constructor() {
    this._shape = {};
    this.rules = [];
  }

  shape = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && obj[key] instanceof Schema) {
        this._shape[key] = obj[key];
      }
    });

    return this;
  }

  required = (message = DEFAULT_ERROR_MESSAGES.REQUIRED) => {
    this.rules.push({
      invoke: value => !!value,
      message
    });

    return this;
  }

  string = (message = DEFAULT_ERROR_MESSAGES.TYPE_STRING) => {
    this.rules.push({
      invoke: value => isString(value) || isEmpty(value),
      message
    });

    return this;
  }

  timeStamp = (message) => {
    this.rules.push({
      invoke: value => isTimeStamp(value) || isEmpty(value),
      message
    });
  }

  number = (message = DEFAULT_ERROR_MESSAGES.TYPE_NUMBER) => {
    this.rules.push({
      invoke: value => isNumber(value) || isEmpty(value),
      message
    });

    return this;
  }

  rule = (func, message = DEFAULT_ERROR_MESSAGES.COMMON) => {
    this.rules.push({
      invoke: func,
      message
    });

    return this;
  }

  object = (message = DEFAULT_ERROR_MESSAGES.TYPE_OBJECT) => {
    this.rules.push({
      invoke: value => isEmpty(value) || isObject(value),
      message
    });

    return this;
  }

  json = (message = DEFAULT_ERROR_MESSAGES.INVALID_JSON) => {
    this.rules.push({
      invoke: value => isEmpty(value) || isJson(value),
      message
    });

    return this;
  }

  array = (message = DEFAULT_ERROR_MESSAGES.TYPE_ARRAY) => {
    this.rules.push({
      invoke: value => isEmpty(value) || Array.isArray(value),
      message
    });

    return this;
  }

  validate = (value) => {
    if (isObject(value)) {
      Object.keys(value).forEach(key => {
        const schema = this._shape[key];
        schema && schema.validate(value[key]);
      });
      return;
    }

    this.rules.forEach(rule => {
      if (!rule.invoke(value)) {
        throw new ValidationError(rule.message);
      }
    })
  }
};

export const describe = () => (new Schema());
