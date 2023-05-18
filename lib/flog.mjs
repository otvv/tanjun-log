/*
*/

import { textColor as txt, backgroundColor as bg } from "./utils/utils.js";

const flog = {
  // BRIEF: this function takes three parameters: 'message', 'prefix', and 'type'.
  // the function returns a string that logs a custom message with a prefix and a type of log
  // (normal, warning, error, fatal, success, or info) to the console.
  // the prefix and type are optional parameters with default values of ‘+’ and ‘normal’, respectively.
  // the function uses a dictionary to map each type of log to a specific color for the background of the log message.
  //
  // ARGS: MESSAGE = message to print
  // ARGS: PREFIX = optional log prefix (a watermark, symbol, anything. e.g. "[+] - some message", '+' being the prefix (defaults to '+'))
  // ARGS: TYPE = optional log type (normal, error, fatal, warning, success or info (defaults to 'normal'))
  log(message, _prefix = '+', _type = 'normal') {
    const logTemplateDictionary = {
      normal: `${txt.reset}[${txt.white}${_prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.white} log ${bg.reset}\n`,
      warning: `${txt.reset}[${txt.yellow}${_prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.yellow} warning ${bg.reset}\n`,
      error: `${txt.reset}[${txt.red}${_prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.red} error ${bg.reset}\n`,
      fatal: `${txt.reset}[${txt.purple}${_prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.purple } fatal ${bg.reset}\n`,
      success: `${txt.reset}[${txt.green}${_prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.green} success ${bg.reset}\n`,
      info: `${txt.reset}[${txt.blue}${_prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.blue} info ${bg.reset}\n`
    }
    return (console.log(logTemplateDictionary[_type]));
  },

  // BRIEF: this function takes four parameters: 'message', 'prefix', 'type' and 'fake'.
  // the function throwns an uncaught exception that logs a custom message with a prefix and a type of error
  // (error, fatal) to the console.
  // the prefix and type are optional parameters with default values of ‘+’ and 'error', respectively.
  // the function uses a dictionary to map each type of log to a specific color for the background of the log message.
  // ARGS: MESSAGE = message to show when throwing the error
  // ARGS: PREFIX = optional log prefix (a watermark, symbol, anything. e.g. "[+] - some message", '+' being the prefix (defaults to '+'))
  // ARGS: TYPE = optional log type (error or fatal (defaults to 'error'))
  // ARGS: FAKEABLE = optional boolean that tells the application if the exception is fake or not (if its fake, it wont throw or stop the app from running)
  // (defaults to 'false')
  throw(message, _prefix = '+', _type = 'error', _fake = false) {
    // TODO: add more error 'types'
    const errorTemplateDictionary = {
      error: `${txt.reset}[${txt.red}${_prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.red} error ${bg.reset}\n`,
      fatal: `${txt.reset}[${txt.purple}${_prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.purple } fatal ${bg.reset}\n`,
    }
    if (_fake === true) {
      return console.error((errorTemplateDictionary[_type])); 
    }
    throw (errorTemplateDictionary[_type]);
  },

  // BRIEF: a function that logs a message with a prefix and a type of log (info) to the console.
  // the message is generated using the stack property of a new error object,
  // which returns a string representing the call stack of the current execution context.
  trace() {
    // log here with function trace
    return (flog.log(`callback trace: ${(new Error()).stack.split('\t').reverse()}`, 'flog', 'info'));
    // TODO: inject the desired callback into the result so the end user can call this function separately
  },

  // BRIEF: this is very similar to the function above but instead of the entire callstack it will return a string
  // that represents the function callee.
  callee() {
    // log here with function callee
    return (flog.log(`callback callee: ${(new Error()).stack.split('\n')[1].trim().split('\x20')[1]}\n\t from Object flog`, 'flog', 'info'));
    // TODO: inject the desired callback into the result so the end user can call this function separately
  },

  // BRIEF: a function that logs the type of its argument to the console using the log function.
  // the function takes one parameter called any, which can be any value or variable.
  // the function returns nothing and simply logs the type of 'any' to the console using the typeof operator.
  //
  // ARGS: ANY = pass anything here to get the type of it
  type(any) {
    return (flog.log(typeof any, 'flog', 'info'));
  },

  // BRIEF: function that takes three parameters: 'callback', '_debug', and '_throwable'.
  // the function logs a message to the console using the log function defined earlier in your code snippet,
  // indicating that it is attempting to execute the callback.
  // it then tries to execute the callback using a try-catch block.
  // if an error occurs while executing the callback, it logs an error message to the console
  // using the log function with a type of ‘fatal’.
  // if _throwable is true, it throws a new error with the error message.
  // the function then logs information about its arguments and execution context to the console if _debug is true,
  // using the log function with a type of ‘info’.
  // finally, it logs a message indicating that it has stopped executing the callback using the log function with a type of ‘normal’.
  //
  // ARGS: CALLBACK = callback that flog will try to execute
  // ARGS: _DEBUG = optional boolean that will print extra logs
  // ARGS: _THROWABLE = optional boolean that will throw an exception in case the callback execution fails
  run(callback, _debug = false, _throwable = false) {
    flog.log('attempting to execute callback', 'flog', 'normal');
    try {
      callback();
    } catch (e) {
      if (_throwable === true) {
        flog.throw(`something went wrong: ${e.message}`, 'flog', 'fatal');
      }
    } finally {
      if (_debug === true) {
        const INC_COUNT = 1;
        Array.from(arguments).forEach((args, index) => {
          if (typeof args === 'boolean') {
            flog.log(`argument ${(index + INC_COUNT)}: boolean ${args}`, 'flog', 'info');
          }
          else {
            flog.log(`argument ${(index + INC_COUNT)}: ${args}`, 'flog', 'info');
          }
        })
        flog.log(`arguments being passed: ${arguments.length}`, 'flog', 'info');
        flog.log(`callback callee: ${(new Error()).stack.split('\n')[1].trim().split('\x20')[1]}\n\t from Object flog`, 'flog', 'info');
        // get trace stack
        flog.trace();
      }
      flog.log('stopped callback execution', 'flog', 'normal');
    }
  },
}

export default flog;
