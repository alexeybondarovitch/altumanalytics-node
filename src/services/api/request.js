import rpn from "request-promise-native";
import { Logger } from "@utils/logger";
import { ValidationError, ServerError } from "@errors";
import { ERROR_MESSAGES, HEADERS } from "./const";

export const request = async ({ uri, method, payload, headers = HEADERS }) => {
  try {
    const res = await rpn({
      method,
      uri,
      headers,
      body: ["POST", "PUT"].indexOf(method) >= 0 ? JSON.stringify(payload) : null
    });
    switch (res.statusCode / 100) {
      case 4:
        throw new ValidationError(ERROR_MESSAGES.CLIENT_ERROR);
      case 5:
        throw new ServerError(ERROR_MESSAGES.SERVER_ERROR);
      default:
        return res;
    }
  }
  catch (err) {
    Logger.error(err.message);
  }
};
