# logger-man
A lightweight&amp;useful stream based logging module for node.js

[![Build Status](https://travis-ci.org/DavidCai1993/logger-man.svg?branch=master)](https://travis-ci.org/DavidCai1993/logger-man)
[![Coverage Status](https://coveralls.io/repos/DavidCai1993/logger-man/badge.svg?branch=master)](https://coveralls.io/r/DavidCai1993/logger-man?branch=master)

## installation
Via NPM:
```SHELL
npm install logger-man --save
```

## Example
```js
'use strict';
let loggerMan = require('logger-man');

let myLogger = loggerMan.get('myLogger');
myLogger.init({
    stream: process.stdout,
    level: 'INFO',
    formatter: '${this.time} ${this.name}[${this.pid}] ${this.level}: ${this.message}\n'
  });
myLogger.on('ERROR', (msg) => console.log(`get ERROR event! msg: ${msg}`));

myLogger.info('myInfo'); // 2015/June/4 pm 3:42:37 myLogger[5046] INFO: myInfo
myLogger.error('myError'); // 2015/June/4 pm 3:42:37 myLogger[5046] ERROR: myError

// => get ERROR event! msg: 2015/June/4 pm 3:42:37 myLogger[5046] ERROR: myError
```

## Available Levels
```SHELL
DEBUG
INFO
WARN
ERROR
CRITICAL
```
If a message's level is before the `level` property of the object you assigned in `init()` method, `logger-man` will ignore it.

## Formatter
`logger-man`'s formatter use the ES6 `'template string'` style, you can put all available attributes in `${}`.

The default formatter is:
```js
'${this.time} ${this.name}[${this.pid}] ${this.level}: ${this.message}\n'
```

All available attributes provided by `logger-man`:
```js
this.name //logger name
this.level //record level
this.formatter //formatter string
this.pid //process id
this.createdAt //linux time, when you created this logger
this.time //readable time, has the struct like : `YYYY/MMMM/D a h:mm:ss`
this.message //mesaage
```

## API

#### loggerMan.get(name)
Get a logger, all loggers are saved in a `Map` inside of `logger-man`, so if you try to get a logger with the same name for many times,
`logger-man` will return the same instance every time.


#### loggerMan.init(optionObj)
__optionObj:__
* stream: target stream you want to write your record to
* level: logging level
* formatter: formatter

Initialize your logger.

#### loggerMan.debug(msg)/info(msg)/error(msg)/...
Logging your message with the specialized level.

#### loggerMan.on(level, handler)
__options__
* level: record level ('INFO','ERROR'...)
* handler: callback

Add your own listener on specialized `level` event.



