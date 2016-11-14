import {log, chain, pipe, add} from './core';
import {eq} from './curried';
import {seq} from './protocols/seq';
import {trim} from './protocols/trim';
import {reduce, filter, toArray, toObject} from './protocols/coll';
import {get, set} from './protocols/hash';
import * as cons   from './cons';
import * as string from './string';
import * as object from './object';
import * as array  from './array';
export {transduce, into, take, map, filter, transform} from './transduce';
export {compose} from './core';

//TODO create a Pair constructor for kvps in an array?  better implement IMapEntry a thing with a key and a val.

QUnit.test("big ball of mud", function(assert){
  assert.ok(chain(" Mary Crawley ", trim) == "Mary Crawley");
  assert.ok(chain([1,2,3], reduce(add, 0), eq(6)));
  assert.deepEqual(chain({}, set("Larry", "Howard"), set("Moe", "Howard")), {"Larry": "Howard", "Moe": "Howard"});
  assert.deepEqual(chain({Moe: "Howard"}, toArray, toObject), {Moe: "Howard"});
  assert.deepEqual(chain({Moe: "Howard", Curly: "Howard", Larry: "Fine"}, filter(pipe(get(1), eq("Howard")))), {Moe: "Howard", Curly: "Howard"});
  assert.deepEqual(chain(["Ace", "King", "Queen"], set(0, "Jack")), ["Jack", "King", "Queen"]);
});