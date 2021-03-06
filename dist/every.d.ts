import { EveryOptions, OObject, EveryCallback } from './types';
/**
 * Check if every item in the object evaluates to true
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 1 } };
 *
 * every(a, (key, value) => {
 *   return value === 1;
 * }); // => false
 *
 * every(a, (key, value) => {
 *   return value === 1;
 * }, {
 *   follow: true,
 * }); // => true
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function every(obj: OObject, cb: EveryCallback, options?: EveryOptions): boolean;
export default every;
