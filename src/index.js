import { InitializationError } from "@errors";
import { logEvent } from "@services/eventService";
import { EventFactory } from "./event/eventFactory";

const config = {
  productId: null,
  userId: null
};

class AltumAnalytics {
  init = ({ productId, userId } = {}) => {
    // override productId if new was provided or use previous one
    config.productId = productId || config.productId;
    config.userId = userId || config.userId;

    if (!config.productId) {
      throw new InitializationError("ProductId must be provided.");
    }

    return this;
  };

  log = async (event, count = 1, options = {}) => {
    if (!config.productId) {
      throw new InitializationError("Altum is not initialized.");
    }

    const { groups, data, time, userId } = options;

    const eventObj = EventFactory.createEvent({
      userId: userId || config.userId,
      event,
      groups,
      count,
      data,
      time
    });

    if (eventObj) {
      await logEvent(eventObj, config.productId);
    }
  };
}

let Altum = new AltumAnalytics();

export { Altum };
