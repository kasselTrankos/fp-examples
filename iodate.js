// io date
import { F } from 'ramda';
import  IO from './fp/monad/io';
import {Pair} from './fp/monad/pair';
import {I} from './lambda';
import {taggedSum} from 'daggy';
const lift = f => a => b => b.ap(a.map(f))
const date = x => IO(() => new Date(x));
const k = date(new Date().getTime())
    // .map(x => new Date(x.getTime() + ( 2 * 60 * 60 * 1000)))
    .map(x => `${x.getHours()}:${x.getMinutes()}:${x.getSeconds()}`)

const ga = m => IO(() => m + 1);
console.log(k.unsafePerformIO(), ga(1).unsafePerformIO())
const append = a => b => [a, b];

const h = lift(append)(lift(append)(k)(ga(1)))(ga(9));
console.log(h.unsafePerformIO())

const p = Pair(0, ga(1))
    .bimap(x => 3, x => x.map(y => y + 3))

console.log(p.snd().unsafePerformIO(), p.fst())
const gp = Pair(8, 13);
console.log(gp.fst() + gp.snd())

console.log(5*5 - 8*8 + (5 * 8));

// newtype Fix f = Fx (f (Fix f))
const Fix = f => Fix(f(Fix(f)));
// fmap :: f -> (a -> b) -> f a -> f b 
const fmap = f => a => f(a);
// cata :: Functor f => (f a -> a) -> Fix f -> a
const cata = f => fmap(f) 
// const cata = 
// unFix :: Fix f -> f (Fix f)
const unFix = Fix => x

class NatF {
    constructor(x) {
        this.x = x;
    }
    static get ZeroF () {
        return new NatF(Pair(1 ,1))
    }
    static SuccF(p) {
        return new NatF(Pair(p.snd(), p.snd() + p.fst()))
    }
    toString() {
        return `NatF(Pair( ${this.x.fst()}, ${this.x.snd()})) `
    }
}
// fib :: Int -> Int
console.log(NatF.SuccF(Pair( 1, 2)).toString())
