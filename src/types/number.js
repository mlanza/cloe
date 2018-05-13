import {overload, identity, constantly} from "../core";
import {complement} from "./function";
import {reducing} from "./reduced";
export * from "./number/construct";
import Number from "./number/construct";
export default Number;
import behave from "./number/behave";
behave(Number);

export const int   = parseInt;
export const float = parseFloat;
export function number(...args){
  return Number(...args);
}

export function isNumber(n){
  return Number(n) === n;
}

export function isInteger(n){
  return Number(n) === n && n % 1 === 0;
}

export const isInt = isInteger;

export function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}

export function mod(n, div){
  return n % div;
}

function add2(x, y){
  return x + y;
}

function subtract1(x){
  return subtract2(0, x);
}

function subtract2(x, y){
  return x - y;
}

function multiply2(x, y){
  return x * y;
}

function divide1(x){
  return divide2(1, x);
}

function divide2(x, y){
  return x / y;
}

export const add      = overload(constantly(0), identity, add2, reducing(add2));
export const subtract = overload(constantly(0), subtract1, subtract2, reducing(subtract2));
export const multiply = overload(constantly(1), identity, multiply2, reducing(multiply2));
export const divide   = overload(null, divide1, divide2, reducing(divide2));

export function isZero(x){
  return x === 0;
}

export function isPos(x){
  return x > 0;
}

export function isNeg(x){
  return x < 0;
}

export function isOdd(n){
  return n % 2;
}

export const isEven  = complement(isOdd);