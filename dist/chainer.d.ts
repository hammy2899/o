import OChainable from './OChainable';
import { OObject } from './types';
/**
 * Create a new OChainable instance
 *
 * @example
 * ```
 * const a = { a: 1 }
 * const obj = chainer(a)
 *
 * obj
 *  .set('a', 2)
 *  .merge({ b: 3 })
 *  .toJSON()
 * ```
 *
 * @throws TypeError
 *
 * @since 2.2.1
 * @version 2.2.1
 */
declare function chainer(obj: OObject): OChainable;
export default chainer;
