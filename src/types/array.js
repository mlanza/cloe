import unbind from '../unbind';
import {slice, first, rest, reverse, reduce, append as conj, identity, always, arity} from '../core';
export {slice, first, rest, reverse, reduce, conj};
import {extend} from '../protocol';
import {EMPTY} from '../types/empty';
import {concat as _concat} from '../types/concat';
import Next from '../protocols/next';
import Seq from '../protocols/seq';
import Seqable from '../protocols/seqable';
import Counted from '../protocols/counted';
import Indexed from '../protocols/indexed';
import Reduce from '../protocols/reduce';
import Emptyable from '../protocols/emptyable';
import Lookup from '../protocols/lookup';
import Associative from '../protocols/associative';
import Collection from '../protocols/collection';

export const join = unbind(Array.prototype.join);
export const empty = always([]);

export function seq(self){
  return self.length === 0 ? null : self;
}

export function count(self){
  return self.length;
}

export function nth(self, n){
  return n < self.length ? self[n] : null;
}

export function next(self){
  return self.length === 0 ? null : rest(self);
}

export const lookup = nth;

export function hasKey(self, key){
  return key > -1 && key < self.length;
}

export function assoc(self, key, value){
  var arr = slice(self);
  arr.splice(key, 1, value);
  return arr;
}

extend(Collection, Array, {
  conj: conj
});

extend(Lookup, Array, {
  lookup: lookup
});

extend(Associative, Array, {
  assoc: assoc,
  hasKey: hasKey
});

extend(Emptyable, Array, {
  empty: empty
});

extend(Seqable, Array, {
  seq: seq
});

extend(Next, Array, {
  next: next
});

extend(Seq, Array, {
  first: first,
  rest: rest
});

extend(Counted, Array, {
  count: count
});

extend(Indexed, Array, {
  nth: nth
});

extend(Reduce, Array, {
  reduce: reduce
});

/*

export function concat(){
  return reduce(slice(arguments), function(memo, arr){
    return memo.concat(arr);
  }, []);
}

export function flatten(arr){
  return Coll.flatten(Seq.seq(arr));
}

export function trim(self){
  return filter(self, identity);
}

extend(Trim, Array, {
  trim: trim
});
*/

export default Array;