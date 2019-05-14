/**
 * Check if an object includes the specified value
 *
 * @example
 * ```
 * const a = { a: 1, b: 2, c: 3 };
 * const b = { a: 1, b: { c: 2 } };
 *
 * includes(a, 1); // => true
 * includes(b, 2); // => false
 * includes(b, 2, true); // => true
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
declare function includes(obj: OObject, value: any, follow?: boolean): boolean;
export default includes;
