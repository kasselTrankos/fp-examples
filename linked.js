//likeable

import { curryN } from 'ramda';
import {LinkedList} from './fp/monad/linkedlist';
import Maybe from './fp/monad/maybe';

const list = LinkedList.empty();
const a = LinkedList.Cons(1, LinkedList.of(2));
const b = LinkedList.of(3)
const c = a.concat(b);

const addOne = x => LinkedList.of(x + 1)
const arr = [1, 2,2 , 3]
console.log(c.chain(addOne).ap(LinkedList.of(x => x +2)).filter(x => x < 6).toArray());
console.log(LinkedList.fromArray(arr).toArray(), arr.toLinkedList().toArray())
// console.log(a.concat(b))


const lift2 = (f, a, b) => b.ap(a.map(f));
const append = xs => x =>  +x * +xs

const insideOut = (T, xs) => xs.reduce(
  (acc, x) => lift2(append, x, acc),
  T.of(1))
const arra = Array.from({length: 6}, (v, i) => LinkedList.of(i + 1))
const modo = [ LinkedList.of(1), LinkedList.of(2) , LinkedList.of(3), LinkedList.of(4), LinkedList.of(5)];


const klo = LinkedList.of(90).map(x => x + 8).ap(LinkedList.of(x => x + 900));
const ia = insideOut(LinkedList, arra);
// console.log(klo.toArray());

const aa = LinkedList.of(9);
const ab = LinkedList.of(8);
// const ov = lift2(append, aa, ab);
// https://blog.ploeh.dk/2019/04/29/catamorphisms/
console.log(ia.toArray(), arr.toLinkedList().reduce((acc, x)=>  `${acc}${String.fromCharCode(x + 65)}`, 'z'));
// traverse n -> 1 , [a] -> a

const factorial = n =>
  n == 0 ? 1 : n * factorial (n - 1);

console.log(factorial(6));

// FP Is List 
// A* ::= Nil | Cons [A||A*]

// cardinal LinkedList(a, b) = x*y = 2 * 1 = 2
// Maybe Just Boolean | Nothing = 2 + 0 = 2
const xc = [true, true, true, true, true];
const Li = LinkedList.Cons(false, LinkedList.of(true))
LinkedList.prototype.toMaybe = function() {
  return this.cata({
    Cons: () => this.reduce((acc, x)=> acc.map(a => [...a, x]), Maybe.Just([])),
    Nil: () => Maybe.Nothing
  });
}

console.log(Li.toMaybe());