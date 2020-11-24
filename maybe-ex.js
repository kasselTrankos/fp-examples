// maybe-ex.js is
import Maybe from './fp/monad/maybe';
import { pipe } from 'ramda';
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


// mapToMaybe :: ( String -> String) -> Maybe String -> Maybe String
const mapToMaybe = f => a => a.cata({
    Nothing: _=> Nothing,
    Just: x => Just(f(x))
});

// maybeToString :: Maybe -> String
const maybeToString = a => a.x ? a.x : 'nada'

const b = lookup(11)(list);
const tt = mapToMaybe(x => 'Hola ' +x)(b);
const proc = pipe(
    mapToMaybe(x => 'Hola soy '+ x),
    maybeToString
);
console.log(proc(b));