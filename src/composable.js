import * as core from './core';
import * as protocol from './protocol';
import Collection from './protocols/collection';
import Seq from './protocols/seq';
import Next from './protocols/next';
import Seqable from './protocols/seqable';
import Indexed from './protocols/indexed';
import Counted from './protocols/counted';
import Reduce from './protocols/reduce';
import Hierarchy from './protocols/hierarchy';
import Associative from './protocols/associative';
import Emptyable from './protocols/emptyable';
import Lookup from './protocols/lookup';
import Query from './protocols/query';
import * as el from './types/html-element';
import * as string from './types/string';
import * as array from './types/array';
export {text} from './types/html-element';
import LazyList from './types/lazy-list';
import List from './types/list';
import Array from './types/array';
import Object from './types/object';
import Number from './types/number';
import String from './types/string';
import Reduced from './types/reduced';
import {EMPTY} from './types/empty';
import nil from './types/null';
import HTMLDocument from './types/html-document';
import HTMLElement from './types/html-element';
import IndexedSeq from './types/indexed-seq';
import * as coll from './coll';
export {concat, toObject, toArray} from './coll';
import {curry, flip} from './core';
export {log, curry, pipe, juxt, flip, partial, chain, reverse, identity, complement, multiarity, overload, compose, multimethod, constantly, noop, identical, odd, even, is, doto, invokeWith, isSome, isNull} from './core';
export const join      = flip(array.join, 2);
export const split     = flip(string.split, 2);
export const replace   = flip(string.replace, 3);
export const substring = flip(string.substring, 3);
export const startsWith = flip(string.startsWith, 2);
export const endsWith  = flip(string.endsWith, 2);
export const seq       = Seqable.seq;
export const query     = flip(Query.query,2); //TODO queryTop
export const fetch     = flip(Query.fetch,2);
export const get       = flip(Lookup.get, 2);
export const empty     = Emptyable.empty;
export const conj      = flip(Collection.conj, 2);
export const cons      = flip(Collection.cons, 2);
export const assoc     = flip(Associative.assoc, 3);
export const hasKey    = flip(Associative.hasKey, 2);
export const parent    = Hierarchy.parent;
export const closest   = flip(Hierarchy.closest, 2);
export const remove    = Hierarchy.remove;
export const count     = Counted.count;
export const first     = Seq.first;
export const rest      = Seq.rest;
export const next      = Next.next;
export const reduce    = flip(Reduce.reduce, 3);
export const nth       = flip(Indexed.nth, 2);
export const arity     = curry(core.arity);
export const nullary   = arity(0);
export const unary     = arity(1);
export const eq        = curry(core.eq);
export const ne        = curry(core.ne);
export const lt        = flip(core.lt);
export const lte       = flip(core.lte);
export const gt        = flip(core.gt);
export const gte       = flip(core.gte);
export const tap       = curry(core.tap);
export const add       = curry(core.add);
export const subtract  = flip(core.subtract);
export const satisfies = curry(protocol.satisfies);
export const each      = curry(coll.each);
export const map       = curry(coll.map);
export const filter    = curry(coll.filter);
export const reject    = curry(coll.reject);
export const find      = curry(coll.find);
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