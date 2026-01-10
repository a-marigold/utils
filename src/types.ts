type UtilFunction = (...args: unknown[]) => unknown;

export type Utils = Map<string, UtilFunction>;
export type UtilsInit = [string, UtilFunction][];
