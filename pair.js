// pair is
const readline = require('readline');
import {Pair}  from './fp/monad/pair';
import IO from './fp/monad/io';
import Maybe from './fp/monad/maybe';
import {I} from './lambda';
import Either from './fp/monad/either';
import { map } from 'ramda';

const { Just, Nothing } = Maybe; 

// cardinalidad de Pair a, b => a * b
// Task x => x = 1
// Maybe x | nil = 1
// Either is sum Type x | y = 1
// Pair Int, Int => 1 * 1 = 1
// Pair String, Int => 1 * 1 => 1
// Pair Maybe , Int => (1 + 1) * 1 = 2
// Pair Pair, Pair => (1 * 1) * (1 * 1) = 1
// Pair Maybe, Nil => (1 + 1) * 0 = 0

// let mod = Math.pow(2, 31) -1;
// Pair to Maybe => (1 * 1) = 1 + 1 
// Pair is prod type
// Maybe is sum type

// Pair :: Maybe -> Maybe(a, b)
Pair.prototype.toMaybe= function() {
    return Just([Just(this.a), Just(this.b)])
}

// toEither : Pair a b -> Either a b 
Pair.prototype.toEither = function() {
    return this.a === 1 ? Either.Right(this.b): Either.Left(this.b);
}

Maybe.prototype.toPair = function() {
    return this.cata({
        Just: ([a, b]) => Pair(a.chain(I), b.chain(I)),
        Nothing: ()=> Maybe.Nothing
    });
}


// const toHEx = x => `0x${x.toString(16).lenght % 2 ? '0' : ''}${x.toString(16)}`;

function* rando(seed) {
    let x = seed;
    while(true) {
        yield (x = (1103515245 * x + 12345) & 0x7fffffff,
        (x >>> 16) / 0x7fff )
    }32
}

const limitTo = 
    lim => x => Math.floor(x * lim);

const gen = rando(10);
// const take = 
//     (n, g)=> (new Array(n).fill(null).map(()=> g.next().value));

// console.log(take(20, gen).map(limitTo(51)), 'a'>>>64);
const call = (n) => limitTo(gen.next().value)(n)

const p = x=>  Pair(x,  call(89));
// console.log(
//     p(1)
//     .chain(p)
//     .chain(p)
//     .chain(p)
//     .chain(p)
//     .chain(p)
//     // .chain(p)
// );
const ta = p(1)
const tam = ta.toMaybe()
const rtam = tam.toPair()
// console.log(ta, '->', tam, '-> ', rtam, rtam.bimap(x => x +1, x=> x+2));
const login = x => x == 1 ? Either.Right('alvaro') : Either.Left('Vera');

// console.log(login(11).bimap(x => ' soy '+ x, x => 'ella es' +x))

// isPalindromo :: String -> Bool
const isPalindromo = a => a === a.split('').reverse().join('');
// main :: IO a => String -> Boolean
const main = a =>  IO(()=> {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
    return rl.question(a, str => {
        return str;
        rl.close();
    });
});


console.log(isPalindromo('tacoat'));
console.log(isPalindromo('tacocat'));
console.log(main('dame str')
    .map(z => z + ' hola')
    .unsafePerformIO());

const pair = Pair(10, 'lisa');
// console.log(pair.toEither().bimap(x => ' soy '+ x, x => 'ella es ' +x))
// Boolean = {x : x ∈ {True, False}} => #Boolean = 2
// UInt8 = {x : x ∈ {0, …, 255}} => #UInt8 = 256
// Pair Bolean UInt = 2 * 256 = 512
// either a | b  -> a + b  sum 2
// pair a b  -> 1 * 1 prod 1
// pair a Either -> 1 * (1 + 1) -> 2 --- a (b c) or (a b)c
// both touch b sum to prod
// void(0) = 0
// Null = Nothing = 1
// Two types are said to be Isomorphic if they have same cardinality.
// An isomorphism between types a and b is a pair of functions to and from such that:
// · Composition
// to :: a -> b
// from :: b -> a
// to · from = id
// from · to = id
// |[a]| = 1 + |a| + |a|^2 + |a|^3 + ...
// Pair a b = Pair a b
const _p = Pair(1, void(0));
console.log(_p.map(x => x + 8));

// isPalindrome String -> Boolean
const isPalindrome = a => a === a.split('').reverse().join('');

// toLower :: Chat -> Char
const toLower = a => a.toLowerCase();

// allToLower :: String -> String
const allToLower = a => a.split('').map(toLower).join('');

// gga :: String  > Maybe
const gga = a => a === '' ?  Nothing : Just(isPalindrome(a));

// verbose :: String -> String 
const verbose = gga('oco')
    .bimap(x=> 'Nada', y => y ? 'Si' : 'No');
console.log(verbose);

const adm = [1,2,3,4,5,65,6,67,7,78,8,8,9,12, 90,48,344544, 45,3, 23,42,12,235,56,2156,757843,43,1256,76,99];

const group = (acc, x, k)=> x.length <= 0 ? acc : group([...acc, x.splice(0, k)], x, k);

const append = x => xs  => [...xs, x]

// groupBy :: [Function] -> Array -> [...[a]]
const groupBy = (...fns) => a => fns.reduce((acc, f) => [...acc, a.filter(f)] , []);

const lll = group([], [...adm], 3);
console.log(lll);
const gh = groupBy(x => x === 0 )(adm);
console.log(gh);


// dr booolean from to br
const _Pair = (x, y) =>
({
 _0: x,
 _1: y,
 map: f => _Pair(x, f(y))
})

// to :: Pair a -> (Bool -> a)
const to = ({_0, _1}) =>
 bool => bool ? _0 : _1

// from :: (Bool -> a) -> Pair a
const from = f =>
 _Pair(f(true), f(false))


const from_ = from(to(_Pair('hot', 'cold'))) // Pair(‘hot’, ‘cold’)

const to_ = to(from(x => !x ? 'cold' : 'hot')) // bool => bool ? _0 : _1

console.log(from_, '-----------', to_)