import { InitializationError } from '@errors';
import { logEvent } from "@services/eventService";

const config = {
  productId: null,
  userId: null
}

class AltumAnalytics {

  init = ({ productId, userId } = {}) => {

    // override productId if new was provided or use previous one
    config.productId = productId || config.productId;
    config.userId = userId || config.userId;

    if (!this.productId) {
      throw new InitializationError('ProductId must be provided.');
    }

    return this;
  }

  log = (event, count = 1, options = {}) => {
    if (!config.productId) {
      throw new InitializationError('Altum is not initialized.');
    }

    const { groups, data, time, userId } = options;

    const eventObj = EventFactory.createEvent({
      userId: userId || config._userId,
      event,
      groups,
      count,
      data,
      time
    });

    if (eventObj) {
      logEvent(eventObj, config.productId);
    }
  }
}

export const Altum = AltumAnalytics();
