import {ISeqable, ISeq} from '../../protocols';
import {identity, constantly, overload, unspread} from "../../core";
import {lazySeq} from "../../types/lazyseq/construct";
import EmptyList from '../emptylist/construct';

function filter(pred, xs){ //duplicated to break dependencies
  const coll = ISeqable.seq(xs);
  if (!coll) return EmptyList.EMPTY;
  const head = ISeq.first(coll);
  return pred(head) ? lazySeq(head, function(){
    return filter(pred, ISeq.rest(coll));
  }) : filter(pred, ISeq.rest(coll));
}

export function Concatenated(colls){
  this.colls = colls;
}

export function concatenated(colls){
  colls = filter(ISeqable.seq, colls);
  return ISeqable.seq(colls) ? new Concatenated(colls) : EmptyList.EMPTY;
}

export function isConcatenated(self){
  return self.constructor === Concatenated;
}

Concatenated.from = concatenated;

export const concat = overload(constantly(EmptyList.EMPTY), ISeqable.seq, unspread(concatenated));

export default Concatenated;