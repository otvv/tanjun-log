/*
*/

'use strict'

import flog from "./src/flog.mjs";

const goodCallback = (something1 = 12345678, something2 = 'AAAbbbCCCdddEEEfffGGG') => {
  something1.toString();
  something2.toLowerCase();
};
const badCallback = (something1) => {
  something1.unknownFunction();
};
const testVariable = 123456;

(() => {
  // logging examples
  flog.log('test message', '+');
  flog.log('test message', '+', 'success');
  flog.log('test message', '+', 'fatal');
  flog.log('test message', '+', 'error');
  flog.log('test message', '+', 'warning');
  flog.log('test message', '+', 'info');
  flog.log('test message', '+', 'normal');
  // trace and callee info
  {
    // make sure to call these 2 functions after your callback is called
    flog.trace();
    flog.callee();
  }
  // get the typeof something
  {
    flog.type(goodCallback);
    flog.type(badCallback);
    flog.type(testVariable);
  }
  // tcf wrapper
  {
    // good callback without debug logs
    flog.run(goodCallback);

    // bad callback with debug logs
    flog.run(badCallback, true);

    // bad callback with debug logs and if its throwable
    flog.run(badCallback, true, true);
  }
})();