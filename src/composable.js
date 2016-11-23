import * as core from './core';
import * as protocol from './protocol';
export {extend} from './protocol';
import Seq from './protocols/seq';
import Next from './protocols/next';
import Seqable from './protocols/seqable';
import Indexed from './protocols/indexed';
import Counted from './protocols/counted';
import Reduce from './protocols/reduce';
import ReduceKV from './protocols/reduce-kv';
import Hierarchy from './protocols/hierarchy';
import Associative from './protocols/associative';
import Emptyable from './protocols/emptyable';
import Lookup from './protocols/lookup';
import Query from './protocols/query';
import Collection from './protocols/collection';
import Append from './protocols/append';
import Prepend from './protocols/prepend';
import Swap from './protocols/swap';
import Deref from './protocols/deref';
import Reset from './protocols/reset';
import Publish from './protocols/publish';
import Subscribe from './protocols/subscribe';
import * as el from './types/html-element';
import * as string from './types/string';
import * as array from './types/array';
export {text} from './types/html-element';
export {Reified, reify} from './types/reified';
import List from './types/list';
import LazyList from './types/lazy-list';
import Array from './types/array';
import Object from './types/object';
import Number from './types/number';
import String from './types/string';
import Set from './types/set';
import Reduced from './types/reduced';
import {EMPTY} from './types/empty';
export {observable} from './types/observable';
export {publisher} from './types/publisher';
export {toUpperCase, toLowerCase} from './types/string';
import nil from './types/nil';
import HTMLDocument from './types/html-document';
import HTMLElement from './types/html-element';
import IndexedSeq from './types/indexed-seq';
import * as coll from './coll';
import * as transducer from './transducer';
export {cycle, cat, transduce, into, transform, concat, flatten, toObject, toArray, repeatedly, repeat, range} from './coll'; //TODO concat for string different from concat for sequence
import {curry, flip, subj, multiarity, overload} from './core';
export {log, rand, curry, pipe, juxt, flip, partial, chain, reverse, identity, complement, multiarity, overload, comp, multimethod, constantly, noop, isIdentical, isOdd, isEven, is, doto, invokeWith, isSome, isNil} from './core';
export const deref     = Deref.deref;
export const swap      = flip(Swap.swap, 2);
export const reset     = flip(Reset.reset, 2);
export const publish   = flip(Publish.publish, 2);
export const subscribe = flip(Subscribe.subscribe, 2);
export const join      = flip(array.join, 2);
export const split     = flip(string.split, 2);
export const replace   = flip(string.replace, 3);
export const substring = flip(string.substring, 3);
export const startsWith = flip(string.startsWith, 2);
export const endsWith  = flip(string.endsWith, 2);
export const seq       = Seqable.seq;
export const query     = flip(Query.query, 2); //TODO queryTop
export const fetch     = flip(Query.fetch, 2);
export const get       = flip(Lookup.get, 2);
export const empty     = Emptyable.empty;
export const conj      = flip(Collection.conj, 2);
export const append    = flip(Append.append, 2);
export const prepend   = flip(Prepend.prepend, 2);
export const assoc     = flip(Associative.assoc, 3);
export const hasKey    = flip(Associative.hasKey, 2);
export const parent    = Hierarchy.parent;
export const closest   = flip(Hierarchy.closest, 2);
export const detach    = Hierarchy.detach;
export const count     = Counted.count;
export const first     = Seq.first;
export const rest      = Seq.rest;
export const next      = Next.next;
export const reduce    = flip(Reduce.reduce, 3);
export const reduceKV  = flip(ReduceKV.reduceKV, 3);
export const nth       = flip(Indexed.nth, 2);
export const arity     = curry(core.arity);
export const nullary   = arity(0);
export const unary     = arity(1);
export const update    = subj(coll.update);
export const updateIn  = subj(coll.updateIn);
export const scan      = curry(coll.scan);
export const best      = curry(coll.best)
export const min       = curry(coll.min, 2);
export const max       = curry(coll.max, 2);
export const getIn     = flip(coll.getIn);
export const eq        = curry(coll.eq, 2);
export const ne        = curry(coll.ne, 2);
export const lt        = flip(coll.lt, 2);
export const lte       = flip(coll.lte, 2);
export const gt        = flip(coll.gt, 2);
export const gte       = flip(coll.gte, 2);
export const and       = flip(coll.and, 2);
export const or        = flip(coll.or, 2);
export const tap       = curry(core.tap);
export const add       = curry(core.add);
export const subtract  = flip(core.subtract);
export const satisfies = curry(protocol.satisfies);
export const expansive = curry(coll.expansive);
export const each      = curry(coll.each);
export const map       = multiarity(transducer.map, coll.map);
export const mapIndexed= multiarity(transducer.mapIndexed, coll.mapIndexed);
export const filter    = multiarity(transducer.filter, coll.filter);
export const remove    = multiarity(transducer.remove, coll.remove);
export const find      = multiarity(transducer.find, coll.find);
export const takeWhile = multiarity(transducer.takeWhile, coll.takeWhile);
export const take      = multiarity(transducer.take, coll.take);
export const takeNth   = multiarity(transducer.takeNth, coll.takeNth);
export const drop      = multiarity(transducer.drop, coll.drop);
export const dropWhile = multiarity(transducer.dropWhile, coll.dropWhile);
export const keep      = multiarity(transducer.keep, coll.keep);
export const interpose = multiarity(transducer.interpose, coll.interpose);
export const interleave= coll.interleave;
export const dedupe    = overload(transducer.dedupe, coll.dedupe);
export const distinct  = overload(transducer.distinct, coll.distinct);
export const some      = curry(coll.some);
export const isEvery   = curry(coll.isEvery);
export const isAny     = curry(coll.isAny);
export const isNotAny  = curry(coll.isNotAny);
export const fold      = curry(coll.fold);
export const iterate   = curry(coll.iterate);
export const tag       = curry(el.tag, 2);
export const attr      = curry(el.attr);
export const css       = curry(el.css);
export const show      = css({display: "inherit"});
export const hide      = css({display: "none"});
export const hasClass  = curry(el.hasClass);
export const addClass  = curry(el.addClass);
export const setClass  = curry(el.setClass);
export const removeClass = curry(el.removeClass);
export const toggleClass = curry(el.toggleClass);
export const inc       = add(+1);
export const dec       = add(-1);
export const second    = nth(1);
export const third     = nth(2);