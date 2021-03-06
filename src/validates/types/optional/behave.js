import {implement, get, blank, does, IAppendable} from 'atomic/core';
import {ICheckable, IScope} from '../../protocols';
import {issue, issues} from '../issue';
import {and} from '../and/construct';
import {optional} from './construct';

function check(self, obj){
  const found = get(obj, self.key);
  if (blank(found)) {
    return null;
  } else {
    return issues(ICheckable.check(self.constraint, found), IScope.scope(?, self.key));
  }
}

function append(self, constraint){
  return optional(self.key, and(self.constraint, constraint));
}

export const behaveAsOptional = does(
  implement(IAppendable, {append}),
  implement(ICheckable, {check}));