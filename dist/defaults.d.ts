import { DefaultsFunction, OObject } from './types';
/**
 * Returns a function which will merge all objects with the default object
 * specified. This is useful for creating default options/settings.
 *
 * @example
 * ```
 * const getDefaults = defaults({ a: 1, b: { c: 2 } })
 *
 * getDefaults({ b: { c: 3, d: 4 } }) // => { a: 1, b: { c: 3, d: 4 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 2.3.0
 * @version 2.3.0
 */
declare function defaults(obj: OObject): DefaultsFunction;
export default defaults;
