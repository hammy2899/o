import keys from '../keys';

describe('keys', () => {
  test('should return an array of the objects keys', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };

    expect(keys(obj)).toHaveLength(3);
    expect(keys(obj)[0]).toBe('a');
    expect(keys(obj)[1]).toBe('b');
    expect(keys(obj)[2]).toBe('c');
  });

  test('should return deep object keys in dot notation if follow is true', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
      },
    };

    expect(keys(obj, {
      follow: false,
    })[1]).toBe('b');
    expect(keys(obj, {
      follow: true,
    })[1]).toBe('b.c');
  });

  test('', () => {
    const invalidObj: unknown = 'testing';
    const invalidFollow: unknown = 'testing';

    expect(() => keys(invalidObj as OObject))
      .toThrow(new TypeError('Expected Object, got string testing'));
    expect(() => keys({}, {
      follow: invalidFollow as boolean,
    }))
      .toThrow(new TypeError('Expected Boolean, got string testing'));
  });
});
