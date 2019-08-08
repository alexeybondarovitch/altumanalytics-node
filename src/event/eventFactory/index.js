import { Logger } from '@utils/logger';
import { ERRORS } from '@errors/const';
import { ERROR_MESSAGES } from './const';
import {
  parseUserId,
  parseCount,
  parseEventType,
  parseTimeStamp,
  parseData,
} from './parsers';

import { describe } from '@utils/validation';

const validationSchema = describe().shape({
  id: describe().string(ERROR_MESSAGES.USER_ID_PARSE_ERROR).required(ERROR_MESSAGES.USER_ID_REQUIRED),
  event: describe().string(ERROR_MESSAGES.EVENT_TYPE_PARSE_ERROR).required(ERROR_MESSAGES.EVENT_TYPE_REQUIRED),
  count: describe().number(ERROR_MESSAGES.COUNT_PARSE_ERROR).rule(x => x > 0, ERROR_MESSAGES.NEGATIVE_COUNT),
  time: describe().timeStamp(ERROR_MESSAGES.TIME_PARSE_ERROR),
  data: describe().json(ERROR_MESSAGES.DATA_PARSE_ERROR),
  groups: describe().array(ERROR_MESSAGES.GROUPS_PARSE_ERROR),
});


const validateEvent = (eventObj) => {
  validationSchema.validate(eventObj);
}

const getErrorMessage = (ex, eventObj) => {
  const eventString = `Event: ${JSON.stringify(eventObj)}.`;
  const errorMessage = `${ERROR_MESSAGES.EVENT_IGNORED}${ex.message} ${eventString}`;
  return errorMessage;
}

export class EventFactory {
  static createEvent({ userId, event, groups, count, data, time }) {
    const eventObj = {
      id: parseUserId(userId),
      event: parseEventType(event),
      count: parseCount(count),
      time: parseTimeStamp(time),
      data: parseData(data),
      groups,
    };

    try {
      validateEvent(eventObj);
      return eventObj;
    } catch (e) {
      switch (e.name) {
        case ERRORS.VALIDATION:
          Logger.error(getErrorMessage(e, eventObj));
          break;
        default:
          throw e;
      }

      return null;
    }
  }
}
