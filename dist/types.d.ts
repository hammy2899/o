export interface OObject {
    [key: string]: any;
}
export interface CleanOptions {
    follow?: boolean;
}
export interface DefaultsFunction {
    (...obj: OObject[]): OObject;
    defaultObject: OObject;
}
export interface EachOptions {
    follow?: boolean;
}
export declare type EachCallback = (key: string, value: any, index: number) => void;
export interface EveryOptions {
    follow?: boolean;
}
export declare type EveryCallback = (key: string, value: any, index: number) => boolean;
export interface FilterOptions {
    follow?: boolean;
}
export declare type FilterCallback = (key: string, value: any, index: number) => boolean;
export interface FindOptions {
    follow?: boolean;
}
export declare type FindCallback = (key: string, value: any, index: number) => boolean;
export interface FlipOptions {
    follow?: boolean;
    useToString?: boolean;
}
export interface IncludesOptions {
    follow?: boolean;
}
export interface KeyOfOptions {
    follow?: boolean;
}
export interface KeysOptions {
    follow?: boolean;
}
export interface MapOptions {
    follow?: boolean;
}
export declare type MapCallback = (key: string, value: any, index: number) => any;
export interface SliceOptions {
    follow?: boolean;
}
export interface SomeOptions {
    follow?: boolean;
}
export declare type SomeCallback = (key: string, value: any, index: number) => boolean;
export interface SortOptions {
    follow?: boolean;
}
export interface SortElement {
    key: string;
    value: any;
}
export declare type SortCallback = (firstEl: SortElement, secondEl: SortElement) => number;
export interface ValuesOptions {
    follow?: boolean;
}
