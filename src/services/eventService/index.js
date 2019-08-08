import { request } from "../api/request";
import { ENDPOINTS } from "./endpoints";

export const logEvent = async (event, productId) => {
  if (!event) return;

  const payload = {
    productId,
    events: [event]
  };

  const res = await request({
    uri: ENDPOINTS.SAVE_EVENTS.url,
    method: ENDPOINTS.SAVE_EVENTS.method,
    payload
  });

  return res;
};
