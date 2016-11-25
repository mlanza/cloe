import {invokeWith} from '../core';
import {each} from '../coll';
import {extend} from '../protocol';
import Publish from '../protocols/publish';
import Subscribe from '../protocols/subscribe';

const _subscriptions = Symbol("subscriptions"),
      _count = Symbol("count");

export function Publisher(subs){
  this[_subscriptions]  = subs || {};
  this[_count] = 0;
}

function subscribe(f){
  var self = this,
      id   = this[_count]++,
      subs = self[_subscriptions];
  subs[id] = f;
  return function unsubscribe(){
    delete subs[id];
  }
}

function publish(message){
  each(function(pair){
    pair[1](message);
  }, this[_subscriptions]);
}

Object.assign(Publisher.prototype, {subscribe, publish});

export function publisher(subs){
  return new Publisher(subs);
}

export default extend(Publisher, Publish, {
  publish
}, Subscribe, {
  subscribe
});