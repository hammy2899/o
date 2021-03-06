import { SliceOptions, OObject } from './types';
/**
 * Get a portion of the specified object
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3, d: 4 };
 *
 * slice(a, 0, 1); // => { a: 1 }
 * slice(a, 1, 3); // => { b: 2, c: 3 }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function slice(obj: OObject, start: number, end?: number, options?: SliceOptions): OObject;
export default slice;
