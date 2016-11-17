import {identity, constantly, noop} from '../core';
import List from '../types/list';
import Emptyable from '../protocols/emptyable';
import Seqable from '../protocols/seqable';
import Seq from '../protocols/seq';
import Next from '../protocols/next';
import Reduce from '../protocols/reduce';
import Deref from '../protocols/deref';
import Collection from '../protocols/collection';
import {extend} from '../protocol';
import {EMPTY} from '../types/empty.js';

export function isNil(value){
  return null == value;
}

function reduce(){
  return arguments[2];
}

function assoc(self, key, value){
  var obj = {};
  obj[key] = value;
  return obj;
}

function conj(self, value){
  return new List(value, constantly(EMPTY));
}

extend(Deref, null, {
  deref: constantly(null)
});

extend(Collection, null, {
  conj: conj
});

extend(Lookup, null, {
  lookup: lookup
});

extend(Associative, null, {
  assoc: assoc,
  hasKey: constantly(false)
});

extend(Emptyable, null, {
  seq: identity
});

extend(Seqable, null, {
  seq: identity
});

extend(reduce, null, {
  reduce: reduce
});

extend(Seq, null, {
  first: constantly(null),
  rest:  constantly(EMPTY)
});

extend(Next, null, {
  next: constantly(null)
});

export default null;