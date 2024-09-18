/*
*/

'use strict'

import tanjun from './lib/tanjun.mjs';

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
   tanjun.print('test message', '+');
   tanjun.print('test message', '+', 'success');
   tanjun.print('test message', '+', 'fatal');
   tanjun.print('test message', '+', 'error');
   tanjun.print('test message', '+', 'warning');
   tanjun.print('test message', '+', 'info');

  /*
   Get function/callback trace or function/callback callee information:
  */
  {
    goodCallback();
    /* If you are going to use one of these 2 functions, make sure to call them after your callback 
    or function that you want to trace. */
    tanjun.trace();
    tanjun.callee();
  }

  /*
   Get the type of anything:
  */
  {
    tanjun.type(goodCallback); // should return `function`

    tanjun.type(variable1); // should return `number`
    tanjun.type(variable2); // should return `string`
  }

  /*
   Function/callback runner:
   
   You can safely execute a function that is not so safe here, tanjun will handle the exceptions
   or if you want to log debug info while executing a function.
  */
  {
    // tanjun will execute a good callback without debug logs
    tanjun.execute(goodCallback);

    // tanjun will execute a bad callback with debug logs and if it will thrown an exception or not

    // Uncomment the line below if you want to see how tanjun handles bad callbacks.
    // tanjun.execute(badCallback, true, true);
  }

  /*
   Throw examples:
  */
   tanjun.crash('throw error message', '+', 'error', true); // this is a fake throw, the application won't stop
   tanjun.crash('throw fatal error message', '+', 'fatal'); // the 'test run' will stop here.
})();
