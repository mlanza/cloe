import {identity, constantly, effect, overload} from '../../core';
import {implement, surrogates} from '../protocol';
import {isAssociative, isSequential, IYank, IInclusive, IArray, IAppendable, IPrependable, IEvented, IAssociative, IMap, IEquiv, ICloneable, ICollection, INext, ISeq, IShow, ISeqable, IIndexed, ICounted, ILookup, IReduce, IEmptyableCollection, IHierarchy, IContent} from '../../protocols';
import {each} from '../lazyseq/concrete';
import EmptyList from '../emptylist/construct';
import {lazySeq} from '../lazyseq/construct';
import {mapa, detect, compact, distinct} from '../lazyseq/concrete';
import {maybe} from '../pipeline/concrete';
import {isString} from '../string/construct';
import {isFunction} from '../function/construct';
import {reduced} from '../reduced/construct';
import {trim, split, str} from '../string/concrete';
import Element, {isElement} from './construct';

function isAttrs(self){
  return !isElement(self) && isAssociative(self);
}

function fromNestedAttrs(text){
  return text == null ? {} : IReduce.reduce(mapa(function(text){
    return mapa(trim, split(text, ":"));
  }, compact(split(text, ";"))), function(memo, pair){
    return ICollection.conj(memo, pair);
  }, {});
}

function toNestedAttrs(obj){
  return obj == null || !isAttrs(obj) ? mapa(function([key, value]){
    return str(key, ": ", value, ";");
  }, ISeqable.seq(obj)).join(" ") : null;
}

function fromSpaceSeparated(text){
  return text == null ? [] : mapa(trim, compact(split(text, " ")));
}

function toSpaceSeparated(xs){
  return xs == null || !isSequential(xs) ? null : IArray.toArray(distinct(xs)).join(" ");
}

const readers = {
  class: fromSpaceSeparated,
  style: fromNestedAttrs
}

const writers = {
  class: toSpaceSeparated,
  style: toNestedAttrs
}

function on(self, key, callback){
  self.addEventListener(key, callback);
  return function(){
    off(self, key, callback);
  }
}

function off(self, key, callback){
  self.removeEventListener(key, callback);
}

function contents(self){
  return ISeqable.seq(self.childNodes);
}

function conj(self, other){
  if (isFunction(other)){
    return conj(self, other());
  } else if (isAttrs(other)){
    each(function([key, value]){
      assoc(self, key, value);
    }, other);
  } else {
    self.appendChild(isString(other) ? document.createTextNode(other) : other);
  }
  return self;
}

function prepend(self, other){
  if (isAttrs(other)){
    each(function([key, value]){
      assoc(self, key, value);
    }, other);
  } else {
    self.prepend(isString(other) ? document.createTextNode(other) : other);
  }
  return self;
}

function lookup(self, key){
  const reader = readers[key] || identity;
  return reader(self.getAttribute(key));
}

function assoc(self, key, value){
  const writer = writers[key] || identity;
  self.setAttribute(key, writer(value));
  return self;
}

function dissoc(self, key){
  self.removeAttribute(key);
  return self;
}

function keys2(self, idx){
  return idx < self.attributes.length ? lazySeq(self.attributes[idx].name, function(){
    return keys2(self, idx + 1);
  }) : EmptyList.EMPTY;
}

function keys(self){
  return keys2(self, 0);
}

function vals2(self, idx){
  return idx < self.attributes.length ? lazySeq(self.attributes[idx].value, function(){
    return keys2(self, idx + 1);
  }) : EmptyList.EMPTY;
}

function vals(self){
  return vals2(self, 0);
}

function contains(self, key){
  return self.hasAttribute(key);
}

function parent(self){
  return self.parentNode;
}

function children(self){
  return ISeqable.seq(self.children);
}

function nextSibling(self){
  return self.nextElementSibling;
}

function prevSibling(self){
  return self.prevElementSibling;
}

function yank1(self){ //no jokes, please!
  return yank2(parent(self), self);
}

function yank2(self, node){
  if (isSequential(node)) {
    const keys = node;
    each(self.removeAttribute.bind(self), keys);
  } else if (isAttrs(node)) {
    const attrs = node;
    each(function([key, value]){
      lookup(self, key) == value && dissoc(self, key);
    }, attrs);
  } else if (isString(node)) {
    node = includes(self, node);
  }
  self.removeChild(node);
  return self;
}

export const yank = overload(null, yank1, yank2);

function includes(self, target){
  if (isSequential(target)){
    const keys = target;
    return IReduce.reduce(keys, function(memo, key){
      return memo ? self.hasAttribute(key) : reduced(memo);
    }, true)
  } else if (isAttrs(target)) {
    return IKVReduce.reducekv(target, function(memo, key, value){
      return memo ? lookup(self, key) == value : reduced(memo);
    }, true);
  }
  return detect(isString(target) ? function(node){
    return node.nodeType === Node.TEXT_NODE && node.data === target;
  } : function(node){
    return node === target;
  }, contents(self));
}

function empty(self){
  each(self.removeChild.bind(self), contents(self));
  return self;
}

function clone(self){
  return self.cloneNode(true);
}

export default effect(
  implement(IEmptyableCollection, {empty}),
  implement(IInclusive, {includes}),
  implement(IYank, {yank}),
  implement(ICloneable, {clone}),
  implement(IAppendable, {append: conj}),
  implement(IPrependable, {prepend}),
  implement(ICollection, {conj}),
  implement(IEvented, {on, off}),
  implement(ILookup, {lookup}),
  implement(IContent, {contents}),
  implement(IHierarchy, {parent, children, nextSibling, prevSibling}),
  implement(IMap, {dissoc, keys, vals}),
  implement(IAssociative, {assoc, contains}));