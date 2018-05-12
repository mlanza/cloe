import {protocol, satisfies} from "../protocol";
export const IDisposable = protocol({
  dispose: null
});
export const dispose = IDisposable.dispose;
export const isDisposable = satisfies(IDisposable);
export default IDisposable;