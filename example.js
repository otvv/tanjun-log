/*
*/

'use strict'

import flog from './lib/flog.mjs';

/*
 This is a good callback example (will not throw an exception, all methods called inside it exists inside JavaScript):
*/
const goodCallback = (something1 = 12345678, something2 = 'AAAbbbCCCdddEEEfffGGG') => {
  something1.toString();
  something2.toLowerCase();
};

/*
 This is a bad callback example (will certainly cause an exception, the method called inside it does not exist inside JavaScript):
*/
const badCallback = (something1) => {
  something1.unknownFunction();
};

/*
 Some constant variables:
*/
const variable1 = 123456;
const variable2 = '123456';

(() => {
  /*
   Log messages example:
  */
  flog.print('test message', '+');
  flog.print('test message', '+', 'success');
  flog.print('test message', '+', 'fatal');
  flog.print('test message', '+', 'error');
  flog.print('test message', '+', 'warning');
  flog.print('test message', '+', 'info');

  /*
   Get function/callback trace or function/callback callee information:
  */
  {
    goodCallback();
    /* If you are going to use one of these 2 functions, make sure to call them after your callback 
    or function that you want to trace. */
    flog.trace();
    flog.callee();
  }

  /*
   Get the type of anything:
  */
  {
    flog.type(goodCallback); // should return `function`

    flog.type(variable1); // should return `number`
    flog.type(variable2); // should return `string`
  }

  /*
   Function/callback runner:
   
   You can safely execute a function that is not so safe here, flog will handle the exceptions
   or if you want to log debug info while executing a function.
  */
  {
    // flog will execute a good callback without debug logs
    flog.execute(goodCallback);

    // flog will execute a bad callback with debug logs and if it will thrown an exception or not

    // Uncomment the line below if you want to see how flog handles bad callbacks.
    // flog.execute(badCallback, true, true);
  }

  /*
   Throw examples:
  */
  flog.throw('throw error message', '+', 'error', true); // this is a fake throw, the application won't stop
  flog.throw('throw fatal error message', '+', 'fatal'); // the 'test run' will stop here.
})();
