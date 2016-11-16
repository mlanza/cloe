import {extend} from '../protocol.js';
import protocol from '../protocol.js';
import {chain} from '../core/function.js';
import * as object from '../core/object.js';
import * as array  from '../core/array.js';
import * as string from '../core/string.js';
import * as dom    from '../core/dom.js';

function fail(){
  throw "fail";
}

const Assoc = chain(
  protocol({
    assoc: function(self, key, value){
      return self instanceof HTMLElement ? dom.assoc(self, key, value) : fail();
    },
    hasKey: null
  }),
  extend(String, string), 
  extend(Array, array), 
  extend(Object, object));

export default Assoc;
export const assoc  = Assoc.assoc;
export const hasKey = Assoc.hasKey;