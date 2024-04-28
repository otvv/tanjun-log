/*
*/

'use strict'

import flogger from './lib/flogger.mjs';

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
   flogger.print('test message', '+');
   flogger.print('test message', '+', 'success');
   flogger.print('test message', '+', 'fatal');
   flogger.print('test message', '+', 'error');
   flogger.print('test message', '+', 'warning');
   flogger.print('test message', '+', 'info');

  /*
   Get function/callback trace or function/callback callee information:
  */
  {
    goodCallback();
    /* If you are going to use one of these 2 functions, make sure to call them after your callback 
    or function that you want to trace. */
    flogger.trace();
    flogger.callee();
  }

  /*
   Get the type of anything:
  */
  {
    flogger.type(goodCallback); // should return `function`

    flogger.type(variable1); // should return `number`
    flogger.type(variable2); // should return `string`
  }

  /*
   Function/callback runner:
   
   You can safely execute a function that is not so safe here, flogger will handle the exceptions
   or if you want to log debug info while executing a function.
  */
  {
    // flogger will execute a good callback without debug logs
    flogger.execute(goodCallback);

    // flogger will execute a bad callback with debug logs and if it will thrown an exception or not

    // Uncomment the line below if you want to see how flogger handles bad callbacks.
    // flogger.execute(badCallback, true, true);
  }

  /*
   Throw examples:
  */
   flogger.throw('throw error message', '+', 'error', true); // this is a fake throw, the application won't stop
   flogger.throw('throw fatal error message', '+', 'fatal'); // the 'test run' will stop here.
})();
