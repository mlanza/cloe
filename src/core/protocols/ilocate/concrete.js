import ILocate from "./instance";
import {satisfies} from "../../types/protocol/concrete";
import {first} from "../../protocols/iseq/concrete";
import {query} from "../../protocols/iquery/concrete";
export function locate(self, criteria){
  return satisfies(ILocate, self) ? ILocate.locate(self, criteria) : first(query(self, criteria));
}
export function detect(criteria, context){
  return locate(context, criteria);
}