import * as _ from "./core";
import {curry, overload, subj, obj} from "./core";
export {chain, isReduceable, els, unless, date, repeat, butlast, empty, isTrue, isFalse, opt, yank, upperCase, lowerCase, satisfies, indexedSeq, pipe, record, list, count, observable, years, months, days, weeks, deref, comp, maybe, inc, dec, everyPred, maxKey, minKey, scanKey, constantly, distinct, dedupe, isOdd, isEven, toArray, toObject, cycle, curry, overload, subj, obj, integers, repeatedly, first, second, rest, next, range, flatten} from "./core";

export const join = obj(_.join);
export const any = subj(_.any);
export const all = subj(_.all);
export const or = subj(_.or);
export const and = subj(_.and);
export const str = subj(_.str);
export const split = subj(_.split);
export const subs = subj(_.subs);
export const union = subj(_.union);
export const difference = subj(_.difference);
export const subset = subj(_.subset);
export const superset = subj(_.superset);
export const reset = subj(_.reset);
export const swap = subj(_.swap);
export const step = obj(_.step);
export const add = subj(_.add);
export const includes = subj(_.includes);
export const subtract = subj(_.subtract);
export const reduce = curry(_.reduce, 3);
export const plus = subj(_.plus);
export const concat = subj(_.concat);
export const append = subj(_.append);
export const prepend = subj(_.prepend);
export const conj = subj(_.conj);
export const invoke = subj(_.invoke);
export const find = subj(_.find);
export const assoc = subj(_.assoc);
export const contains = subj(_.contains);
export const dissoc = subj(_.dissoc);
export const pub = subj(_.pub);
export const sub = subj(_.sub);
export const doto = subj(_.doto);
export const transduce = obj(_.transduce);
export const each = obj(_.each);
export const dorun = obj(_.dorun);
export const doall = obj(_.doall);
export const dotimes = obj(_.dotimes);
export const some = curry(_.some);
export const notSome = curry(_.notSome, 2);
export const notAny = curry(_.notAny, 2);
export const every = curry(_.every, 2);
export const notEvery = curry(_.notEvery, 2);
export const map = obj(_.map);
export const mapa = obj(_.mapa);
export const mapIndexed = obj(_.mapIndexed);
export const keepIndexed = obj(_.keepIndexed);
export const filter = obj(_.filter);
export const filtera = obj(_.filtera);
export const remove = obj(_.remove);
export const keep = obj(_.keep);
export const drop = obj(_.drop);
export const dropWhile = curry(_.dropWhile);
export const dropLast = curry(_.dropLast);
export const take = curry(_.take);
export const takeWhile = obj(_.takeWhile);
export const takeNth = obj(_.takeNth);
export const takeLast = obj(_.takeLast);
export const interleave = subj(_.interleave);
export const interpose = obj(_.interpose);
export const partition = obj(_.partition);
export const partitionAll = obj(_.partitionAll);
export const partitionBy = obj(_.partitionBy);
export const splitAt = obj(_.splitAt);
export const splitWith = obj(_.splitWith);
export const selectKeys = subj(_.selectKeys);
export const mapcat = obj(_.mapcat);
export const sort = obj(_.sort);
export const sortBy = obj(_.sortBy);
export const groupBy = obj(_.groupBy);
export const doseq = obj(_.doseq);
export const detect = obj(_.detect);
export const iterate = obj(_.iterate);
export const best = obj(_.best);
export const scan = obj(_.scan);
export const into = obj(_.into);
export const isInstance = subj(_.isInstance);
export const pre = subj(_.pre);
export const post = subj(_.post);
export const matches = subj(_.matches);
export const cond = subj(_.cond);
export const everyPair = obj(_.everyPair);
export const compare = subj(_.compare);
export const isIdentical = subj(_.isIdentical);
export const gt = subj(_.gt);
export const gte = subj(_.gte);
export const lt = subj(_.lt);
export const lte = subj(_.lte);
export const eq = subj(_.eq);
export const notEq = subj(_.notEq);
export const min = subj(_.min);
export const max = subj(_.max);
export const get = subj(_.get);
export const nth = subj(_.nth);
export const getIn = subj(_.getIn);
export const index = obj(_.get);
export const assocIn = subj(_.assocIn);
export const update = subj(_.update);
export const updateIn = subj(_.updateIn);
export const clamp = subj(_.clamp);