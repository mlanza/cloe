import {overload} from '../../core';
import {days} from '../days/construct';
import {sod, eod, isDate} from '../date/concrete';
import {filter} from '../lazy-seq/concrete';
import {steps} from '../../protocols/isteppable/concrete';
import {compare} from '../../protocols/icomparable/concrete';
import {patch} from '../../associatives';
import {Symbol} from '../symbol/construct';

export function Recurrence(start, end, step, direction){
  this.start = start;
  this.end = end;
  this.step = step;
  this.direction = direction;
}

function from({start, end, step, direction}){
  return new Recurrence(start, end, step, direction);
}

export function emptyRecurrence(){
  return new Recurrence();
}

export function recurrence1(obj){
  return recurrence2(patch(obj, sod()), patch(obj, eod()));
}

function recurrence2(start, end){
  return recurrence3(start, end, days(end == null || start <= end ? 1 : -1));
}

const recurrence3 = steps(Recurrence, isDate);

function recurrence4(start, end, step, f){
  return filter(function(dt){
    return compare(start, dt) <= 0;
  }, f(recurrence3(start, end, step)));
}

export const recurrence = overload(emptyRecurrence, recurrence1, recurrence2, recurrence3, recurrence4);

Recurrence.from = from;
Recurrence.create = recurrence;
Recurrence.prototype[Symbol.toStringTag] = "Recurrence";