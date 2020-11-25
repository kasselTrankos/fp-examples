// maybe-ex.js is
import Maybe from './fp/monad/maybe';
import IO from './fp/monad/io';
import { pipe, compose, flip } from 'ramda';
import { map } from './utils';
const { Just, Nothing} = Maybe;


const a = Just(1).map(x => x +2).chain(x => Just(x + 100))
console.log(a)

// list :: [[Integer, String]]
const list = [[1, 'Alpha'], [2, 'Beta'], [3, 'Gamma']];

// lookup :: Eq a => a ->[(a, b)] -> Maybe b 
const lookup = i => list => {
    const f = list.find(x => x[0]===i);
    return f ? Just(f[1]) : Nothing
};


// mapToMaybe :: ( a -> b) -> Maybe a -> Maybe b
const mapToMaybe = f => a => a.cata({
    Nothing: _=> Nothing,
    Just: x => Just(f(x))
});

// maybeToString :: Maybe -> String
const maybeToString = a => a.x ? a.x : 'nada'

const b = lookup(1)(list);
const tt = mapToMaybe(x => 'Hola ' +x)(b);
const proc = pipe(
    mapToMaybe(x => 'Hola soy '+ x),
    maybeToString
);
// not :: Boolean -> Boolean
const not = value => !value;
console.log(proc(b), b);
function Tupla(a, b) {
    this.a = a;
    this.b = b;
}
Tupla.prototype.map = function(f) {
    return new Tupla(this.a, f(this.b))
}

// fmap :: Fucntor f  => (a-> b) -> f a -> f b 
const fmap = f => a => f(a);
// (IO String -> Text)   -- (a -> b)
// -> IO Text       -- f a
// -> IO Text       -- f b

// IOtoString :: IO String -> String
const IOToString = io => io.unsafePerformIO();

// toUpper :: String -> String
const toUpper = a => a.toUpperCase();

const ra = fmap(toUpper)(fmap(IOToString)(IO(()=> "alvaro")));
console.log(ra )
const mmm = new Tupla(1,2);
console.log(mmm)

// convertToText :: Integer -> String
const convertToText = x => String(x);

// addZeroStr :: String -> String
const addZeroStr =x => `${x} Zero    `;
// strip :: String -> String 
const strip = a => a.trim();

const tuples = [new Tupla(1,2), new Tupla(8, 90),  new Tupla(9, 90)]

console.log(tuples.map(t => t.map(compose(addZeroStr, convertToText))))


const cleanTupla = pipe(
    map,
    map,
)(compose(strip, addZeroStr, convertToText));
console.log(
    cleanTupla(tuples)
);