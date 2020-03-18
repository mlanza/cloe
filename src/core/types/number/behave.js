import {constantly, does, overload, identity} from '../../core';
import {implement} from '../protocol';
import {IBounds, ISteppable, IInverse, IComparable, IMultipliable} from '../../protocols';

function compare(self, other){
  return self === other ? 0 : self - other;
}

function step(amount, target){
  return target + amount;
}

function inverse(amount){
  return amount * -1;
}

function mult(self, n){
  return self * n;
}

function unit2(self, amount){
  return amount;
}

const unit = overload(null, constantly(1), unit2);

export const behaveAsNumber = does(
  implement(IMultipliable, {mult}),
  implement(IBounds, {start: identity, end: identity}),
  implement(IComparable, {compare}),
  implement(IInverse, {inverse}),
  implement(ISteppable, {step}));