import {identity, does, overload} from '../../core';
import {implement} from '../protocol';
import {EmptyList, emptyList} from '../../types/empty-list/construct';
import {cons} from '../../types/list/construct';
import {range} from '../../types/range/construct';
import {Reduced, unreduced} from '../../types/reduced';
import {ISequential, ICoerceable, ILookup, IMap, ICloneable, IReduce, ICollection, IEmptyableCollection, INext, ISeq, ICounted, ISeqable, IIndexed} from '../../protocols';
import {revSeq} from './construct';
import {iterable} from '../lazy-seq/behave';
import {map} from '../lazy-seq/concrete';

function clone(self){
  return new revSeq(self.coll, self.idx);
}

function count(self){
  return ICounted.count(self.coll);
}

function keys(self){
  return range(count(self));
}

function vals(self){
  return map(nth(self, ?), keys(self));
}

function nth(self, idx){
  return IIndexed.nth(self.coll, count(self) - 1 - idx);
}

function first(self){
  return IIndexed.nth(self.coll, self.idx);
}

function rest(self){
  return INext.next(self) || emptyList();
}

function next(self){
  return self.idx > 0 ? revSeq(self.coll, self.idx - 1) : null;
}

function conj(self, value){
  return cons(value, self);
}

function reduce2(coll, f){
  let xs = ISeqable.seq(coll);
  return xs ? IReduce.reduce(INext.next(xs), f, ISeq.first(xs)) : f();
}

function reduce3(coll, f, init){
  let memo = init,
      xs   = ISeqable.seq(coll);
  while(xs){
    memo = f(memo, ISeq.first(xs));
    if (memo instanceof Reduced) {
      return unreduced(memo);
    }
    xs = INext.next(xs);
  }
  return memo;
}

const reduce = overload(null, null, reduce2, reduce3);

export const behaveAsRevSeq = does(
  iterable,
  implement(ISequential),
  implement(ICounted, {count}),
  implement(IIndexed, {nth}),
  implement(ILookup, {lookup: nth}),
  implement(IMap, {keys, vals}),
  implement(ICoerceable, {toArray: Array.from}),
  implement(IEmptyableCollection, {empty: emptyList}),
  implement(IReduce, {reduce}),
  implement(ICollection, {conj}),
  implement(ISeq, {first, rest}),
  implement(INext, {next}),
  implement(ISeqable, {seq: identity}),
  implement(ICloneable, {clone}));