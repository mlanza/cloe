export function isDate(self){
  return self.constructor === Date;
}

function ceil(self){
  return new Date(self.getFullYear(), self.getMonth(), self.getDate(), 23, 59, 59, 999);
}

function floor(dt){
  return new Date(self.getFullYear(), self.getMonth(), self.getDate());
}