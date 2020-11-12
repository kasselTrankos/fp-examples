// pair is
import {Pair}  from './fp/monad/pair';
// let mod = Math.pow(2, 31) -1;


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

const p = ()=>  Pair.Cons(1,  call(89));
console.log(
    p()
    .chain(p)
    // .chain(p)
    .chain(p)
    // .chain(p)
    // .chain(p)
    // .chain(p)
);