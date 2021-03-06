import {overload, identity, complement, comp, first, rest, partial, isSome, reduced, seq, equiv, IReduce} from "atomic/core";

export function tee(f){
  return function(xf){
    return overload(xf, xf, function(memo, value){
      f(value);
      return xf(memo, value);
    });
  }
}

export function map(f){
  return function(xf){
    return overload(xf, xf, function(memo, value){
      return xf(memo, f(value));
    });
  }
}

export function mapSome(f, pred){
  return function(xf){
    return overload(xf, xf, function(memo, value){
      return xf(memo, pred(value) ? f(value) : value);
    });
  }
}

export function mapcat(f){
  return comp(map(f), cat);
}

export function mapIndexed(f){
  return function(xf){
    let idx = -1;
    return overload(xf, xf, function(memo, value){
      return xf(memo, f(++idx, value));
    });
  }
}

export function filter(pred){
  return function(xf){
    return overload(xf, xf, function(memo, value){
      return pred(value) ? xf(memo, value) : memo;
    });
  }
}

export const remove = comp(filter, complement);

export function detect(pred){
  return function(xf){
    return overload(xf, xf, function(memo, value){
      return pred(value) ? reduced(value) : null;
    });
  }
}

export function compact(){
  return filter(identity);
}

function dedupe0(){
  return dedupe1(identity);
}

function dedupe1(f){
  return dedupe2(f, equiv);
}

function dedupe2(f, equiv){
  return function(xf){
    let last;
    return overload(xf, xf, function(memo, value){
      const result = equiv(f(value), f(last)) ? memo : xf(memo, value);
      last = value;
      return result;
    });
  }
}

export const dedupe = overload(dedupe0, dedupe1, dedupe2);

export function take(n){
  return function(xf){
    let taking = n;
    return overload(xf, xf, function(memo, value){
      return taking-- > 0 ? xf(memo, value) : reduced(memo);
    });
  }
}

export function drop(n){
  return function(xf){
    let dropping = n;
    return overload(xf, xf, function(memo, value){
      return dropping-- > 0 ? memo : xf(memo, value);
    });
  }
}

export function interpose(sep){
  return function(xf){
    return overload(xf, xf, function(memo, value){
      return xf(seq(memo) ? xf(memo, sep) : memo, value);
    });
  }
}

export function dropWhile(pred){
  return function(xf){
    let dropping = true;
    return overload(xf, xf, function(memo, value){
      !dropping || (dropping = pred(value));
      return dropping ? memo : xf(memo, value);
    });
  }
}

export function keep(f){
  return comp(map(f), filter(isSome));
}

export function keepIndexed(f){
  return comp(mapIndexed1(f), filter(isSome));
}

export function takeWhile(pred){
  return function(xf){
    return overload(xf, xf, function(memo, value){
      return pred(value) ? xf(memo, value) : reduced(memo);
    });
  }
}

export function takeNth(n){
  return function(xf){
    let x = -1;
    return overload(xf, xf, function(memo, value){
      x++;
      return x === 0 || x % n === 0 ? xf(memo, value) : memo;
    });
  }
}

export function splay(f){
  return function(xf){
    return overload(xf, xf, function(memo, value){
      return xf(memo, f.apply(null, value));
    });
  }
}

export function distinct(){
  return function(xf){
    const seen = new Set();
    return overload(xf, xf, function(memo, value){
      if (seen.has(value)) {
        return memo;
      }
      seen.add(value);
      return xf(memo, value);
    });
  }
}

export function cat(xf){
  return overload(xf, xf, function(memo, value){
    return IReduce.reduce(memo, xf, value);
  });
}