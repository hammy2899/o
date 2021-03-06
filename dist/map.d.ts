import { MapOptions, OObject, MapCallback } from './types';
/**
 * Loop over the object and return a new object with the values
 * computed using the callback
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 *
 * map(a, (key, value) => {
 *   return value * 2;
 * }); // => { a: 2, b: 4, c: 6 }
 *
 * map(b, (key, value) => {
 *   return value * 2;
 * }); // => { a: 2, b: NaN }
 *
 * map(b, (key, value) => {
 *   return value * 2;
 * }, {
 *   follow: true,
 * }); // => { a: 2, b: { c: 4 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function map(obj: OObject, cb: MapCallback, options?: MapOptions): OObject;
export default map;
