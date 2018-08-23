import {unbind} from "../../core";
import {count} from "../../protocols/icounted/concrete";
import {first} from "../../protocols/iseq/concrete";
import {get} from "../../protocols/ilookup/concrete";
import {max} from "../../types/number/concrete";
import {isString} from "../../types/string/construct";
import {lazySeq} from "../../types/lazy-seq/construct";
import {emptyList} from "../../types/empty-list/construct";
import {isRegExp} from "./construct";

export const test = unbind(RegExp.prototype.test);

export function reFind(re, s){
  if (!isString(s)) throw new TypeError("reFind must match against string.");
  const matches = re.exec(s);
  if (matches){
    return count(matches) === 1 ? first(matches) : matches;
  }
}

export function reMatches(re, s){
  if (!isString(s)) throw new TypeError("reMatches must match against string.");
  const matches = re.exec(s);
  if (first(matches) === s) {
    return count(matches) === 1 ? first(matches) : matches;
  }
}

function reSeq(re, s){
  if (!isString(s)) throw new TypeError("reSeq must match against string.");
  const matchData = reFind(re, s);
  return matchData ? lazySeq(matchData, function(){
    return reSeq(re, s);
  }) : emptyList();
}

export function reSeq(re, s){
  const matchData = reFind(re, s),
        matchIdx = s.search(re),
        matchStr = matchData instanceof Array ? first(matchData) : matchData,
        postIdx = matchIdx + max(1, count(matchStr)),
        postMatch = s.substring(postIdx);
  return matchData ? lazySeq(matchData, function(){
    return reSeq(new RegExp(re.source, re.flags), postMatch);
  }) : emptyList();
}

export function rePattern(s){
  if (isRegExp(s)) return s;
  if (!isString(s)) throw new TypeError("rePattern is derived from a string.");
  const found = reFind(/^\(\?([idmsux]*)\)/, s),
        prefix = get(found, 0),
        flags = get(found, 1),
        pattern = s.substring(count(prefix));
  return new RegExp(pattern, flags || "");
}