import {does, identity, overload, doto} from '../../core';
import {implement, specify, satisfies} from '../protocol';
import {IFunctor, ISeq, INext, ISequential, ICoerce} from '../../protocols';
import {mapcat} from '../lazy-seq';
import {listed, emptyListed} from "./construct";
import behave from "../series/behave";

function fmap(self, f){
  return listed(mapcat(function(x){
    var y = f(x);
    return y == null ? [] : satisfies(ISequential, y) ? y : cons(y);
  }, self.items));
}

function first(self){
  return ISeq.first(self.items);
}

function rest(self){
  const result = next(self);
  return result ? listed(result) : emptyListed();
}

function next(self){
  const result = INext.next(self.items);
  return result ? listed(result) : null;
}

export default does(
  behave,
  implement(ICoerce, {toArray: Array.from}),
  implement(INext, {next}),
  implement(ISeq, {first, rest}),
  implement(IFunctor, {fmap}));