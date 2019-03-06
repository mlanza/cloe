import {constantly, identity, apply, noop, slice, partial, replace, concat, template, key, val, join, merge, filter, map, remove, isObject, specify, implement, doto, assoc, get, str, includes, overload, conj, append, absorb, fmap, each, obj, IReduce, first, query, locate, descendants, matches, reducekv, Number, String, Nil, ICoerce, extend} from "cloe/core";
import * as _ from "cloe/core";
import {element} from "./types/element/construct";
import {mounts} from "./protocols/imountable/concrete";
import InvalidHostElementError from "./types/invalid-host-element-error";
import IValue from "./protocols/ivalue/instance";
import IEmbeddable from "./protocols/iembeddable/instance";
import Promise from "promise";
import {_ as v} from "param.macro";
import * as $ from "cloe/reactives";
export * from "./types";
export * from "./protocols";
export * from "./protocols/concrete";

function prop3(self, key, value){
  self[key] = value;
  return self;
}

function prop2(self, key){
  return self[key];
}

export const prop = overload(null, null, prop2, prop3);

export function addStyle(self, key, value) {
  self.style[key] = value;
  return self;
}

function removeStyle2(self, key) {
  self.style.removeProperty(key);
  return self;
}

function removeStyle3(self, key, value) {
  if (self.style[key] === value) {
    self.style.removeProperty(key);
  }
  return self;
}

export const removeStyle = overload(null, null, removeStyle2, removeStyle3);

export function addClass(self, name){
  self.classList.add(name);
  return self;
}

export function removeClass(self, name){
  self.classList.remove(name);
  return self;
}

function toggleClass2(self, name){
  return toggleClass3(self, name, !self.classList.contains(name));
}

function toggleClass3(self, name, want){
  self.classList[want ? "add" : "remove"](name);
  return self;
}

export const toggleClass = overload(null, null, toggleClass2, toggleClass3);

export function hasClass(self, name){
  return self.classList.contains(name);
}

export function assert(el, selector){
  if (!matches(el, selector)) {
    throw new InvalidHostElementError(el, selector);
  }
}

function mount3(render, config, el){
  return mount4(constantly(null), render, config, el);
}

function mount4(create, render, config, el){
  config.what && $.trigger(el, config.what + ":installing", {bubbles: true, detail: {config}});
  $.trigger(el, "installing", {bubbles: true, detail: {config}});

  const bus = create(config),
        detail = {config, bus};

  doto(el,
    $.on(v, "mounting mounted", function(e){
      Object.assign(e.detail, detail);
    }),
    render(v, config, bus),
    mounts);

  config.what && $.trigger(el, config.what + ":installed", {bubbles: true, detail});
  $.trigger(el, "installed", {bubbles: true, detail});
  return bus;
}

export const mount = overload(null, null, null, mount3, mount4);

export const markup = obj(function(name, ...contents){
  const attrs = map(function(entry){
    return template("{0}=\"{1}\"", key(entry), replace(val(entry), /"/g, '&quot;'));
  }, apply(merge, filter(isObject, contents)));
  const content = map(str, remove(isObject, contents));
  return join("", concat(["<" + name + " " + join(" ", attrs) + ">"], content, "</" + name + ">"));
}, Infinity);

export function tag(){
  return apply(partial, element, slice(arguments));
}

function sel2(selector, context){
  return query(context, context.querySelectorAll ? selector : matches(v, selector));
}

function sel1(selector){
  return sel2(selector, document);
}

function sel0(){
  return descendants(document);
}

export const sel = overload(sel0, sel1, sel2);

function sel12(selector, context){
  return locate(context, selector);
}

function sel11(selector){
  return sel12(selector, document);
}

function sel10(){
  return first(descendants(document));
}

export const sel1 = overload(sel10, sel11, sel12);

export function checkbox(...args){
  const checkbox = tag('input', {type: "checkbox"});
  function value1(el){
    return el.checked;
  }
  function value2(el, checked){
    el.checked = checked;
  }
  var value = overload(null, value1, value2);
  return doto(checkbox(...args),
    specify(IValue, {value: value}));
}

export function select(options, ...args){
  const select = tag('select'),
        option = tag('option');
  return reducekv(function(memo, key, value){
    return append(memo, option({value: key}, value));
  }, select(...args), options);
}

export const textbox = tag('input', {type: "text"});

function attr3(self, key, value) {
  self.setAttribute(key, value);
  return self;
}

function attr2(self, key) {
  return self.getAttribute(key);
}

export const attr = overload(null, null, attr2, attr3);

extend(ICoerce, {toFragment: null});

export const toFragment = ICoerce.toFragment;

(function(){

  function embed(self, parent, nextSibling) {
    IEmbeddable.embed(document.createTextNode(self), parent, nextSibling);
  }

  function toFragment(self){
    return document.createRange().createContextualFragment(self);
  }

  doto(String,
    implement(ICoerce, {toFragment}),
    implement(IEmbeddable, {embed}));

})();

(function(){

  function embed(self, parent, nextSibling) {
    IEmbeddable.embed(document.createTextNode(str(self)), parent, nextSibling);
  }

  doto(Number, implement(IEmbeddable, {embed}));

})();

(function(){

  function embed(self, parent) {
    each(function(entry){
      assoc(parent, key(entry), val(entry));
    }, self);
  }

  doto(Object, implement(IEmbeddable, {embed}));

})();

(function(){

  function toFragment(_){
    return document.createRange().createContextualFragment("");
  }

  doto(Nil,
    implement(ICoerce, {toFragment}),
    implement(IEmbeddable, {embed: identity}));

})();