// hylomorphism h : A -> C
// little theory from https://en.wikipedia.org/wiki/Hylomorphism_(computer_science)
// The anamorphic part can be defined in terms of a unary function g : A -> B X A 
// defining the list of elements in B by repeated application ("unfolding"), and a predicate 
// p : A -> B providing the terminating condition.
// The catamorphic part can be defined as a combination of an initial value 
//  c in C for the fold and a binary operator B X C ->C used to perform the fold.
// experesion :: type .... dont forget


//List
// factorial :: Int  -> Int
const factorial = n =>
  n == 0 ? 1 : n * factorial (n - 1);

console.log(factorial(5));


// Tree
// fibonacci :: Integer -> Integer
const fibonacci = n => 
    n == 0 ? 0 : n == 1 ? 1 : fibonacci (n - 2) + fibonacci (n - 1);
console.log(fibonacci(2));

// FROM:
// https://ulissesaraujo.wordpress.com/2009/04/09/hylomorphisms-in-haskell/
// hylo f h = cata f x ana h
// data BTree a = Empty | Node(a, (BTree a, BTree a))



