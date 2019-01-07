import {does, implement, IEmptyableCollection, ICoerce, INext, ISeq, ISeqable, IMap, IAssociative, ILookup, ICounted, IInclusive} from 'cloe/core';
import * as _ from 'cloe/core';

function toArray(self){
  return ICoerce.toArray(next2(self, 0));
}

function count(self){
  return self.node.attributes.length;
}

function lookup(self, key){
  return self.node.getAttribute(key);
}

function assoc(self, key, value){
  self.node.setAttribute(key, value);
  return self;
}

function dissoc(self, key){
  self.node.removeAttribute(key);
  return self;
}

function seq(self) {
  return count(self) ? self : null;
}

function first(self){
  return count(self) ? [self.node.attributes[0].name, self.node.attributes[0].value] : null;
}

function rest(self) {
  return next(self) || _.emptyList();
}

function next2(self, idx) {
  return idx < count(self) ? _.lazySeq([self.node.attributes[idx].name, self.node.attributes[idx].value], function(){
    return next2(self, idx + 1);
  }) : null;
}

function next(self){
  return next2(self, 1);
}

function keys(self){
  return _.map(_.first, next2(self, 0));
}

function vals(self){
  return _.map(_.second, next2(self, 0));
}

function contains(self, key){
  return self.node.hasAttribute(key);
}

function includes(self, pair) {
  return lookup(self, _.key(pair)) == _.val(pair);
}

function empty(self){
  while(self.node.attributes.length > 0) {
    self.node.removeAttribute(self.node.attributes[0].name);
  }
  return self;
}

export default does(
  implement(IEmptyableCollection, {empty}),
  implement(ICoerce, {toArray}),
  implement(ICounted, {count}),
  implement(ISeqable, {seq}),
  implement(INext, {next}),
  implement(ISeq, {first, rest}),
  implement(IMap, {keys, vals, dissoc}),
  implement(IInclusive, {includes}),
  implement(IAssociative, {assoc, contains}),
  implement(ILookup, {lookup}));