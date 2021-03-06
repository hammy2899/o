import { DefaultsFunction, OObject } from './types';
/**
 * Same as `defaults` however the function returned will do a
 * shallow merge instead of a deep merge.
 *
 * @example
 * ```
 * const getDefaults = shallowDefaults({ a: 1, b: { c: 2, d: 3 } })
 *
 * getDefaults({ a: 2, b: { c: 3 } }) // => { a: 2, b: { c: 3 } }
 * ```
 *
 * @throws TypeError
 *
 * @since 2.3.0
 * @version 2.3.0
 */
declare function shallowDefaults(obj: OObject): DefaultsFunction;
export default shallowDefaults;
