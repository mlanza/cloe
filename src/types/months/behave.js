import {ISteppable, IConverse, ICloneable} from '../../protocols';
import {identity, constantly, effect} from '../../core';
import {implement} from '../protocol';
import {min} from '../number/concrete';
import {inject} from '../../multimethods/amalgam';
import * as w from '../when/construct';

function step(self, dt){
  const som  = inject(dt, w.som());
  const sday = 6 - som.getDay();
  const calc = ICloneable.clone(som);
  calc.setMonth(calc.getMonth() + self.n);
  const eom  = inject(calc, w.eom());
  calc.setDate(self.options.day || dt.getDate());
  const tgt  = min(calc, eom);
  if (self.options.dow != null) {
    const tday   = 6 - inject(tgt, w.som()).getDay();
    const offset = tday - sday;
    tgt.setDate(tgt.getDate() + offset);
    //rollback on month size overflows
    while(tgt.getDay() != self.options.dow){
      tgt.setDate(tgt.getDate() - 1);
    }
  }
  return tgt;
}

function converse(self){
  return new self.construct(self.n * -1, self.options);
}

export default effect(
  implement(IConverse, {converse}),
  implement(ISteppable, {step}));