import { InitializationError } from "@errors";
import { logEvent } from "@services/eventService";
import { EventFactory } from "./event/eventFactory";

let _config = {
  userId: null,
  groupId: null,
  productId: null
};

class AltumAnalytics {
  init = config => {
    // override previous settings
    _config = { ..._config, ...config };

    const { productId, userId, groupId } = _config;

    let errArg = null;
    if (!productId) {
      errArg = "ProductId";
    }
    if (!userId) {
      errArg = "UserId";
    }
    if (!groupId) {
      errArg = "GroupId";
    }

    if (errArg) {
      throw new InitializationError(`${errArg} must be provided.`);
    }

    return this;
  };

  log = async (event, count = 1, options = {}) => {
    if (!_config.productId) {
      throw new InitializationError("Altum is not initialized.");
    }

    const { groups, data = {}, time } = options;
    data.userId = _config.userId;

    const eventObj = EventFactory.createEvent({
      userId: _config.groupId,
      event,
      groups,
      count,
      data,
      time
    });

    if (eventObj) {
      await logEvent(eventObj, _config.productId);
    }
  };
}

let Altum = new AltumAnalytics();

export { Altum };
