import {effect, overload, constantly, identity} from '../../core';
import {implement} from '../protocol';
import {IMiddleware, ILookup} from '../../protocols';

function handle(self, command, next){
  const type = ILookup.lookup(command, "type");
  const handler = ILookup.lookup(self.handlers, type) || self.fallback;
  IMiddleware.handle(handler, command, next);
}

export default effect(
  implement(IMiddleware, {handle}));