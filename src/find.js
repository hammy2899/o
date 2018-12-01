// o
import is from './is';
import empty from './empty';
import each from './each';

/**
 * Find the value matching the iterator evaluation
 *
 * @param {object} object The object to search
 * @param {function(key: string, value: *)} iterator The function to evaluate
 * @param {boolean} [follow=false] Whether to follow objects
 *
 * @returns {*}
 */
function find(object, iterator, follow) {
  // if the object is an object and is not empty
  if (is(object) && !empty(object)) {
    // create an result variable as undefined
    let found = false;
    let result = '';

    // for each key/value in the object
    // follow is passed into each therefore the
    // each function works out whether to follow
    // the objects
    each(object, (key, value) => {
      // if the value hasn't already been found
      if (!found) {
        // if its not following objects or its
        // following but the value isn't an object
        // this will skip any value which is an object
        // when following allow us to run the iterator
        // on the key/values within the objects which
        // generates the filter effect throughout the
        // whole object
        if (!follow || (follow && !is(value))) {
          // check if the iterator is false if it
          // is false then delete that key from the object
          if (iterator(key, value) === true) {
            found = true;
            result = value;
          }
        }
      }
    }, follow);

    // return the result unless the value wasn't found
    // then return undefined
    return found
      ? result
      : undefined;
  }

  // if the object isn't an object or is empty return
  // undefined because the iterator can't be ran to
  // make a check
  return undefined;
}

export default find;