import {curry} from "./types";
import {overload, subj, obj} from "./core";
import * as c from "./core";
import * as p from "./protocols";
import * as a from "./associatives";
import * as s from "./sequences";
import * as pred from "./predicates";

export * from "./core";
export * from "./types";
export * from "./sequences";
export * from "./pipelines";
export * from "./protocols";
export {someFn} from "./predicates";

export const reduce = curry(p.reduce, 3);
export const append = subj(p.append);
export const prepend = subj(p.prepend);
export const conj = subj(p.conj);
export const invoke = subj(p.invoke);
export const find = subj(p.find);
export const assoc = subj(p.assoc);
export const contains = subj(p.contains);
export const dissoc = subj(p.dissoc);
export const pub = subj(p.pub);
export const sub = subj(p.sub);
export const includes = subj(p.includes);
export const doto = subj(c.doto);
export const transduce = obj(s.transduce);
export const each = obj(s.each);
export const dorun = obj(s.dorun);
export const doall = obj(s.doall);
export const dotimes = obj(s.dotimes);
export const some = obj(s.some);
export const notSome = obj(s.notSome);
export const notAny = obj(s.notAny);
export const every = obj(s.every);
export const notEvery = obj(s.notEvery);
export const map = obj(s.map);
export const mapa = obj(s.mapa);
export const mapIndexed = obj(s.mapIndexed);
export const keepIndexed = obj(s.keepIndexed);
export const filter = obj(s.filter);
export const filtera = obj(s.filtera);
export const remove = obj(s.remove);
export const keep = obj(s.keep);
export const drop = obj(s.drop);
export const dropWhile = obj(s.dropWhile);
export const dropLast = obj(s.dropLast);
export const take = obj(s.take);
export const takeWhile = obj(s.takeWhile);
export const takeNth = obj(s.takeNth);
export const takeLast = obj(s.takeLast);
export const interleave = obj(s.interleave);
export const interpose = obj(s.interpose);
export const partition = obj(s.partition);
export const partitionAll = obj(s.partitionAll);
export const partitionBy = obj(s.partitionBy);
export const splitAt = obj(s.splitAt);
export const splitWith = obj(s.splitWith);
export const mapcat = obj(s.mapcat);
export const sort = obj(s.sort);
export const sortBy = obj(s.sortBy);
export const groupInto = obj(s.groupInto);
export const groupBy = obj(s.groupBy);
export const doseq = obj(s.doseq);
export const detect = obj(s.detect);
export const repeatedly = obj(s.repeatedly);
export const repeat = obj(s.repeat);
export const interate = obj(s.interate);
export const isInstance = subj(c.isInstance);
export const into = obj(s.into);
export const and = subj(pred.and);
export const or = subj(pred.or);
export const branch = subj(pred.branch);
export const cond = subj(pred.cond);
export const everyPair = obj(pred.everyPair);
export const compare = subj(pred.compare);
export const isIdentical = subj(pred.isIdentical);
export const gt = subj(pred.gt);
export const gte = subj(pred.gte);
export const lt = subj(pred.lt);
export const lte = subj(pred.lte);
export const eq = subj(pred.eq);
export const notEq = subj(pred.notEq);
export const equal = subj(pred.equal);
export const min = subj(pred.min);
export const max = subj(pred.max);
export const get = subj(a.get);
export const getIn = subj(a.getIn);
export const index = obj(a.get);
export const assocIn = subj(a.assocIn);
export const update = subj(a.update);