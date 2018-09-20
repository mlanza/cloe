/*
* Signals allow error handling to be handled as a separate (composable) concern rather than an integrated one.
* Signals are transducer friendly.
* When building an application from a signal graph there is a tendency to think that events are no longer relevant, that everything must be a signal, but this is inappropriate.  Both can be appropriate.  Use events when there is no reason for an initial value.
*/

import {IDeref, IEvented, IPublish, ISubscribe, ICollection, IDisposable, IReset, ISwap, IAssociative, IFunctor} from "./core/protocols";
import {doto, does, overload, identity, constantly, memoize} from "./core/core";
import {each, filtera, doall, mapa, mapIndexed} from "./core/types/lazy-seq/concrete";
import {comp, apply, partial, spread} from "./core/types/function/concrete";
import {mappedSignal} from "./core/types/mapped-signal/construct";
export {mappedSignal as map} from "./core/types/mapped-signal/construct";
import {resolve} from "./core/types/promise/concrete";
import LazyPub, {lazyPub, conduit} from "./core/types/lazy-pub";
import Publisher, {publisher} from "./core/types/publisher/construct";
import Observable, {observable} from "./core/types/observable/construct";
import {event} from "./core/types/element/concrete";
import {str} from "./core/types/string/concrete";
import {notEq, eq} from "./core/predicates";
import {implement, specify} from "./core/types/protocol";
import {value} from "./core/protocols/ivalue/concrete";
import * as t from "./transducers";
import {_ as v} from "param.macro";

function signal1(source){
  return signal2(t.map(identity), source);
}

function signal2(xf, source){
  return signal3(xf, null, source);
}

function signal3(xf, init, source){
  return conduit(observable(init), xf, source);
}

export const signal = overload(null, signal1, signal2, signal3);

function touched2(xf, source){
  const sink = conduit(publisher(), xf, source);
  function pub(self, value){
    IPublish.pub(source, value);
  }
  return doto(sink,
    specify(IPublish, {pub}));
}

function touched1(source){
  return touched2(identity, source);
}

export const touched = overload(null, touched1, touched2);

export function computed(f, source){
  const obs = observable(f());
  function callback(){
    IReset.reset(obs, f());
  }
  function pub(self, value){
    IPublish.pub(source, value);
  }
  return doto(lazyPub(obs, function(state){
    const f = state == "active" ? ISubscribe.sub : ISubscribe.unsub;
    f(source, callback);
  }),
    specify(IPublish, {pub}));
}

function fmap(source, f){
  return mappedSignal(f, source); //signal3(comp(t.map(f), t.dedupe()), f(IDeref.deref(source)), source);
}

const fmappable = implement(IFunctor, {fmap});

fmappable(LazyPub);
fmappable(Observable);
fmappable(Publisher);

export function mousemove(el){
  return signal(t.map(function(e){
    return [e.clientX, e.clientY];
  }), [], event(el, "mousemove"));
}

export function keydown(el){
  return signal(event(el, "keydown"));
}

export function keyup(el){
  return signal(event(el, "keyup"));
}

export function keypress(el){
  return signal(event(el, "keypress"));
}

export function scan(f, init, source){
  let memo = init;
  return signal(t.map(function(value){
    memo = f(memo, value);
    return memo;
  }), init, source);
}

export function pressed(el){
  return signal(t.dedupe(), [], scan(function(memo, value){
    if (value.type === "keyup") {
      memo = filtera(partial(notEq, value.key), memo);
    } else if (memo.indexOf(value.key) === -1) {
      memo = ICollection.conj(memo, value.key);
    }
    return memo;
  }, [], join(publisher(), keydown(el), keyup(el))));
}

export function hashchange(window){
  return signal(t.map(function(e){
    return location.hash;
  }), "", event(window, "hashchange"));
}

function control3(events, f, el){
  return signal(t.map(function(){
    return f(el);
  }), f(el), event(el, events));
}

function control2(events, el){
  return control3(events, value, el);
}

export const control = overload(null, null, control2, control3);
export const change = partial(control, "change");
export const input = partial(control, "input");

export function focus(el){
  return join(observable(el === document.activeElement),
    mappedSignal(constantly(true), event(el, "focus")),
    mappedSignal(constantly(false), event(el, "blur")));
}

export function join(sink, ...sources){
  const callback = IPublish.pub(sink, v);
  return lazyPub(sink, function(state){
    const f = state === "active" ? ISubscribe.sub : ISubscribe.unsub;
    each(f(v, callback), sources);
  });
}

export function calc(f, ...sources){
  return mappedSignal(spread(f), latest(sources));
}

export function latest(sources){
  const sink = observable(mapa(constantly(null), sources));
  const fs = memoize(function(idx){
    return function(value){
      ISwap.swap(sink, IAssociative.assoc(v, idx, value));
    }
  }, str);
  return lazyPub(sink, function(state){
    const f = state === "active" ? ISubscribe.sub : ISubscribe.unsub;
    doall(mapIndexed(function(idx, source){
      f(source, fs(idx));
    }, sources));
  });
}

function hist2(size, source){
  const sink = observable([]);
  let history = [];
  ISubscribe.sub(source, function(value){
    history = [...history];
    history.unshift(value);
    if (history.length > size){
      history.pop();
    }
    IPublish.pub(sink, history);
  });
  return sink;
}

export const hist = overload(null, partial(hist2, 2), hist2);

export function fromPromise(promise, init){
  const sink = observable(init || null);
  IFunctor.fmap(resolve(promise), IPublish.pub(sink, v));
  return sink;
}