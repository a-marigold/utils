/**
 * Type of every util function
 */
export type UtilFunction = (...args: (string | undefined)[]) => unknown;

export type Utils = Map<string, UtilFunction>;

/**
 * Type of array initializer of Utils Map
 */
export type UtilsInit = [string, UtilFunction][];
