/*
*/

import { textColor as txt, backgroundColor as bg } from "./utils/utils.js";

const flog = {

  // TODO: describe function
  // args: message = message to print
  // args: prefix = log prefix (a watermark, symbol, anything. e.g. "[+] - some message", '+' being the prefix)
  // args: type = log type (normal, error, fatal, warning, success)
  log(message, prefix = '+', type = 'normal') {
    const logTemplateDictionary = {
      normal: `${txt.reset}[${txt.white}${prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.white} log ${bg.reset}\n`,
      warning: `${txt.reset}[${txt.yellow}${prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.yellow} warning ${bg.reset}\n`,
      error: `${txt.reset}[${txt.red}${prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.red} error ${bg.reset}\n`,
      fatal: `${txt.reset}[${txt.purple}${prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.purple } fatal ${bg.reset}\n`,
      success: `${txt.reset}[${txt.green}${prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.green} success ${bg.reset}\n`,
      info: `${txt.reset}[${txt.blue}${prefix}${txt.reset}] - ${message} -> ${bg.reset}${bg.blue} info ${bg.reset}\n`
    }
    return (console.log(logTemplateDictionary[type]));
  },
  // TODO: describe function
  trace() {
    // log here with function trace
    return (flog.log(`callback trace: ${(new Error()).stack.split('\t').reverse()}`, 'flog', 'info'));
    // TODO: inject the desired callback into the result so the end user can call this function separately
  },
  // TODO: describe function
  callee() {
    // log here with function callee
    return (flog.log(`callback callee: ${(new Error()).stack.split('\n')[1].trim().split('\x20')[1]}\n\t from Object flog`, 'flog', 'info'));
    // TODO: inject the desired callback into the result so the end user can call this function separately
  },
  // TODO: describe function
  // args: any = pass anything here to get the type of it
  type(any) {
    return (flog.log(typeof any, 'flog', 'info'));
  },
  // TODO: describe function
  // args: callback = callback that flog will try to execute
  // args: _debug = optional boolean that will print extra logs
  // args: _throwable = optional boolean that will throw an exception in case the callback execution fails
  run(callback, _debug = false, _throwable = false) {
    // log here saying that flog will try to run your callback
    flog.log('attempting to execute callback', 'flog', 'normal');
    try {
      callback();
    } catch (e) {
      // log here saying that something went wrong while flog tried to run your callback with the error message
      flog.log(`something went wrong: ${e.message}`, 'flog', 'fatal');
      if (_throwable) {
        throw new Error(e.message);
      }
    } finally {
      if (_debug) {
        const INC_COUNT = 1;
        // log here with additional info
        Array.from(arguments).forEach((args, index) => {
          if (typeof args === 'boolean') {
            flog.log(`argument ${(index + INC_COUNT)}: boolean ${args}`, 'flog', 'info');
          }
          else {
            flog.log(`argument ${(index + INC_COUNT)}: ${args}`, 'flog', 'info');
          }
        })
        // log here with ammount of arguments being passed
        flog.log(`arguments being passed: ${arguments.length}`, 'flog', 'info');
        // loh here with callback callee
        flog.log(`callback callee: ${(new Error()).stack.split('\n')[1].trim().split('\x20')[1]}\n\t from Object flog`, 'flog', 'info');
        // get trace stack
        flog.trace();
      }
      // log here saying that flog finished running your callback
      flog.log('stopped callback execution', 'flog', 'normal');
    }
  },
}

export default flog;