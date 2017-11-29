import {seq} from "../../protocols/iseqable";
import {EMPTY} from "../empty";

export function ObjectSelection(obj, keys){
  this.obj = obj;
  this.keys = keys;
}

export function objectSelection(obj, keys){
  return seq(keys) ? new ObjectSelection(obj, keys) : EMPTY;
}

export default ObjectSelection;