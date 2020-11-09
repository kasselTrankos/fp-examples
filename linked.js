//likeable

import {LinkedList} from './fp/monad/linkedlist';

const list = LinkedList.empty();
const a = LinkedList.Cons(1, LinkedList.of(2));
const b = LinkedList.of(3)
const c = a.concat(b);

const addOne = x => LinkedList.of(x + 1)

console.log(c.chain(addOne).ap(LinkedList.of(x => x +2)).toArray());

// console.log(a.concat(b))