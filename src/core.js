import {Reduced, reduced} from './core/reduced.js';
import {multiarity, curry, subj, complement} from './core/function.js';
import Eq     from './protocols/eq.js';
import Seq    from './protocols/seq.js';
import Each   from './protocols/each.js';
import Reduce from './protocols/reduce.js';
import Extend from './protocols/extend.js';
import Get    from './protocols/get.js';
import Assoc  from './protocols/assoc.js';
import Deref  from './protocols/deref.js';
import {isEmpty} from './protocols/emptiable.js';
import * as cons from './core/cons.js';
import * as coll from './core/coll.js';
export {keys, assign} from './core/object.js';
import * as transduce from './core/transduce.js';
export {some, isEvery, isAny, isNotAny} from './core/coll.js';
export {transduce, into} from './core/transduce.js';
export {inc, increasingly, range} from './number.js';
export {log} from './log.js';
export {repeatedly, repeat} from './core/cons.js';
export {gt, lt, gte, lte} from './compare.js';
export {tap, chain, curry, doto, flip, compose, constantly, multiarity, complement, partial, overload} from './core/function.js';
export {slice, join, last, init} from './array.js';
export const first = subj(Seq.first); //TODO consider affect of optional params: i.e. chain(["larry", "moe"], first()) vs chain(["larry", "moe"], first);
export const rest = subj(Seq.rest);
export const each = subj(Each.each, 2);
export const reduce = subj(Reduce.reduce, 3);
export const get = subj(Get.get, 2);
export const assoc = subj(Assoc.assoc, 3);
export const hasKey = subj(Assoc.hasKey, 2);
export const eq = subj(Eq.eq, 2);
export const append = subj(Extend.append, 2);
export const prepend = subj(Extend.prepend, 2);
export const deref = Deref.deref;
export const map = multiarity(transduce.map, coll.map);
export const filter = multiarity(transduce.filter, coll.filter);
export const remove = multiarity(transduce.remove, coll.remove);
export const take = multiarity(transduce.take, coll.take);
export const takeWhile = multiarity(transduce.takeWhile, coll.takeWhile);
export const takeNth = multiarity(transduce.takeNth, coll.takeNth);
export const drop = multiarity(transduce.drop, coll.drop);
export const dropWhile = multiarity(transduce.dropWhile, coll.dropWhile);
export const fold = subj(coll.fold);
