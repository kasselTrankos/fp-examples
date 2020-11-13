//lambda.js is
import {K, KI, Y, C, M, I, OR, AND, EQ, NOT, V, ZERO } from './lambda';
Function.prototype.toJsBool = function()  { return this(true)(false); }

const tt = AND(K)(K)('si')('no')
const e = EQ(K)(KI);

const _4 = NOT(AND(K)(K))(4)(9)
const _42 = K(I)(42);
const pair = a => b => f =>  f(a)(b);
const p = V('ab')('bc');
const EMPTY = (() => {});
const l123 = V(1)(pair(2)(pair(3)(EMPTY)));
// console.log(_4, _42(90), p(K(I)), l123(K(I))(K(I))(K));

const _0 = ZERO(I)(0)
console.log(_0)
// https://raganwald.com/2018/09/10/why-y.html
const fibonaci = Y(x => x +1)(10)
