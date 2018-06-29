import {overload, identity, obj} from "./core/core";
import {classes, isEmpty, duration, compact, remove, flatten, map, fragment, element, sort, set, flip, realized, comp, isNumber, observable, detect} from "./core/types";
import {IAppendable, IHash, ITemplate, IMiddleware, IDispatch, IYank, IArray, IAssociative, IBounds, IConverse, ICloneable, ICollection, IComparable, IContent, ICounted, IDecode, IDeref, IDisposable, IEmptyableCollection, IEncode, IEquiv, IEvented, IFind, IFn, IFold, IFunctor, IHideable, IHierarchy, IHtml, IInclusive, IIndexed, IInsertable, IKVReduce, ILookup, IMap, IMapEntry, IMatch, INext, IObject, IOtherwise, IPrependable, IPublish, IReduce, IReset, IReversible, ISeq, ISeqable, ISet, ISteppable, ISubscribe, ISwap, IText, IView} from "./core/protocols";
import {unless, fmap, fork, hash, reducing} from "./core/api";
import * as T from "./core/types";
import {_ as v} from "param.macro";

export * from "./core/core";
export * from "./core/types";
export * from "./core/protocols";
export * from "./core/api";
export * from "./core/multimethods";

export const fill = flip(ITemplate.fill);
export const render = IView.render;
export const patch = IView.patch;
export const init = IView.init;
export const commands = IView.commands;
export const events = IView.events;
export const dispatch = IDispatch.dispatch;
export const handle = IMiddleware.handle;
export const text = IText.text;
export const html = IHtml.html;
export const show = IHideable.show;
export const hide = IHideable.hide;
export const toggle = IHideable.toggle;
export const matches = IMatch.matches;
export const yank = IYank.yank;
export const before = IInsertable.before;
export const after = IInsertable.after;
export const start = IBounds.start;
export const end = IBounds.end;
export const pub = IPublish.pub;
export const sub = ISubscribe.sub;
export const deref = IDeref.deref;
export const reverse = IReversible.reverse;
export const clone = ICloneable.clone;
export const dispose = IDisposable.dispose;
export const empty = IEmptyableCollection.empty;
export const equiv = IEquiv.equiv;
export const conj = overload(null, identity, ICollection.conj, reducing(ICollection.conj));
export const toObject = IObject.toObject;
export const reset = IReset.reset;
export const on = IEvented.on;
export const off = IEvented.off;
export const find = IFind.find;
export const invoke = IFn.invoke;
export const parent = IHierarchy.parent;
export const parents = IHierarchy.parents;
export const closest = IHierarchy.closest;
export const ancestors = IHierarchy.parents;
export const children = IHierarchy.children;
export const descendants = IHierarchy.descendants;
export const nextSibling = IHierarchy.nextSibling;
export const prevSibling = IHierarchy.prevSibling;
export const nextSiblings = IHierarchy.nextSiblings;
export const prevSiblings = IHierarchy.prevSiblings;
export const siblings = IHierarchy.siblings;
export const toArray = IArray.toArray;
export const contains = IAssociative.contains;
export const append = overload(null, identity, IAppendable.append, reducing(IAppendable.append));
export const prepend = overload(null, identity, IPrependable.prepend, reducing(IPrependable.prepend));
export const step = ISteppable.step;
export const converse = IConverse.converse;
export const includes = IInclusive.includes;
export const nth = IIndexed.nth;
export const keys = IMap.keys;
export const vals = IMap.vals;
export const key = IMapEntry.key;
export const val = IMapEntry.val;
export const seq = ISeqable.seq;
export const first = ISeq.first;
export const rest = ISeq.rest;
export const count = ICounted.count;
export const next = INext.next;
export const superset = ISet.superset;
export const disj = ISet.disj;
export const union = overload(set, identity, ISet.union, reducing(ISet.union));
export const intersection = overload(null, null, ISet.intersection, reducing(ISet.intersection));
export const difference = overload(null, null, ISet.difference, reducing(ISet.difference));

export function subset(subset, superset){
  return ISet.superset(superset, subset);
}

function add2(self, n){
  return ISteppable.step(n, self);
}

export const add = overload(null, null, add2, reducing(add2));

function subtract2(self, n){
  return ISteppable.step(IConverse.converse(n), self);
}

export const subtract = overload(null, null, subtract2, reducing(subtract2));

function dissocN(obj, ...keys){
  return IReduce.reduce(keys, IMap.dissoc, obj);
}

export const dissoc = overload(null, identity, IMap.dissoc, dissocN);

export const appendTo  = realized(flip(IAppendable.append));
export const prependTo = realized(flip(IPrependable.prepend));
export const transpose = fork(IInclusive.includes, IYank.yank, ICollection.conj);

function include3(self, value, want){
  const has = IInclusive.includes(self, value);
  const f = want ? has ? identity : ICollection.conj : IYank.yank;
  return f(self, value);
}

function include2(self, value){
  return include3(self, value, true);
}

export const include = overload(null, null, include2, include3);

export function addClass(self, name){
  ICollection.conj(classes(self), name);
  return self;
}

export function removeClass(self, name){
  IYank.yank(classes(self), name);
  return self;
}

function toggleClass2(self, name){
  transpose(classes(self), name);
  return self;
}

function toggleClass3(self, name, want){
  include3(classes(self), name, want);
  return self;
}

export const toggleClass = overload(null, null, toggleClass2, toggleClass3);

function memoize1(f){
  return memoize2(f, function(...args){
    return hash(args);
  });
}

function memoize2(f, hash){
  const cache = {};
  return function(...args){
    const key = hash(...args);
    if (cache.hasOwnProperty(key)) {
      return cache[key];
    } else {
      const result = f(...args);
      cache[key] = result;
      return result;
    }
  }
}

export function expansive(f){
  function expand(...xs){
    const contents = IArray.toArray(compact(flatten(xs)));
    return detect(function(content){
      return typeof content === "function";
    }, contents) ? step(contents) : f(...contents);
  }
  function step(contents){
    return function(value){
      const resolve = typeof value === "function" ? partial(comp, value) : function(f){
        return f(value);
      }
      return expand(...map(function(content){
        return typeof content === "function" ? resolve(content) : content;
      }, contents));
    }
  }
  return expand;
}

export const memoize = overload(null, memoize1, memoize2);
export const tag = obj(expansive(element), Infinity);
export const frag = expansive(fragment);

function tagged(f, keys){
  return IReduce.reduce(keys, function(memo, key){
    memo[key] = f(key);
    return memo;
  }, {});
}

export function tags(...names){
  return tagged(tag, names);
}

export function elapsed(self){
  return duration(end(self) - start(self));
}

export function leaves(self){
  return remove(comp(ICounted.count, IHierarchy.children), IHierarchy.descendants(self));
}

export function envelop(before, after){
  return unless(isEmpty, comp(prepend(v, before), append(v, after)));
}

/*

function checkStatus(resp){
  return resp.ok ? Promise.resolve(resp) : Promise.reject(resp);
}

export const request = _.chain(_.request,
  _.prepend(function(params){
    return Object.assign({
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Accept": "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose"
      }
    }, params);
  }),
  _.append(checkStatus),
  _.append(function(resp){
    return resp.json();
  }),
  _.append(_.getIn(["d", "results"])));
*/
