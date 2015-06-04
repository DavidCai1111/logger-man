'use strict';
import should from 'should';
import loggerMan from '../index';

describe('test loggerMan', () => {

  it('default', (done) => {
    let _myLogger = loggerMan.get('test');
    let myLogger = loggerMan.get('test');
    myLogger.init();
    myLogger.on('CRITICAL', (msg) => {
      msg.should.containEql('test');
      done();
    });
    myLogger.debug('debug test');
    myLogger.info('info test');
    myLogger.warn('warn test');
    myLogger.error('error test');
    myLogger.critical('critical test');
  });

  it('error', (done) => {
    try {
      let errorLog = loggerMan.get('errorTest');
      errorLog.init({
        stream: process.stdout,
        level: 'INFO_ERROR',
        formatter: '${this.time} ${this.name}[${this.pid}] ${this.level}: ${this.message}\n'
      });
    } catch (err) {
      err.message.should.containEql('not exist');
    } finally {
      done();
    }
  });
});
