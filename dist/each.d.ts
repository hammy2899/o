import { EachOptions, OObject, EachCallback } from './types';
/**
 * Foreach over an objects keys
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * each(a, (key, value) => {
 *   console.log(key, value);
 *   // => a  1
 *   // => b  { c: 2 }
 * });
 *
 * each(a, (key, value) => {
 *   console.log(key, value);
 *   // => a  1
 *   // => b.c  2
 * }, {
 *   follow: true,
 * });
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function each(obj: OObject, cb: EachCallback, options?: EachOptions): void;
export default each;
