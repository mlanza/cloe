import {IFn, IReduce, IKVReduce, ILookup, IAssociative, IEmptyableCollection} from "../../protocols";
import {reducing} from "../reduced";
import {apply} from "../function";
import {overload, constantly} from "../../core";

export function juxtm(self, template){
  return IKVReduce.reducekv(template, function(memo, key, f){
    return IAssociative.assoc(memo, key, f(self));
  }, IEmptyableCollection.empty(template));
}

export function selectKeys(self, keys){
  return IReduce.reduce(keys, function(memo, key){
    return IAssociative.assoc(memo, key, ILookup.lookup(self, key));
  }, IEmptyableCollection.empty(self));
}

export function mapKeys(self, f){
  return IKVReduce.reducekv(self, function(memo, key, value){
    return IAssociative.assoc(memo, f(key), value);
  }, IEmptyableCollection.empty(self));
}

export function mapVals(self, f){
  return IKVReduce.reducekv(self, function(memo, key, value){
    return IAssociative.assoc(memo, key, f(value));
  }, IEmptyableCollection.empty(self));
}

function defaults2(self, defaults){
  return IKVReduce.reducekv(self, IAssociative.assoc, defaults);
}

export const defaults = overload(null, null, defaults2, reducing(defaults2));

export function compile(self){
  return function(...args){
    return apply(IFn.invoke, self, args);
  }
}
