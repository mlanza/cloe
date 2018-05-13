import {IAssociative, ICollection, INext, IArr, ISeq, IShow, ISeqable, IIndexed, ICounted, ILookup, IReduce, IEmptyableCollection} from '../../protocols';
import {EMPTY} from '../../types/empty';
import {identity, constantly, effect} from '../../core';
import {implement} from '../../protocol';
import {EMPTY_ARRAY} from '../../types/array/construct';

function assoc(self, key, value){
  let obj = {};
  obj[key] = value;
  return obj;
}

function _reduce(self, xf, init){
  return init;
}

export default effect(
  implement(IEmptyableCollection, {empty: identity}),
  implement(ILookup, {lookup: constantly(null)}),
  implement(IAssociative, {assoc: assoc, contains: constantly(false)}),
  implement(INext, {next: identity}),
  implement(IArr, {toArray: constantly(EMPTY_ARRAY)}),
  implement(ISeq, {first: identity, rest: constantly(EMPTY)}),
  implement(ISeqable, {seq: identity}),
  implement(IIndexed, {nth: identity}),
  implement(ICounted, {count: constantly(0)}),
  implement(IReduce, {_reduce: _reduce}),
  implement(IShow, {show: constantly("null")}));