// linked list

import { taggedSum }  from 'daggy';
import { tail } from 'ramda';

export const LinkedList = taggedSum('LinkedList', {
    Cons: ['head', 'tail'], Nil: []
});
LinkedList.empty = function () {
    return LinkedList.Nil;
}
LinkedList.of = function(x) {
    return LinkedList.Cons(x, LinkedList.empty());
}

LinkedList.prototype.concat = function(that) {
    return this.cata({
        Cons: (head, tail) => LinkedList.Cons(head, tail.concat(that)),
        Nil: ()=>  that
    });
}
LinkedList.prototype.chain = function(f) {
    return this.cata({
        Cons: (head, tail) => f(head).concat(tail.chain(f)),
        Nil: ()=> LinkedList.Nil
    });
}

LinkedList.prototype.ap = function (that) {
    return this.cata({
        Cons: (head, tail) => that.cata({
            Cons:(f, ff) =>  LinkedList.Cons(f(head), tail.ap(that).concat(this.ap(ff))),
            Nil: ()=> LinkedList.Nil
        }),
        Nil : ()=> LinkedList.Nil
    });
}

LinkedList.prototype.filter = function(f) {
    return this.cata({
        Cons: (head, tail) => LinkedList.empty().concat(f(head) ? LinkedList.of(head) : LinkedList.empty()).concat(tail.filter(f)),
        Nil: ()=> LinkedList.Nil
    });
}


/// This was an implemention to Isomorphic
/// toArray :: LinkedList a -> [a] 
LinkedList.prototype.toArray = function() {
    return this.cata({
        Cons: (head, tail ) => [head, ...tail.toArray()],
        Nil: ()=> []
    });
}
// fromArray :: LinkedList [a] -> LinkedList a
LinkedList.fromArray = function(data) {
    return data.reduce((acc, x)=> acc.concat(LinkedList.of(x)), LinkedList.empty());
}
// end then the monkey patchvalue
// toLinkedList :: Array [a] -> LinkedList a
Array.prototype.toLinkedList = function() {
    return LinkedList.fromArray(this);
}