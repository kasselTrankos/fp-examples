// hylomorphism h : A -> C
// little theory from https://en.wikipedia.org/wiki/Hylomorphism_(computer_science)
// The anamorphic part can be defined in terms of a unary function g : A -> B X A 
// defining the list of elements in B by repeated application ("unfolding"), and a predicate 
// p : A -> B providing the terminating condition.
// The catamorphic part can be defined as a combination of an initial value 
//  c in C for the fold and a binary operator B X C ->C used to perform the fold.
// experesion :: type .... dont forget

//List
import { taggedSum, tagged } from 'daggy';
import { ap } from 'ramda';
// factorial :: Int  -> Int
const factorial = n =>
  n == 0 ? 1 : n * factorial (n - 1);

// console.log(factorial(5));


// Tree
// fibonacci :: Integer -> Integer
const fibonacci = n => 
    n == 0 ? 0 : n == 1 ? 1 : fibonacci (n - 2) + fibonacci (n - 1);
// console.log(fibonacci(2));


// FROM:
// https://ulissesaraujo.wordpress.com/2009/04/09/hylomorphisms-in-haskell/
// hylo f h = cata f x ana h
// data BTree a = Empty | Node(a, (BTree a, BTree a))
// hylo :: Functor f => Algebra f b -> Coalgebra f a -> a -> b
// hylo alg coalg = ana coalg >>> cata alghylo :: Functor f => (f b -> b) -> (a -> f a) -> a -> b
// type Coalgebra f a = a -> f a
// data Token
//   = Lit Int
//   | Op (Int -> Int -> Int)

// Op :: + -> Int -> Int -> Int
const Op = a => b => a + b;
const add = a => b => a + b;
const mult = a => b => a * b;
const less = a => b => a - b;
const div = a => b => a / b;

// parseToken :: String -> Token
const parseToken = s => s === '+' ? Op(add)
  : s ==='*' ? Op(mult)
    : s === '-' ? Op(less) : Op(div);

const sts = '1 2 '
function Algebra(a) {
  this.value = a;
}
Algebra.prototype.map = function(f) {
  return new Algebra(f(this.value));
}
// http://learnyouahaskell.com/making-our-own-types-and-typeclasses
const Point = tagged('Point', ['x', 'y']); 

Point.prototype.toString = function() {
  return `x: ${this.x}, y: ${this.y}`;
}

const Shape = taggedSum('Shape', {
  Circle: [Point, 'r'],
  Rectangle: [Point, Point]
});
Shape.prototype.area = function() {
  return this.cata({
    Circle: (p, r) => Math.PI * Math.pow(r, 2),
    Rectangle: (p, p1 )=> Math.abs(p.x - p1.x) * Math.abs(p.y - p1.y)
  });
}

Shape.prototype.toString = function () {
  return this.cata({
    Circle: (p, r)=> `${p.toString()}, r: ${r}`,
    Rectangle: (p, p1)=>  `${p.toString()}, ${p1.toString()}`
  });
}

// https://blog.sumtypeofway.com/posts/introduction-to-recursion-schemes.html
const Lit = taggedSum('Lit', {StrLit: ['x'], IntLit: ['x'], Ident: ['x']});

Lit.prototype.toString = function() {
  return this.cata({
    StrLit: x => `StrLit :: Lit -> ${x}`,
    IntLit: x => `IntLit :: Lit -> ${x}`,
    Ident: x => `Ident :: Lit -> ${x}`,
  });
}

Lit.prototype.eq = function(b) {
  return this.cata({
    StrLit: x => x === b,
    IntLit: x => x === b,
    Ident: x => x === b,
  });
}
Lit.prototype.map = function(f) {
  return this.cata({
    StrLit: x => Lit.StrLit(f(x)),
    IntLit: x => console.log(x, '90') || Lit.IntLit(f(x)),
    Ident: x => Lit.Ident(f(x)),
  });
}

const Expr = taggedSum('Expr', {
  // Index: ['e', 'ee'],
  // Call: ['e'],
  // Unary: ['x', 'e'],
  // Binary: ['e', 'x', 'ee'],
  // Paren: ['e'],
  Literal: [Lit]
});

Expr.prototype.toString = function() {
  return this.cata({
    // Index: (e, ee)=> `Index :: Expr -> ${e}-> ${ee}`,
    // Call: e => `Call :: Expr -> ${e}`,
    // Unary: (x, e)=> `Unary :: Expr -> ${x} -> ${e}`,
    // Binary: (e, x, ee) => `Binary :: Expr -> ${e} -> ${x} -> ${ee}`,
    // Paren: e => `Paren :: Expr -> ${e}`,
    Literal: lit => `Literal :: Expr => ${lit.toString()}`,
  });
};
Expr.prototype.map = function(f) {
  return this.cata({
    // Index: (e, ee)=> `Index :: Expr -> ${e}-> ${ee}`,
    // Call: e => `Call :: Expr -> ${e}`,
    // Unary: (x, e)=> `Unary :: Expr -> ${x} -> ${e}`,
    // Binary: (e, x, ee) => `Binary :: Expr -> ${e} -> ${x} -> ${ee}`,
    // Paren: e => `Paren :: Expr -> ${e}`,
    Literal: lit => Expr.Literal(lit.map(f)),
  });
};

Expr.prototype.chain = function(f) {
  
  return this.cata({
    // Index: (e, ee)=> `Index :: Expr -> ${e}-> ${ee}`,
    // Call: e => `Call :: Expr -> ${e}`,
    // Unary: (x, e)=> `Unary :: Expr -> ${x} -> ${e}`,
    // Binary: (e, x, ee) => `Binary :: Expr -> ${e} -> ${x} -> ${ee}`,
    // Paren: e => `Paren :: Expr -> ${e}`,
    Literal: lit => lit.map(f),
  });
};



const max = a => b  => Math.max(a, b);

// console.log(max(90)(76))

const po = Point(0, 0);
const p1 = Point(100, 100)
const circle = Shape.Circle(po, 10);
const rect = Shape.Rectangle(po, p1);
// console.log(circle.area(), rect.area(), po);
const lab = Lit.StrLit('hola');
// const exx = Expr.Literal(lab);
// const ind = Expr.Index(Expr.Literal(Lit.IntLit(1)), Lit.IntLit(1));
// applyExpr :: (Expr -> Expr) -> Expr -> Expr
const applyExpr = f => e => e.map(f);
const one = Expr.Literal(Lit.IntLit(1));
const two = Expr.Literal(Lit.IntLit(2));
const app = applyExpr(x => x + 11);
console.log(app(one).toString())