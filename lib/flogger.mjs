/*
*/

'use strict'

import { txt, bg, flags } from './utils/index.js'

const flogger = {
  // BRIEF: this function takes three parameters: 'message', 'prefix', and 'type'.
  // the function returns a string that logs a custom message with a prefix and a type of log
  // (normal, warning, error, fatal, success, or info) to the console.
  // the prefix and type are optional parameters with default values of ‘+’ and ‘normal’, respectively.
  // the function uses a dictionary to map each type of log to a specific color for the background of the log message.
  //
  // ARGS: message = message to print
  // ARGS: _prefix = optional log prefix (a watermark, symbol, anything. e.g. "[+] - some message", '+' being the prefix (defaults to '+'))
  // ARGS: _type = optional log type (normal, error, fatal, warning, success or info (defaults to 'normal'))
  // ARGS: _sufix = optional log sufix (can be a symbol, anything really. e.g. "some message -> type", '->' being the sufix (defaults to '->'))
  // TODO: add timestamps (with a optional argument to turn them off)
  print(message, _prefix = '+', _type = 'normal', _sufix = '->') {
    const logTemplateDictionary = {
      normal: `${flags.reset}[${txt.white}${_prefix}${flags.reset}] - ${message} ${_sufix} ${flags.reset}${bg.white} ${flags.bold}${_type} ${flags.reset}\n`,
      warning: `${flags.reset}[${txt.yellow}${_prefix}${flags.reset}] - ${message} ${_sufix} ${flags.reset}${bg.yellow} ${flags.bold}${_type} ${flags.reset}\n`,
      error: `${flags.reset}[${txt.red}${_prefix}${flags.reset}] - ${message} ${_sufix} ${flags.reset}${bg.red} ${flags.bold}${_type} ${flags.reset}\n`,
      fatal: `${flags.reset}[${txt.purple}${_prefix}${flags.reset}] - ${message} ${_sufix} ${flags.reset}${bg.purple } ${flags.bold}${_type} ${flags.reset}\n`,
      success: `${flags.reset}[${txt.green}${_prefix}${flags.reset}] - ${message} ${_sufix} ${flags.reset}${bg.green} ${flags.bold}${_type} ${flags.reset}\n`,
      info: `${flags.reset}[${txt.blue}${_prefix}${flags.reset}] - ${message} ${_sufix} ${flags.reset}${bg.blue} ${flags.bold}${_type} ${flags.reset}\n`
    }
    return (console.log(logTemplateDictionary[_type]));
  },

  // BRIEF: this function takes four parameters: 'message', 'prefix', 'type', 'fake' and 'sufix'.
  // the function throwns an uncaught exception that logs a custom message with a prefix and a type of error
  // (error, fatal) to the console.
  // the prefix and type are optional parameters with default values of ‘+’ and 'error', respectively.
  // the function uses a dictionary to map each type of log to a specific color for the background of the log message.
  // ARGS: message = message to show when throwing the error
  // ARGS: _prefix = optional log prefix (a watermark, symbol, anything. e.g. "[+] - some message", '+' being the prefix (defaults to '+'))
  // ARGS: _type = optional log type (error or fatal (defaults to 'error'))
  // ARGS: _fake = optional boolean that tells the application if the exception is fake or not (if its fake, it wont throw or stop the app from running)
  // ARGS: _sufix = optional log sufix (can be symbol or anything really. e.g. "some message !!! type", '!!!' being the sufix (defaults to '!'))
  // (defaults to 'false')
  throw(message, _prefix = '+', _type = 'error', _fake = false, _sufix = '!!!') {
    // TODO: add more error 'types'
    const errorTemplateDictionary = {
      error: `${flags.reset}[${txt.red}${_prefix}${flags.reset}] - ${message} ${_sufix} ${flags.reset}${bg.red} ${flags.bold}${_type} ${flags.reset}\n`,
      fatal: `${flags.reset}[${txt.purple}${_prefix}${flags.reset}] - ${message} ${_sufix} ${flags.reset}${bg.purple } ${flags.bold}${_type} ${flags.reset}\n`,
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
    return (flogger.print(`callback trace: ${(new Error()).stack.split('\t').reverse()}`, 'flogger', 'info', '-'));
    // TODO: add current node instance appid to the log info
    // TODO: inject the desired callback into the result so the end user can call this function separately
  },

  // BRIEF: this is very similar to the function above but instead of the entire callstack it will return a string
  // that represents the function callee.
  callee() {
    // log here with function callee
    return (flogger.print(`callback callee: ${(new Error()).stack.split('\n')[1].trim().split('\x20')[1]}\n\t from Object flogger`, 'flogger', 'info', '-'));
    // TODO: add current node instance appid to the log info
    // TODO: inject the desired callback into the result so the end user can call this function separately
  },

  // BRIEF: a function that logs the type of its argument to the console using the print function.
  // the function takes one parameter called any, which can be any value or variable.
  // the function returns nothing and simply logs the type of 'any' to the console using the typeof operator.
  //
  // ARGS: any = pass anything here to get the type of it
  type(any) {
    return (flogger.print(typeof any, 'flogger', 'info', '-'));
  },

  // BRIEF: function that takes three parameters: 'callback', '_debug', and '_throwable'.
  // the function logs a message to the console using the log function defined earlier in your code snippet,
  // indicating that it is attempting to execute the callback.
  // it then tries to execute the callback using a try-catch block.
  // if an error occurs while executing the callback, it logs an error message to the console
  // using the print function with a type of ‘fatal’.
  // if _throwable is true, it throws a new error with the error message.
  // the function then logs information about its arguments and execution context to the console if _debug is true,
  // using the log function with a type of ‘info’.
  // finally, it logs a message indicating that it has stopped executing the callback using the print function with a type of ‘normal’.
  //
  // ARGS: callback = callback that flogger will try to execute
  // ARGS: _debug = optional boolean that will print extra logs
  // ARGS: _throwable = optional boolean that will throw an exception in case the callback execution fails
  execute(callback, _debug = false, _throwable = false) {
    flogger.print('attempting to execute callback', 'flogger', 'normal');
    try {
      callback();
    } catch (e) {
      if (_throwable === true) {
        flogger.throw(`something went wrong: ${e.message}`, 'flogger', 'fatal');
      }
    } finally {
      if (_debug === true) {
        const INC_COUNT = 1;
        Array.from(arguments).forEach((args, index) => {
          if (flogger.type(args) === 'boolean') {
            flogger.print(`argument ${(index + INC_COUNT)}: boolean ${args}`, 'flogger', 'info');
          }
          else {
            flogger.print(`argument ${(index + INC_COUNT)}: ${args}`, 'flogger', 'info');
          }
        })
        flogger.print(`arguments being passed: ${arguments.length}`, 'flogger', 'info');
        flogger.print(`callback callee: ${(new Error()).stack.split('\n')[1].trim().split('\x20')[1]}\n\t from Object flogger`, 'flogger', 'info');
        // get trace stack
        flogger.trace();
      }
      flogger.print('stopped callback execution', 'flogger', 'normal');
    }
  },
}

export default flogger;
