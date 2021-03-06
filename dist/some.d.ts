import { SomeOptions, OObject, SomeCallback } from './types';
/**
 * Check if some items in the object evaluates to true
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 1 } };
 *
 * some(a, (key, value) => {
 *   return value === 1;
 * }); // => true
 *
 * some(a, (key, value) => {
 *   return value === 1;
 * }, {
 *   follow: true,
 * }); // => true
 *
 * some(a, (key, value) => {
 *   return value === 2;
 * }, {
 *   follow: true,
 * }); // => false
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function some(obj: OObject, cb: SomeCallback, options?: SomeOptions): boolean;
export default some;
