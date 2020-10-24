const { isFile } = require("../../utils");

import { taggedSum } from 'daggy';
import { composeP } from 'ramda';
// data RoseRoseTree a = RoseRoseTree a [RoseRoseTree a]
// of :: Applicative f => f a ~> a -> f a
const RoseTree = taggedSum('RoseTree', {
  Cons: ['Node', 'Forest'],
  Nil: []
});

// of :: Aplicative a => a -> a -> f a
RoseTree.of = function(x) {
  return RoseTree.Cons(x, []);
}


RoseTree.empty = function() {
  return RoseTree.Nil
}
// concat :: Semogroup a => a ~> a -> a
RoseTree.prototype.concat = function(b) {
  return this.cata({
    Cons: (Node, Forest)=> b.cata({
      Cons: (_, xs) => RoseTree.Cons(Node, [...Forest, b]),
      Nil:_ => this
    }),
    Nil: _ => b
  });
}

// ap :: Apply f => f a ~> f (a -> b) -> f b
RoseTree.prototype.ap = function(b) {
  return this.cata({
    Cons: (Node, Forest) => b.cata({
      Cons: (f, fs)=> RoseTree.Cons(f(Node), [].concat(
        Forest.map(x => x.ap(b)),
        fs.map(m => this.ap(m))
      )),
      Nil:_ => RoseTree.Nil
    }),
    Nil: _ => RoseTree.Nil
  });
}

// map :: Functor f => f a ~> (a -> b) -> f b
RoseTree.prototype.map = function(f) {
  return this.cata({
    Cons: (Node, Forest)=> RoseTree.Cons(f(Node), Forest.map(x => x.map(f))),
    Nil: _ => RoseTree.Nil
  });
}


// chain :: Cahin m => m a ~> (a -> m b)-> m b
RoseTree.prototype.chain = function(f) {
  return this.cata({
    Cons: (Node, Forest)=> f(Node).cata({
      Cons: (node, forest) => RoseTree.Cons(node, [].concat(forest, Forest.map(x => x.chain(f)))),
      Nil: _ => RoseTree.Nil
    }),
    Nil: _ => RoseTree.Nil
  });
}


// reduce :: Foldable f => f a ~> ((b, a) -> b, b) -> b
RoseTree.prototype.reduce = function (f, acc) {
  return this.cata({
    Cons: (Node, Forest) => Forest.reduce((acc, x) => x.reduce(f, acc) ,f(acc, Node)),
    Nil:_ => acc
  });
}
// alt :: Alt f => f a ~> f a -> f a
RoseTree.prototype.alt = function(b) {
  return this.concat(b);
}

// foldTree :: (a -> [b] -> b) -> Tree a -> b
RoseTree.prototype.foldTree = function(f, acc) {
  return this.cata({
    Cons: (Node, Forest) => Forest.reduce((acc, x)=> f(acc, x.cata({
      Cons: (Node) => Node,
      Nil: _ => acc 
    }))  ,f(acc, Node)),
    Nil: _=> acc
  });
}

RoseTree.prototype.append = function(xs) {
  return new RoseTree(this.node,  [...this.forest, ...xs]);
}

RoseTree.prototype.combine = function(b) {
  return new RoseTree(this.node,  [...this.forest, ...b.forest]);
}

module.exports = RoseTree;
