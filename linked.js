//likeable

import {LinkedList} from './fp/monad/linkedlist';

const list = LinkedList.empty();
const a = LinkedList.Cons(1, LinkedList.of(2));
const b = LinkedList.of(3)
const c = a.concat(b);

const addOne = x => LinkedList.of(x + 1)
const arr = [1, 2,2 , 3]
console.log(c.chain(addOne).ap(LinkedList.of(x => x +2)).filter(x => x < 6).toArray());
console.log(LinkedList.fromArray(arr).toArray(), arr.toLinkedList().toArray())
// console.log(a.concat(b))