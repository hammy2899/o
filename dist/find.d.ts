import { FindOptions, OObject, FindCallback } from './types';
/**
 * Find the key matching the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }); // => undefined
 *
 * find(a, (key, value) => {
 *   return value === 2;
 * }, {
 *   follow: true,
 * }); // => 'b.c'
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function find(obj: OObject, cb: FindCallback, options?: FindOptions): string | undefined;
export default find;
