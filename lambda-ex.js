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
const isOver100 = myself => n => (n===0) || myself(n -1);
const fillUntill100 = my => n => (n.length===10) ? n : my([...n, 1])
const fibonaci = Y(fillUntill100)([])
console.log(fibonaci);
// thunk t3cnica ( call a subroutine with part of calculus ( call by value -> like js, call by  name )-> from scala )
// 'hypot' is a binary function
const hypot = (x, y) => Math.sqrt(x * x + y * y);
const doSomethingWithThunk = f => f()
// 'thunk' is a function that takes no arguments and, when invoked, performs a potentially expensive
// operation (computing a square root, in this example) and/or causes some side-effect to occur
const thunk = () => hypot(3, 4);

// the thunk can then be passed around without being evaluated...
const aa = doSomethingWithThunk(thunk);

// ...or evaluated
const ac = thunk(); // === 5

console.log(aa, ac);


// contiuos passing style like Task is made in JS
function Thunk(delayed) {
    this.delayed = delayed;
}
Thunk.prototype.evaluate = function() {
    return this.delayed();
}

const longtailed =
  fn =>
    (...initialArgs) => {
      let value = fn(...initialArgs);

      while (value instanceof Thunk) {
        value = value.evaluate();
      }

      return value;
    };
const isEven = longtailed(
      function myself (n, parity = 0) {
        return (n === 0) ? parity === 0:  new Thunk(() => myself(n - 1, 1 - parity))
      }
    );
console.log(new Date())
console.log(isEven(62))
console.log(new Date())

function _trampoline(fn) {
    return (...args) => {
        let value = fn(...args);
        while(value instanceof Thunk) {
            value = value.delayed()
        }
        return value;
    }
}
const mymy = (n, acc) => n <= 0 ? [...acc, 0] : new Thunk(()=> mymy(n - 3 , [...acc, n])); 
console.log(_trampoline(mymy)(90, []));