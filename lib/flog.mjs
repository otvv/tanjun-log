/*
*/

const flog = {
  // TODO: describe function
  // args: message = message to print
  // args: prefix = log prefix (a watermark, symbol, anything. e.g. "[+] - some message", '+' being the prefix)
  // args: type = log type (normal, error, fatal, warning, success)
  log(message, prefix = '+', type = 'normal') {
    const logTemplateDictionary = {
      normal: `\x1b[0m[\x1b[37m${prefix}\x1b[0m] - ${message} -> \x1b[46m\x1b[47mlog\x1b[100m\n`,
      warning: `\x1b[0m[\x1b[33m${prefix}\x1b[0m] - ${message} -> \x1b[46m\x1b[43mwarning\x1b[100m\n`,
      error: `\x1b[0m[\x1b[31m${prefix}\x1b[0m] - ${message} -> \x1b[46m\x1b[41merror\x1b[100m\n`,
      fatal: `\x1b[0m[\x1b[35m${prefix}\x1b[0m] - ${message} -> \x1b[46m\x1b[45mfatal\x1b[100m\n`,
      success: `\x1b[0m[\x1b[32m${prefix}\x1b[0m] - ${message} -> \x1b[46m\x1b[42msuccess\x1b[100m\n`,
      info: `\x1b[0m[\x1b[34m${prefix}\x1b[0m] - ${message} -> \x1b[46m\x1b[44minfo\x1b[100m\n`,
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
        throw e.message;
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