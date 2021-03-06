import { ValuesOptions, OObject } from './types';
/**
 * Get an array of the object values
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3, d: 4, e: 5 };
 * const b = { a: 1, b: { c: 2, d: 3 } };
 *
 * values(a); // => [ 1, 2, 3, 4, 5 ]
 * values(b, {
 *   follow: true,
 * }); // => [ 1, 2, 3 ]
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function values(obj: OObject, options?: ValuesOptions): any[];
export default values;
