import {implement, does, apply, IPath, IReset, ISwap, IDeref, IDisposable, ICounted} from 'atomic/core';
import {IPublish, ISubscribe, IDispatch} from "../../protocols";
import {sub as _sub, unsub as _unsub} from "../../protocols/concrete";
import * as _ from "atomic/core";

function path(self){
  return self.path;
}

function deref(self){
  return _.getIn(_.deref(self.source), self.path);
}

function reset(self, value){
  _.swap(self.source, function(state){
    return _.assocIn(state, self.path, value);
  });
}

function swap(self, f){
  _.swap(self.source, function(state){
    return _.updateIn(state, self.path, f);
  });
}

function sub(self, observer){
  function observe(state){
    IPublish.pub(observer, _.getIn(state, self.path));
  }
  self.callbacks.set(observer, observe);
  _sub(self.source, observe);
}

function unsub(self, observer){
  const observe = self.callbacks.get(observer);
  _unsub(self.source, observe);
  observe && self.callbacks.delete(observer);
}

function subscribed(self){
  return ICounted.count(self.callbacks);
}

function dispatch(self, command){
  IDispatch.dispatch(self.source, _.update(command, "path", function(path){
    return apply(_.conj, self.path, path || []);
  }));
}

export const behaveAsCursor = does(
  //implement(IDisposable, {dispose}), TODO
  implement(IPath, {path}),
  implement(IDispatch, {dispatch}),
  implement(IDeref, {deref}),
  implement(ISubscribe, {sub, unsub, subscribed}),
  implement(IPublish, {pub: reset}),
  implement(IReset, {reset}),
  implement(ISwap, {swap}));