import { FilterOptions, OObject, FilterCallback } from './types';
/**
 * Filter the object keys/values depending on the callback evaluation
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * filter(a, (key, value) => {
 *   return value === 1;
 * }); // => { a: 1 }
 *
 * filter(a, (key, value) => {
 *   return value === 2;
 * }, {
 *   follow: true,
 * }); // => { b: { c: 2 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function filter(obj: OObject, cb: FilterCallback, options?: FilterOptions): OObject;
export default filter;
