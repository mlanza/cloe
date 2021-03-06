import {does, identity} from '../../core';
import {implement} from '../protocol';
import {ICounted, IAssociative, ILookup, ICloneable} from '../../protocols';

function assoc(self, key, value){
  return self.set(key, value);
}

function contains(self, key){
  return self.has(key);
}

function lookup(self, key){
  return self.get(key);
}

function count(self){
  return self.size;
}

export const behaveAsWeakMap = does(
  implement(ICloneable, {clone: identity}),
  implement(ICounted, {count}),
  implement(ILookup, {lookup}),
  implement(IAssociative, {assoc, contains}));