//lambda.js is
import {K, KI, C, M, I, OR, AND } from './lambda';
Function.prototype.toJsBool = function()  { return this(true)(false); }

const NOT = C;
const ifElse = I;
const tt = AND(K)(K)('si')('no')
console.log(tt);

