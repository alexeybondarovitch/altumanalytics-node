import { EventAPIService } from '@services/eventService';
import { isSafePositiveInteger } from '@utils/type';
import { InitializationError } from '@errors';
import { EventFactory } from '../eventFactory';
import { BUFFER_SIZE } from './const';

export class EventManager {

  constructor(productId, userId, { bufferSize=BUFFER_SIZE }) {
    this._buffer = [];
    if (!isSafePositiveInteger(bufferSize)) {
      throw new InitializationError('Wrong options were provided during initialization.');
    }
    this._bufferSize = bufferSize;
    this._productId = productId;
    this._userId = userId;
    this._eventService = new EventAPIService(productId);
    this._handleWindowUnload();
  }

  _handleWindowUnload = () => {
    const { addEventListener } = global;
    addEventListener && addEventListener('beforeunload',
      () => {
        this._eventService.saveEvents(this._buffer, true)
      },
      false);
  }

  add = ({ event, userId, groups, count, data, time }) => {
    const eventObj = EventFactory.createEvent({
      userId: userId || this._userId,
      event,
      groups,
      count,
      data,
      time
    });

    if (eventObj) {
      this._buffer.push(eventObj);
    }

    if (this._buffer.length === this._bufferSize) {
      this.flush();
    }
  }

  flush = () => {
    this._eventService.saveEvents(this._buffer);
    this._buffer = [];
  }
}
