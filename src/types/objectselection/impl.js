import ObjectSelection from '../../types/objectselection';
import IndexedSeq from '../../types/indexedseq';
import ICollection from '../../protocols/icollection';
import INext from '../../protocols/inext';
import ISeq from '../../protocols/iseq';
import ISeqable from '../../protocols/iseqable';
import IIndexed from '../../protocols/iindexed';
import IShow from '../../protocols/ishow';
import ICounted from '../../protocols/icounted';
import {show} from '../../protocols/ishow';
import {first, rest, toArray} from '../../protocols/iseq';
import {seq} from '../../protocols/iseqable';
import {objectSelection} from '../../types/objectselection';
import {identity, constantly} from '../../core';
import {indexedSeq} from '../../types/indexedseq';
import {lazySeq} from '../../types/lazyseq';
import {toArraySeq} from "../../common";
import {extendType} from '../../protocol';

extendType(ObjectSelection, ISeq, {
  first: function(self){
    var key = first(self.keys);
    return [key, self.obj[key]];
  },
  rest: function(self){
    return objectSelection(self.obj, rest(self.keys));
  },
  toArray: toArraySeq
}, ISeqable, {
  seq: function(self){
    var key = first(self.keys);
    return lazySeq([key, self.obj[key]], function(){
      return objectSelection(self.obj, rest(self.keys));
    });
  }
}, ICounted, {
  count: function(self){
    return self.keys.length;
  }
}, IShow, {
  show: function(self){
    var pairs = toArray(seq(self));
    return "[" + pairs.map(function(pair){
      return "[" + show(pair[0]) + ", " + show(pair[1]) + "]";
    }).join(", ") + "]";
  }
});