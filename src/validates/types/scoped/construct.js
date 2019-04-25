export default function Scoped(key, constraint){
  this.key = key;
  this.constraint = constraint;
}

export function scoped(key, constraint){
  return new Scoped(key, constraint);
}

export {Scoped};