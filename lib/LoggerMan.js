'use strict';
import Logger from './Logger';

let loggerStore = new Map();

let LoggerMan = {
  get(loggerName) {
    let logger;
    if (logger = loggerStore.get(loggerName)) return logger;
    logger = new Logger(loggerName);
    loggerStore.set(loggerName, logger);
    return logger;
  }
}

export default LoggerMan;
