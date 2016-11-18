import unbind from './unbind';
import Reduced from './types/reduced';
import Deref from './protocols/deref';

export const log = console.log.bind(console);
export const slice = unbind(Array.prototype.slice);
export const assign  = Object.assign;

export function reverse(xs){
  return slice(xs).reverse();
}

export function reduce(xs, xf, init){
  var memo = init, len = xs.length;
  for(var i = 0; i < len; i++){
    if (memo instanceof Reduced)
      break;
    memo = xf(memo, xs[i]);
  }
  return Deref.deref(memo);
}

export function each(xs, f){
  var len = xs.length;
  for(var i = 0; i < len; i++){
    f(xs[i]);
  }
}

export function identity(value){
  return value;
}

export function initial(self){
  return slice(self, 0, self.length - 1);
}

export function partial(f){
  var applied = slice(arguments, 1);
  return function(){
    return f.apply(this, applied.concat(arguments));
  }
}

export function curry(f, len, applied){
  return len ? function(){
    //every call to a curried function advances by at least one argument (see `undefined`).
    var args = (applied || []).concat(arguments.length === 0 ? [undefined] : slice(arguments));
    if (args.length >= len) {
      return f.apply(this, args);
    } else {
      return curry(f, len, args);
    }
  } : curry(f, f.length);
}

export function complement(f){
  return function(){
    return !f.apply(this, arguments);
  }
}

function arities(lkp, fallback){
  return assign(function(){
    var f = lkp[arguments.length] || fallback;
    return f.apply(this, arguments);
  }, lkp);
}

export function multiarity(){
  return arities(reduce(arguments, function(memo, f){
    memo[f.length] = f;
    return memo;
  }, {}));
}

export function overload(){
  return arities(arguments, arguments[arguments.length - 1]);
}

export function arity(len, f){
  return function(){
    return f.apply(this, slice(arguments, 0, len));
  }
}

export function flip(f, len){
  var l = len || f.length;
  return curry(arity(l, function(){
    var size = arguments.length,
        last = arguments[size - 1],
        tail = slice(arguments, 0, size - 1),
        args = [last].concat(tail);
    return f.apply(this, args);
  }), l);
}

export function chain(init){
  return reduce(slice(arguments, 1), function(value, f){
    return f(value);
  }, init);
}

export function pipe(){
  var fs = slice(arguments);
  return function(init){
    return reduce(fs, function(value, f){
      return f(value);
    }, init);
  }
}

export function compose(){
  return pipe.apply(this, chain(arguments, slice, reverse));
}

export function multimethod(dispatch){
  return function(){
    var f = dispatch.apply(this, arguments);
    return f.apply(this, arguments);
  }
}

function route(get, fallback, value){
  var f = get(value == null ? null : value.constructor);
  return f ? f : value != null && value.__proto__.constructor !== Object ? dispatch(get, fallback, value.__proto__) : fallback;
}

export function method(fallback){
  var map = new Map(),
      set = map.set.bind(map),
      get = partial(route, map.get.bind(map), fallback);
  return Object.assign(multimethod(get), {get, set});
}

export function constantly(value){
  return function(){
    return value;
  }
}

export function noop(){
}

export function add(a, b){
  return a + b;
}

export function subtract(a, b){
  return a - b;
}

export function identical(a, b){
  return a === b;
}

export function eq(a, b){
  return a == b;
}

export function ne(a, b){
  return a != b;
}

export function gt(a, b){
  return a > b;
}

export function gte(a, b){
  return a >= b;
}

export function lt(a, b){
  return a < b;
}

export function lte(a, b){
  return a <= b;
}

export function isSome(x){
  return x != null;
}

export function isNil(value){
  return null == value;
}

export function tap(f, value){
  f(value);
  return value;
}

export function odd(n){
  return n % 2;
}

export const even = complement(odd);

export function is(value, constructor) {
  return value != null && value.constructor === constructor;
}

export function juxt(){
  var fs = slice(arguments);
  return function(){
    var self = this,
        args = slice(arguments);
    return reduce(fs, function(memo, f){
      return memo.concat([f.apply(self, args)]);
    }, []);
  }
}

export function doto(){
  var f = juxt.apply(this, arguments);
  return function(value){
    f(value);
  }
}

export function invokeWith(){
  var args = arguments;
  return function(self){
    return self.apply(this, args);
  }
}