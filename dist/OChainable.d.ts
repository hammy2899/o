import { OObject, CleanOptions, EachCallback, EachOptions, EveryCallback, EveryOptions, FilterCallback, FilterOptions, FindCallback, FindOptions, FlipOptions, KeysOptions, IncludesOptions, KeyOfOptions, MapCallback, MapOptions, SliceOptions, SomeCallback, SomeOptions, SortCallback, SortOptions, ValuesOptions } from './types';
export default class OChainable {
    private readonly originalObject;
    private currentObject;
    private modificationCount;
    /**
     * Create a new OChainable
     *
     * @param {OObject} obj
     *
     * @throws TypeError
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    constructor(obj: OObject);
    /**
     * Set the current object value
     *
     * @param {OObject} obj The new object
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    protected updateCurrent(obj: OObject): void;
    /**
     * Get the original object
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    original(): OObject;
    /**
     * Get the current object as a JSON string
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    toJSON(): string;
    /**
     * Get the current object as a pretty JSON string
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    toPrettyJSON(): string;
    /**
     * Get the original object as a JSON string
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    originalToJSON(): string;
    /**
     * Get the original object as a pretty JSON string
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    originalToPrettyJSON(): string;
    /**
     * A clone of the current object
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    object(): OObject;
    /**
     * A reference of the current object
     * (will change if you continue to modify)
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    objectRef(): OObject;
    /**
     * Check if the object has been modified
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    isModified(): boolean;
    /**
     * Check if the object has been modified
     *
     * @since 2.2.1
     * @version 2.2.1
     */
    totalModifications(): number;
    /**
     * Clean the object
     *
     * @see https://o.hammy2899.dev/modules/_clean_.html
     */
    clean(options?: CleanOptions): OChainable;
    /**
     * Clone the object
     *
     * @see https://o.hammy2899.dev/modules/_clone_.html
     */
    clone(): OObject;
    /**
     * Check if the object is deeply equal to the specified objects
     *
     * @see https://o.hammy2899.dev/modules/_deepequal_.html
     */
    deepEqual(...compareWith: OObject[]): boolean;
    /**
     * Deflate the object
     *
     * @see https://o.hammy2899.dev/modules/_deflate_.html
     */
    deflate(): OChainable;
    /**
     * Delete a property from the object
     *
     * @see https://o.hammy2899.dev/modules/_del_.html
     */
    del(path: string): OChainable;
    /**
     * Foreach over the objects keys and values
     *
     * @see https://o.hammy2899.dev/modules/_each_.html
     */
    each(cb: EachCallback, options?: EachOptions): OChainable;
    /**
     * Check if the object is empty
     *
     * @see https://o.hammy2899.dev/modules/_empty_.html
     */
    empty(): boolean;
    /**
     * Check if the object is equal to the specified objects
     *
     * @see https://o.hammy2899.dev/modules/_equal_.html
     */
    equal(...compareWith: OObject[]): boolean;
    /**
     * Loop over all object keys and values and check if all
     * evaluations are truthy
     *
     * @see https://o.hammy2899.dev/modules/_every_.html
     */
    every(cb: EveryCallback, options?: EveryOptions): boolean;
    /**
     * Filter the objects keys and values depending on the
     * callback evaluation
     *
     * @see https://o.hammy2899.dev/modules/_filter_.html
     */
    filter(cb: FilterCallback, options?: FilterOptions): OChainable;
    /**
     * Find the key matching the callback evaluation
     *
     * @see https://o.hammy2899.dev/modules/_find_.html
     */
    find(cb: FindCallback, options?: FindOptions): string | undefined;
    /**
     * Flip the objects keys for values and values for keys
     *
     * @see https://o.hammy2899.dev/modules/_flip_.html
     */
    flip(options?: FlipOptions): OChainable;
    /**
     * Get the value from the path in the object
     *
     * @see https://o.hammy2899.dev/modules/_get_.html
     */
    get(path: string, defaultValue?: any): any;
    /**
     * Check if the object has a value at the paths
     *
     * @see https://o.hammy2899.dev/modules/_has_.html
     */
    has(...paths: string[]): boolean;
    /**
     * Check if the object includes a value
     *
     * @see https://o.hammy2899.dev/modules/_includes_.html
     */
    includes(value: any, options?: IncludesOptions): boolean;
    /**
     * Inflate the object
     *
     * @see https://o.hammy2899.dev/modules/_inflate_.html
     */
    inflate(): OChainable;
    /**
     * Get the key to the specified value
     *
     * @see https://o.hammy2899.dev/modules/_keyof_.html
     */
    keyOf(value: any, options?: KeyOfOptions): string | undefined;
    /**
     * Check if the object has a value at the paths
     *
     * @see https://o.hammy2899.dev/modules/_keys_.html
     */
    keys(options?: KeysOptions): string[];
    /**
     * Loop over the object and compute new values using the callback
     *
     * @see https://o.hammy2899.dev/modules/_map_.html
     */
    map(cb: MapCallback, options?: MapOptions): OChainable;
    /**
     * Merge all sources into the object
     *
     * @see https://o.hammy2899.dev/modules/_merge_.html
     */
    merge(...sources: OObject[]): OChainable;
    /**
     * Set the value to the path on the object
     *
     * @see https://o.hammy2899.dev/modules/_set_.html
     */
    set(path: string, value: any): OChainable;
    /**
     * Merge sources with the object
     *
     * @see https://o.hammy2899.dev/modules/_shallowmerge_.html
     */
    shallowMerge(...sources: OObject[]): OChainable;
    /**
     * Get the size of the object
     *
     * @see https://o.hammy2899.dev/modules/_size_.html
     */
    size(): number;
    /**
     * Get a portion of the object
     *
     * @see https://o.hammy2899.dev/modules/_slice_.html
     */
    slice(start: number, end?: number, options?: SliceOptions): OObject;
    /**
     * Check if some items in the object evaluates to truthy
     *
     * @see https://o.hammy2899.dev/modules/_some_.html
     */
    some(cb: SomeCallback, options?: SomeOptions): boolean;
    /**
     * Sort the object with the callback evaluation
     *
     * @see https://o.hammy2899.dev/modules/_sort_.html
     */
    sort(cb: SortCallback, options?: SortOptions): OChainable;
    /**
     * Get the values from the object
     *
     * @see https://o.hammy2899.dev/modules/_values_.html
     */
    values(options?: ValuesOptions): any[];
}
