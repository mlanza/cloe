import {overload} from '../../core';
import {protocolLookupError} from '../protocol-lookup-error/construct';
import {Nil} from '../nil/construct';
import {Symbol} from '../symbol/construct';

const TEMPLATE = Symbol("@protocol-template"),
      INDEX    = Symbol("@protocol-index"),
      MISSING  = Symbol("@protocol-missing");

export function Protocol(template, index){
  this[INDEX] = index;
  this[TEMPLATE] = template;
}

export function protocol(template){
  const p = new Protocol({}, {});
  p.extend(template);
  return p;
}

Protocol.prototype.extend = function(template){
  for(let method in template){
    this[method] = this.dispatch(method);
  }
  Object.assign(this[TEMPLATE], template);
}

Protocol.prototype.dispatch = function(method){
  const protocol = this;
  return function(self, ...args){
    const f = satisfies2.call(protocol, method, self);
    if (!f) {
      throw protocolLookupError(protocol, method, self, args);
    }
    return f.apply(null, [self].concat(args));
  }
}

Protocol.prototype.generate = function(){
  const index = this[INDEX];
  return function(method){
    const sym = index[method] || Symbol(method);
    index[method] = sym;
    return sym;
  }
}

function addMeta(target, key, value){
  try {
    Object.defineProperty(target, key, { //unsupported on some objects like Location
      configurable: true,
      enumerable: false,
      writable: true,
      value: value
    });
  } catch (ex) {
    target[key] = value;
  }
}

function specify1(behavior){
  const protocol = this;
  return function(target){
    specify2.call(protocol, behavior, target);
  }
}

function specify2(behavior, target){
  const keys = this.generate();
  addMeta(target, keys("__marker__"), this);
  for(let method in behavior){
    addMeta(target, keys(method), behavior[method]);
  }
}

Protocol.prototype.specify = overload(null, specify1, specify2);

function unspecify1(behavior){
  const protocol = this;
  return function(target){
    unspecify2.call(protocol, behavior, target);
  }
}

function unspecify2(behavior, target){
  const keys = this.generate();
  addMeta(target, keys("__marker__"), undefined);
  for(let method in behavior){
    addMeta(target, keys(method), undefined);
  }
}

Protocol.prototype.unspecify = overload(null, unspecify1, unspecify2);

export function implement0(){
  return implement1.call(this, {}); //marker interface
}

function implement1(behavior){
  return implement2.bind(this, behavior);
}

function implement2(behavior, target){
  let tgt = target.prototype;
  if (tgt.constructor === Object) {
    tgt = Object;
  }
  specify2.call(this, behavior, tgt);
}

Protocol.prototype.implement = overload(implement0, implement1, implement2);

function implementation1(constructor){
  const obj = {}
  for(let method in this[INDEX]){
    if (method !== "__marker__") {
      obj[method] = constructor.prototype[this[INDEX][method]];
    }
  }
  return obj;
}

function implementation2(method, constructor){
  return constructor.prototype[this[INDEX][method]];
}

Protocol.prototype.implementation = overload(null, implementation1, implementation2);

function satisfies0(){
  return this.satisfies.bind(this);
}

function satisfies1(obj){
  const target = obj == null ? new Nil() : obj,
        key    = this[INDEX]["__marker__"] || MISSING;
  return target[key] || target.constructor[key];
}

function satisfies2(method, obj){
  const target = obj == null ? new Nil() : obj,
        key    = this[INDEX][method] || MISSING;
  return target[key] || target.constructor[key] || this[TEMPLATE][method];
}

Protocol.prototype.satisfies = overload(satisfies0, satisfies1, satisfies2);