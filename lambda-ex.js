//lambda.js is
import {K, KI, C, M, I, OR, AND, EQ, NOT, V } from './lambda';
Function.prototype.toJsBool = function()  { return this(true)(false); }

const tt = AND(K)(K)('si')('no')
const e = EQ(K)(KI);

const _4 = NOT(AND(K)(K))(4)(9)
const _42 = K(I)(42);
const pair = a => b => f =>  f(a)(b);
const p = V('ab')('bc');
const EMPTY = (() => {});
const l123 = V(1)(pair(2)(pair(3)(EMPTY)));
console.log(_4, _42(90), p(K(I)), l123(K(I))(K(I))(K));

