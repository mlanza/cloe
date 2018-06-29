import {effect, overload, constantly, identity} from '../../core';
import {implement} from '../protocol';
import {IEncode, IAssociative} from '../../protocols';
import Symbol from '../symbol/construct';

function encode(self, label){
  return IAssociative.assoc({data: Object.assign({}, self)}, label, self[Symbol.toStringTag]);
}

export default effect(
  implement(IEncode, {encode}));