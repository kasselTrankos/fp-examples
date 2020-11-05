// haskell signature
// Num a => a -> a 
import {Left, Right} from './fp/monad/either';
import { B } from './lambda';
import { taggedSum } from 'daggy';
import DOM from './fp/monad/DOM';
import IO from './fp/monad/io';

import { concat, construct, empty } from 'ramda';

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

function LinkedList(h, t) {
    this.head = h;
    this.tail = t;
}
LinkedList.of = function(h) {
    return new LinkedList(h, null)
}
LinkedList.prototype.map = function(f) {
    return new LinkedList(this.head ? f(this.head) : null, this.tail ? this.tail.map(f) : null)
}
LinkedList.prototype.toArray = function() {
    return [].concat(this.head  ? this.head : [], this.tail ? this.tail.toArray(): []);
}
LinkedList.prototype.concat = function(b) {
    return this.head ? new LinkedList(this.head , this.tail ? this.tail.concat(b) : b): b;
}
// chain :: Chain m => m a ~> (a -> m b) -> m b
LinkedList.prototype.chain = function(f) {
    return f(this.head, this.tail)
}
LinkedList.empty = function() {
    return LinkedList.of(null)
}
LinkedList.prototype.filter = function(f) {
   return LinkedList.empty().concat(
       f(this.head)
            ? new LinkedList(this.head, this.tail
                ? this.tail.filter(f): null)
                : this.tail ? this.tail.filter(f) : LinkedList.empty());
}


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

const v = [1, 2, 9];
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
    const ttt = d.reduce((acc, x)=> Right(acc.ap(x.map(concater))), Right(Multiply.empty()));
    console.log('tttt', ttt);
    
    
    // const _fst = P => P.A;
    // const _scnd = P => P.B;
    
    // const P = Pair.of(1, true);
    
    // console.log(_fst(P), _scnd(P))
const log = x =>  IO(()=> 2 + x +2);
const a = log(0).map(x => x + 10).chain(x => IO(()=> Right(x))).unsafePerformIO().cata({
    Left: x => x - 100,
    Right: x => Left(LinkedList.of( x +2))
});

const ja = LinkedList.empty().concat(new LinkedList(5, new LinkedList(9, new LinkedList(6, LinkedList.of(2))))).concat(LinkedList.of(90)).concat(new LinkedList(100, LinkedList.of(8))).map(x => x * 3);
const al = LinkedList.of(1).concat(new LinkedList(2, LinkedList.of(11)));
const bl = LinkedList.empty().concat(LinkedList.of(1));
const gl = ja.toArray().reduce((acc, x)=> acc.concat(LinkedList.of(x)), LinkedList.empty());
const hl = Right(1);
const suma = x => x + 1;
console.log(al.filter(x => x > 1));