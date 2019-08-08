import Promise from 'es6-promise';
import fetch from 'cross-fetch';
import { Logger } from '@utils/logger';
import { ValidationError, ServerError } from '@errors';
import { ERROR_MESSAGES, HEADERS } from './const';

global.Promise = global.Promise || Promise;

const _fetch = async ({ url, method, payload, headers = HEADERS, mode = 'no-cors' }) => {
  return await fetch(url, {
    method,
    mode,
    headers,
    body: ['POST', 'PUT'].indexOf(method) >= 0 ? JSON.stringify(payload) : null
  }).then(res => {
    switch (res.status / 100) {
      case 4:
        throw new ValidationError(ERROR_MESSAGES.CLIENT_ERROR);
      case 5:
        throw new ServerError(ERROR_MESSAGES.SERVER_ERROR);
      default:
        return res.text();
    }
  }).catch(err => {
    Logger.error(err.message);
  });
}

export const request = async ({ url, method, payload, headers }) => {
  await _fetch({
    url,
    method,
    headers,
    payload
  });
}
