export default function Choice(options){
  this.options = options;
}

export function choice(options){
  return new Choice(options);
}

Choice.prototype.toString = function(){
  return `invalid choice`;
}

export {Choice};