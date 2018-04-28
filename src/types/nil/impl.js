import Nil from '../../types/nil/construct';
import IndexedSeq from '../../types/indexedseq/construct';
import IAssociative from '../../protocols/iassociative';
import ICollection from '../../protocols/icollection';
import INext from '../../protocols/inext';
import ISeq from '../../protocols/iseq';
import IShow from '../../protocols/ishow';
import ISeqable from '../../protocols/iseqable';
import IIndexed from '../../protocols/iindexed';
import ICounted from '../../protocols/icounted';
import ILookup from '../../protocols/ilookup';
import IReduce from '../../protocols/ireduce';
import IEmptyableCollection from '../../protocols/iemptyablecollection';
import {empty} from '../../types/empty';
import {identity, constantly, doto} from '../../core';
import {implement} from '../../protocol';

function assoc(self, key, value){
  let obj = {};
  obj[key] = value;
  return obj;
}

function _reduce(self, xf, init){
  return init;
}

doto(Nil,
  implement(IEmptyableCollection, {empty: identity}),
  implement(ILookup, {lookup: constantly(null)}),
  implement(IAssociative, {assoc: assoc, contains: constantly(false)}),
  implement(INext, {next: identity}),
  implement(ISeq, {first: identity, rest: empty, toArray: constantly(Object.freeze([]))}),
  implement(ISeqable, {seq: identity}),
  implement(IIndexed, {nth: identity}),
  implement(ICounted, {count: constantly(0)}),
  implement(IReduce, {_reduce: _reduce}),
  implement(IShow, {show: constantly("null")}));