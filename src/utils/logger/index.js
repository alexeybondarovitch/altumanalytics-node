import { ERROR_LEVEL } from './const';

const warn = (message) => {
  console.warn(message);
}

const info = (message) => {
  console.log(message);
}

const error = (message) => {
  console.error(message);
}

export class Logger {
  static log = (message, level = ERROR_LEVEL.INFO) => {
    switch (level) {
      case ERROR_LEVEL.ERROR:
        error(message);
        break;
      case ERROR_LEVEL.WARN:
        warn(message);
        break;
      case ERROR_LEVEL.INFO:
        info(message);
        break;
      default:
        info(message);
    }
  }

  static warn = (message) => {
    Logger.log(message, ERROR_LEVEL.WARN);
  }

  static info = (message) => {
    Logger.log(message, ERROR_LEVEL.INFO);
  }

  static error = (message) => {
    Logger.log(message, ERROR_LEVEL.ERROR);
  }
}
