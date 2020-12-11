// io date
const { adt, match } = require("@masaeedu/adt");
const { cata, ana, Arr } = require("@masaeedu/fp");
import { F } from 'ramda';
import  IO from './fp/monad/io';
import {Pair} from './fp/monad/pair';
import {I} from './lambda';
import {taggedSum} from 'daggy';
import  {Just, Nothing} from './fp/monad/maybe'
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

// console.log(p.snd().unsafePerformIO(), p.fst())
const gp = Pair(8, 13);
// console.log(gp.fst() + gp.snd())

// console.log(5*5 - 8*8 + (5 * 8));

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
    next() {
        return NatF.SuccF(this.x)
    }
    toString() {
        return `NatF(Pair( ${this.x.fst()}, ${this.x.snd()})) `
    }

}
// https://bartoszmilewski.com/2017/02/28/f-algebras/
// newtype Fix f = Fix (f (Fix f))
const Fix = f => Fix(f(Fix(f)));
// unFix :: Fix f -> f (Fix f)
// unFix (Fix x) = x
// cata alg = alg . fmap (cata alg) . unFix
// como puedo ver la traduccion a cata es diferente, necesito un unfix
// T.map(cata(T)) pinta muy muy loco, donde está el acumulador
// const cata = (T, f) => T.extract() > 12 
//     ? T.extract()
//     : cata(T.map(f), f);
// like @masaeedu Asad Saeeduddin
// cata :: Functor f => (f a -> a) -> Fix f -> a
// const cata = F => alg => {
//     const rec = x => alg(F.map(rec)(x));
//     return rec;
//   };

// Veo patrones a mi alrredeor
// 
const fact = (T, f) => T.extract() === 0
    ? 1
    : T.extract() * fact(T.map(f), f);
// cata alg = alg . fmap (cata alg) . unFix
// need unfix
// fibonacci :: Integer -> Integer
const fibonacci = n => 
    n == 0 ? 0 : n == 1 ? 1 : fibonacci (n - 2) + fibonacci (n - 1);
// fib :: Int -> Int
// console.log(NatF.SuccF(Pair( 1, 1))
//     .next() // aqui viene cata
//     .next() // cata
//     .next() // cata
//     .next() // cata
//     .next()
//     .next()
//     .toString(), fibonacci(11))
const _0 = 0;
const _1 = 1;
const _2 = _0 + _1;
const _3 = _2 + _1;
const _4 = _2 + _3;
const _5 = _3 + _4;
const _6 = _4 + _5;
const _7 = _5 + _6;
const _8 = _6 + _7;
// console.log(_2, _3, _4, _5, _6, _7, _8)

// part 2
// to use Fix f must be a Type
const calculo = 1;
// console.log(cata(Just(1))(x=> x +1));
// console.log(Just(1).map(x => x +1), Nothing.map(x => x +1), fact(Just(11), x => x -1))

const ListF = (() => {
    const { Nil, Cons } = adt({ Nil: [], Cons: ["a", "b"] });
    const map = f => match({ Nil, Cons: x => xs => Cons(x)(f(xs)) });
    const fromArray = ana({ map })(Arr.match({ Nil, Cons }));

    return { Nil, Cons, map, fromArray };
})();
const { Nil, Cons } = ListF;


const _NatF = (()=> {
    const {Zero, Succ } = adt({Zero: [], Succ: ['a']});
    const map = f => match({Zero, Succ: x => Succ(x)});
    const bimap = (f, g) => match({Zero, Succ: x => Succ(x.bimap(f, g))});
    return { Zero, Succ, map, bimap};
})();

const {Zero, Succ} = _NatF;

const length = cata(ListF)(match({ Nil: 0, Cons: x => y => `${x}+ 1 + ${y}` }));
const result = length(ListF.fromArray([1, 2, 3, 4, 5, 6, undefined]));
console.log(
    ListF.fromArray([1, 2, 3, 4, 5, 6, undefined]),
    result
);
const aad = cata(_NatF)(match({Zero: Pair(1, 1), Succ: m => Pair(m.snd(), m.fst() + m.snd())}))

console.log('ARRANGE', 
// Succ(Pair(1, 1)), 
// 'ZERO IS',
// Zero, 
// 'KOKO',
    aad(Succ(Pair(1,2))),

);

const toN = Array.from({length: 14});
// sequence
console.log(fibonacci(15));
console.log(toN.reduce((acc, x) => aad(Succ(acc)) ,Pair(0,1)))