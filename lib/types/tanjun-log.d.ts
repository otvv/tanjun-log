/*
 */

'use strict'

declare module "tanjun-log" {
  export function print(
    message: string,
    _prefix: string,
    _type: string,
    _sufix: string
  ): void;
  export function crash(
    message: string,
    _prefix: string,
    _type: string,
    _fake: boolean,
    _sufix: string
  ): void;
  export function trace(): void;
  export function callee(): void;
  export function type(any: any): void;
  export function execute(
    callback: function,
    _debug: boolean,
    _throwable: boolean
  ): void;
}
