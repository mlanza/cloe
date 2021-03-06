import {unbind} from '../../core';
import {Protocol} from "./construct";

export const extend    = unbind(Protocol.prototype.extend);
export const satisfies = unbind(Protocol.prototype.satisfies);
export const specify   = unbind(Protocol.prototype.specify);
export const unspecify = unbind(Protocol.prototype.unspecify);
export const implement = unbind(Protocol.prototype.implement);

export function reifiable(properties){
  function Reifiable(properties){
    Object.assign(this, properties);
  }
  return new Reifiable(properties || {});
}