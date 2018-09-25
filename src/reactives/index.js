import {
  IDeref,
  ICollection,
  IDisposable,
  IReset,
  ISwap,
  IAssociative,
  IFunctor,
  Function,
  doto,
  does,
  overload,
  apply,
  identity,
  constantly,
  memoize,
  each,
  filtera,
  doall,
  mapa,
  mapIndexed,
  comp,
  partial,
  spread,
  str,
  notEq,
  implement,
  specify,
  value,
  slice
} from "cloe/core";
import {on, off} from "./protocols/concrete";
import {IDispatch, IPublish, ISubscribe} from "./protocols";
import LazyPub from "./types/lazy-pub/construct";
import Observable from "./types/observable/construct";
import Publisher from "./types/publisher/construct";
import {
  mapped,
  conduit,
  lazyPub,
  observable,
  publisher
} from "./types";
import * as t from "cloe/transducers";
export * from "./types";
export * from "./protocols";
export * from "./protocols/concrete";
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
  return mapped(f, source); //signal3(comp(t.map(f), t.dedupe()), f(IDeref.deref(source)), source);
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
    mapped(constantly(true), event(el, "focus")),
    mapped(constantly(false), event(el, "blur")));
}

export function join(sink, ...sources){
  const callback = IPublish.pub(sink, v);
  return lazyPub(sink, function(state){
    const f = state === "active" ? ISubscribe.sub : ISubscribe.unsub;
    each(f(v, callback), sources);
  });
}

export function calc(f, ...sources){
  return mapped(spread(f), latest(sources));
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
    history = slice(history);
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
  IFunctor.fmap(promise, IPublish.pub(sink, v));
  return sink;
}

function event2(el, key){
  const sink = publisher(), callback = partial(IPublish.pub, sink);
  return lazyPub(sink, function(state){
    const f = state === "active" ? on : off;
    f(el, key, callback);
  });
}

function event3(el, key, selector){
  const sink = publisher(), callback = partial(IPublish.pub, sink);
  return lazyPub(sink, function(state){
    if (state === "active") {
      on(el, key, selector, callback);
    } else {
      off(el, key, callback);
    }
  });
}

export const event = overload(null, null, event2, event3);

export function click(el){
  return event(el, "click");
}

function mutate3(self, state, f){
  ISubscribe.sub(state, partial(f, self));
  return self;
}

function mutate2(state, f){
  return mutate3(v, state, f);
}

export const mutate = overload(null, null, mutate2, mutate3);

(function(){

  function dispatch(self, args){
    return apply(self, args);
  }

  doto(Function,
    implement(IDispatch, {dispatch}));

})();