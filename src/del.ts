// o
import { valid, dotNotation } from './util';
import clone from './clone';

/**
 * Delete the specified path from the object
 *
 * @example
 * ```
 * const a = { a: 1, b: { c: 2 } };
 *
 * const b = del(a, 'b.c');
 *
 * console.log(b); // => { a: 1, b: {} }
 * ```
 *
 * @throws Error
 *
 * @since 1.0.0
 * @version 2.0.0
 */
function del(obj: OObject, path: string): OObject {
  // check if the arg specified is an object
  if (!valid(obj)) throw new Error('The argument `obj` is not an object');
  if (typeof path !== 'string') throw new Error('The argument `path` is not a string');

  // clone the original object so we can manipulate it
  let cloned = clone(obj);

  // create the result object as a ref to the cloned object
  const result = cloned;

  // get the dot notation path parts
  const pathParts = dotNotation.from(path);

  // for each path part
  pathParts.forEach((part, index) => {
    // if the part is the last one
    if (index === pathParts.length - 1) {
      // delete the value in the object
      delete cloned[part];
    }

    // set the cloned value as the next part
    cloned = cloned[part];
  });

  // return the result
  return result;
}

export default del;
