import {log, overload, identity} from "./core";
import {isNil, isBlank, reduced, partial, stepped} from "./types";
import {transduce} from "./sequences";
import {map} from "./transducers";

export function either(f){
  return function(...args){
    try {
    return f(...args);
    } catch (ex) {
    return reduced(ex);
    }
  }
}

export function option(f){
  return function(x, ...args){
    return isNil(x) || isBlank(x) ? reduced(null) : apply(f, x, args);
  }
}

export function future(f){
  return overload(null, function(x){
    return Promise.resolve(x).then(f);
  }, function(...args){
    return Promise.resolve(f(...args));
  });
}

export function logged(f){
  return function(...args){
    var result = f(...args);
    log({f, args, result});
    return result;
  }
}

function chainedN(how, init, ...fs){
  return transduce(map(how), stepped, init, fs);
}

export const chained = overload(null, function(how){
  return partial(chainedN, how);
}, chainedN);

function pipedN(how, f, ...fs){
  return function(...args){
    return chainedN(how, f(...args), ...fs);
  }
}

export const piped = overload(null, function(how){
  return partial(pipedN, how);
}, pipedN);

export const chain  = chained(identity);
export const maybe  = chained(option);
export const pipe   = piped(identity);
export const opt    = piped(option);
export const prom   = piped(future);
export const handle = piped(either);