import {protocol, satisfies} from "../types/protocol";
export const IReduce = protocol({
  reduce: null
});
export const isReduceable = satisfies(IReduce);