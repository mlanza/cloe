import {protocol, satisfies} from "../types/protocol";
export const ISwap = protocol({
  swap: null
});
export const isSwappable = satisfies(ISwap);