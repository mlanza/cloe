import {constantly} from '../core';
import {extend} from '../protocol';
import Next from '../protocols/next';
import Seq from '../protocols/seq';
import Seqable from '../protocols/seqable';
import Counted from '../protocols/counted';
import Indexed from '../protocols/indexed';
import Reduce from '../protocols/reduce';
import Emptyable from '../protocols/emptyable';
import Lookup from '../protocols/lookup';
import Collection from '../protocols/collection';
import Reduced from '../protocols/collection';

function first(self){
  return self.values().next();
}

function rest(self){
  var vals = self.values();
  vals.next();
  return new Set(vals);
}

function seq(self){
  return self.size === 0 ? null : self;
}

function count(self){
  return self.size;
}

function nth(self, n){
  return n ? nth(rest(self), n - 1) : first(self);
}

function next(self){
  return self.size === 0 ? null : rest(self);
}

function conj(self, value){
  var set = new Set(self);
  set.add(value);
  return set;
}

function get(self, value){
  return self.has(value) ? value : null;
}

function reduce(self, f, init){ //TODO optimize?
  if (init instanceof Reduced) return init.valueOf();
  return seq(self) ? reduce(Seq.rest(self), f, f(init, Seq.first(self))) : init;
}

export default extend(Set, Collection, {
  conj: conj
}, Lookup, {
  get: nth
}, Emptyable, {
  empty: constantly(new Set())
}, Seqable, {
  seq: seq
}, Next, {
  next: next
}, Seq, {
  first: first,
  rest: rest
}, Counted, {
  count: count
}, Indexed, {
  nth: nth
}, Reduce, {
  reduce: reduce
});