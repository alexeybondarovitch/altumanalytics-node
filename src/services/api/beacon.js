import { HEADERS } from './const';

export const sendBeacon = (url, payload) => {
  const navigator = global.navigator;
  const data = JSON.stringify(payload);
  if (!navigator || !navigator.sendBeacon || !navigator.sendBeacon(url, data)) {
    var t = new XMLHttpRequest();
    t.open('POST', url, false);
    Object.keys(HEADERS).map(key => t.setRequestHeader(key, HEADERS[key]));
    t.send(data);
  }
}
