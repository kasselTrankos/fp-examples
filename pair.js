// pair is
import {Pair}  from './fp/monad/pair';
import Maybe from './fp/monad/maybe';
import {I} from './lambda';
import Either from './fp/monad/either';

const { Just } = Maybe; 

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
Pair.prototype.bimap = function(f, g) {
    return Pair(f(this.a), g(this.b));
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
console.log(ta, '->', tam, '-> ', rtam, rtam.bimap(x => x +1, x=> x+2));
const login = x => x == 1 ? Either.Right('alvaro') : Either.Left('Vera');

console.log(login(11).bimap(x => ' soy '+ x, x => 'ella es' +x))

// isPalindromo :: String -> Bool
const isPalindromo = a => a === a.split('').reverse().join('');

console.log(isPalindromo('tacoat'));
console.log(isPalindromo('tacocat'));

