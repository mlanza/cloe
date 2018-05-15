import {noop, counter} from "../../core";

export default function Publisher(subscribers, seed){
  this.subscribers = subscribers;
  this.seed = seed;
}

export function publisher(){
  return new Publisher({}, counter());
}