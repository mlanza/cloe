export function Isa(types){
  this.types = types;
}

export function isa(...types){
  return new Isa(types);
}