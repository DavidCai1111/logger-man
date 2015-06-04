'use strict';
import vm from 'vm';
import events from 'events'
import moment from 'moment';

const LEVELS = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
  CRITICAL: 50
};

const LOGGER_DEFAULT_INIT_OPTIONS = {
  stream: process.stdout,
  level: 'INFO',
  formatter: '${this.time} ${this.name}[${this.pid}] ${this.level}: ${this.message}\n'
};

class Logger {
  constructor(name) {
    [this.name, this.pid, this.createdAt] = [name, process.pid, moment()];
    this.time = this.createdAt.format();
    this.emitter = new events.EventEmitter();
    this.on = this.emitter.on;
    this.emit = this.emitter.emit;
  }

  init(options = LOGGER_DEFAULT_INIT_OPTIONS) {
    if (!(options.level in LEVELS)) throw new Error(`level: ${options.level} not exist`);
    [this.stream, this.level, this.formatter] = [options.stream, options.level.toUpperCase(), options.formatter];
    return this;
  }

  record(level, message) {
    if (LEVELS[level] < LEVELS[this.level]) return;
    this.message = message;
    let sandBox = {};
    Object.assign(sandBox, this);
    vm.createContext(sandBox);
    vm.runInContext('result = `' + this.formatter + '`', sandBox);
    this.stream.write(sandBox.result);
    this.emit(level, sandBox.result);
  }

  debug(message) {
    this.record('DEBUG', message);
  }

  info(message) {
    this.record('INFO', message);
  }

  warn(message) {
    this.record('WARN', message);
  }

  ERROR(message) {
    this.record('ERROR', message);
  }

  CRITICAL(message) {
    this.record('CRITICAL', message);
  }
}

export default Logger;
