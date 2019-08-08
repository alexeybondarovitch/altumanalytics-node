import { EventManager } from './event/eventManager';
import { InitializationError } from '@errors';

class AltumAnalytics {
  constructor() {
    this._initialized = false;
    this.eventManager = null;
    this.productId = null;
  }

  init = (config) => {
    this._initialized = true;
    const { productId, userId, options = {} } = config || {};

    // if Altum was already in use, flush the buffer
    if (this.eventManager) {
      this.eventManager.flush();
    }

    // override productId if new was provided or use previous one
    this.productId = productId || this.productId;

    if (!this.productId) {
      throw new InitializationError('ProductId must be provided.');
    }

    this.eventManager = new EventManager(this.productId, userId, options);

    return this;
  }

  log = (event, count = 1, options = {}) => {
    if (!this.eventManager) {
      throw new InitializationError('Altum is not initialized.');
    }

    this.eventManager.add({
      event,
      count,
      ...options
    });
  }

  flush = () => {
    if (!this.eventManager) {
      throw new InitializationError('Altum is not initialized.');
    }

    this.eventManager.flush();
  }
}

const _initFromWindow = () => {
  const _altum = global.Altum;

  if (!_altum) {
    return;
  }

  if (_altum._initialized) {
    //lib is already initialized
    return _altum;
  }

  const { config, delayed = [] } = _altum;
  const instance = new AltumAnalytics();

  instance.init(config);

  // we don't want to remove already existing link to Altum, so just copy all fields
  Object.keys(_altum).forEach(key => {
    delete _altum[key];
  });

  Object.assign(
    _altum,
    Object.create(Object.getPrototypeOf(instance)),
    instance
  );

  delayed.forEach(([args, timeStamp]) => {
    const [event, count, options = {}] = [...args];
    options.time = options.time || timeStamp;
    _altum.log(event, count, options);
  });

  return _altum;
}

const instance = global.Altum = _initFromWindow() || new AltumAnalytics();

export const Altum = instance;
