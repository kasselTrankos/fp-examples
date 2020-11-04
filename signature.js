// haskell signature
// Num a => a -> a 
import {Left, Right} from './fp/monad/either';
import { B } from './lambda';
import { taggedSum } from 'daggy';
import DOM from './fp/monad/DOM';
import { concat } from 'ramda';

const Pair = taggedSum('Pair', {
    Cons: ['A', 'B'],
    Nil: []
});

Pair.of = function(A, B) {
    return Pair.Cons(A, B);
}



// Number::cube a => a -> a
const cube = a => a * a;
// max3 :: (Double, Double, Double) -> Double
const max3 = ( a, b ,c ) => Math.max(Math.max(a, b), c);
// Study for coproduct 
// () === Any ya que es haskell
// unit :: a -> ()
const unit = a => [];
// ex:
// yes :: a -> Bool
const yes = a => true;
// not :: a -> Bool
const not = a => false;

function Moan(a) {
    this.value = a;
}
Moan.of = function(a) {
    return new Moan(a);
}

function Sum(a) {
    this.value = a;
}
Sum.of= function(a) {
    return new Sum(a);
}
Sum.prototype.concat = function(b) {
    return new Sum(this.value + b.value);
}

Sum.empty = function() {
    return new Sum(0);
}
// fantasy-land/id :: Category c => () -> c a a
Sum.id = function(){
    return x=> x 
}

function Multiply(a) {
    this.value = a;
}
Multiply.of = function(a) {
    return new Multiply(a);
}
Multiply.prototype.concat = function(b) {
    return new Multiply(this.value * b.value);
}
// fantasy-land/id :: Category c => () -> c a a
Multiply.id = function(){
    return x => x;
}

Multiply.empty = function() {
    return new Multiply(1);
}
const fst = x => Left(x);
const scnd = x => Right(x);

const i = x => new Sum(x);
const j = x => new Multiply(x);
// obtainPackage :: String  a -> a
const cata = o => xs => xs.cata(o);
const m = x => x > 14 ? fst(x) : scnd(x)
// https://bartoszmilewski.com/2015/01/07/products-and-coproducts/

const v = [1, 2, 3, 2];
const ft = x =>fst(x).cata({Left: i, Right: j});
const data = v.map(m).map(cata({Left: i, Right: j}));

console.log(data, data.reduce((acc, j)=> acc.concat(j), Sum.empty()))
// console.log(a.concat(new Sum(2)).concat(Sum.empty()), Sum.empty())
// isomorphism
const f = x => Multiply.id()(x);
const g =  x => Sum.id()(x);

const product = (f, g, a) => f(a)(g(a));
const r = x => b => x + 10 + b
const coproduct = (f, g, a) => a === 1 ? Left(f(a)) : Right(g(a))
const d = data.map(x => coproduct(f, g, x))//.map(cata({Left: i, Right: j}));

console.log(Sum.id()(100), B(f)(g)(90000));

const p = new DOM('html').concat(
    new DOM('div', 'hola', [ new DOM('p', 'dale'), new DOM('p', 'strong')])
    .concat(new DOM('span', 'joder')));



console.log(p.html());
console.log(product(r, g, 8));
const concater = x => xs => xs.concat(x);
const ttt = d.reduce((acc, x)=> Right(acc.ap(x.map(concater))), Right(Sum.empty()));
console.log('tttt', ttt.cata({Left: x => x + 100, Right: x => x.concat(Sum.of(10))}));

// const _fst = P => P.A;
// const _scnd = P => P.B;

// const P = Pair.of(1, true);

// console.log(_fst(P), _scnd(P))