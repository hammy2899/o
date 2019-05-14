// o
import { valid } from './util';
import each from './each';

export interface OSomeCallback {
  (key: string, value: any, index: number): boolean;
}

/**
 * Check if some items in the object evaluates to true
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 1 } };
 *
 * some(a, (key, value) => {
 *   return value === 1;
 * }); // => true
 *
 * some(a, (key, value) => {
 *   return value === 1;
 * }, true); // => true
 *
 * some(a, (key, value) => {
 *   return value === 2;
 * }, true); // => false
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function some(obj: OObject, cb: OSomeCallback, follow: boolean = false): boolean {
  // check if the args specified are the correct type
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof cb !== 'function') throw new Error('The argument `cb` is not a function');
  if (typeof follow !== 'boolean') throw new Error('The argument `follow` is not a boolean');

  // set result to false so we can change it to true if
  // any of the callbacks evaluate to true
  let result = false;

  // for each over the object using the each function which makes it easier
  // for us to loop since we can just pass our own callback to evaluate the
  // the return value and we can pass follow directly to each and it will
  // handle the deep looping for us
  each(obj, (key, value, index) => {
    // if the callback evaluates to true
    if (cb(key, value, index)) {
      // set the result as true
      result = true;
    }
  }, follow);

  // return the result
  return result;
}

export default some;
