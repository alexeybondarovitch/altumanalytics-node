import { ERRORS } from './const';

export class ServerError extends Error {
  constructor(message) {
    super(message);

    this.name = ERRORS.SERVER;
    if ("captureStackTrace" in Error)
      Error.captureStackTrace(this, ServerError);
    else
      this.stack = (new Error()).stack;
  }
}
