import {extend} from '../protocol';
import Deref from '../protocols/deref';

export function Reduced(value){
  this.value = value;
}

Reduced.prototype.valueOf = function(){
  return this.value;
}

export function reduced(value){
  return new Reduced(value);
}

export function isReduced(value){
  return value instanceof Reduced;
}

export default extend(Reduced, Deref, {
  deref: function(reduced){
    return reduced.valueOf();
  }
});