import { request } from '../api/request';
import { sendBeacon } from '../api/beacon';
import { ENDPOINTS } from './endpoints';

export class EventAPIService {
  constructor(productId) {
    this._productId = productId;
  }

  saveEvents = async (events, onUnload = false) => {
    if (!events || !events.length) return;
    const url = ENDPOINTS.SAVE_EVENTS.url;
    const method = ENDPOINTS.SAVE_EVENTS.method;
    const payload = {
      productId: this._productId,
      events
    }

    if (onUnload) {
      sendBeacon(url, payload);
    } else {
      await request({
        url,
        method,
        payload
      });
    }
  }
}

