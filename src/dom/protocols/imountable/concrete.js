import {specify, satisfies, each, parent as _parent} from 'atomic/core';
import {trigger} from "atomic/reactives";
import {IMountable} from "./instance";

export const isMountable = satisfies(IMountable, ?);

export function mounts(self){
  specify(IMountable, {}, self);

  const parent = _parent(self);

  if (parent) {
    each(function(key){
      trigger(self, key, {bubbles: true, detail: {parent}});
    }, ["mounting", "mounted"]); //ensure hooks trigger even if already mounted
  }

  return self;
}