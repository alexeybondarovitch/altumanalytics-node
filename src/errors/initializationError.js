import { ERRORS } from './const';

export class InitializationError extends Error {
  constructor(message) {
    super(message);

    this.name = ERRORS.INITIALIZATION;
    if ("captureStackTrace" in Error)
      Error.captureStackTrace(this, InitializationError);
    else
      this.stack = (new Error()).stack;
  }
}
