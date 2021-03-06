import { CleanOptions, OObject } from './types';
/**
 * Remove `null` and `undefined` values from the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: null, c: undefined };
 *
 * clean(a); // => { a: 1 }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function clean(obj: OObject, options?: CleanOptions): OObject;
export default clean;
