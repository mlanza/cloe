import {does} from '../../core';
import {implement} from '../protocol';
import {ICoerceable, IBounds, IComparable, IEquiv, IInclusive} from '../../protocols';
import {iterable} from '../lazy-seq/behave';
import {emptyable} from "../record/behave";
import {_ as v} from "param.macro";

function start(self){
  return self.start;
}

function end(self){
  return self.end;
}

function includes(self, dt) {
  return dt != null && (self.start == null || IComparable.compare(dt, self.start) >= 0) && (self.end == null || IComparable.compare(dt, self.end) < 0);
}

function equiv(self, other){
  return other != null && IEquiv.equiv(self.start, other.start) && IEquiv.equiv(self.end, other.end);
}

function toDuration(self){
  return self.end == null || self.start == null ? duration(Number.POSITIVE_INFINITY) : duration(self.end - self.start);
}

export const behaveAsPeriod = does(
  iterable,
  emptyable,
  implement(ICoerceable, {toDuration}),
  implement(IInclusive, {includes}),
  implement(IBounds, {start, end}),
  implement(IEquiv, {equiv}));