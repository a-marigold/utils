export type UtilFunction = (...args: string[]) => unknown;

export type Utils = Map<string, UtilFunction>;
export type UtilsInit = [string, UtilFunction][];
