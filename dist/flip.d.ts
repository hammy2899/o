import { FlipOptions, OObject } from './types';
/**
 * Flip an objects keys fro values and values for keys
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 * const c = { a: 1, b: { c: 2 } };
 *
 * flip(a); // => { '1': 'a', '2': 'b', '3': 'c' }
 * flip(b, {
 *   follow: true,
 * }); // => { '1': 'a', '2': 'b.c' }
 * flip(b, {
 *   useToString: true,
 * }); // => { '1': 'a', '{"c":2}': 'b' }
 * ```
 *
 * @throws TypeError
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function flip(obj: OObject, options?: FlipOptions): OObject;
export default flip;
