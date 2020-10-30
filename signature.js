// haskell signature
// Num a => a -> a 
import {Left, Right} from './fp/monad/either';
import { B } from './lambda';


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

const i = x => new Sum(x + 6);
const j = x => new Multiply(x);
// obtainPackage :: String  a -> a
const cata = o => xs => xs.cata(o);
const m = x => x > 3 ? fst(x) : scnd(x)
// https://bartoszmilewski.com/2015/01/07/products-and-coproducts/

const v = [1, 12,2,3, 5];
const ft = x =>fst(x).cata({Left: i, Right: j});
const data = v.map(m).map(cata({Left: i, Right: j}))
// console.log(data, data.reduce((acc, j)=> acc.concat(j), Sum.empty()))
// console.log(a.concat(new Sum(2)).concat(Sum.empty()), Sum.empty())
// isomorphism
const f = x => Multiply.id()(x);
const g =  x => Sum.id()(x);

console.log(Sum.id()(100), f(g(190)));