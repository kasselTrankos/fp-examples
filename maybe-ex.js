// maybe-ex.js is
import Maybe from './fp/monad/maybe';
const { Just, Nothing} = Maybe;


const a = Just(1).map(x => x +2).chain(x => Just(x + 100))
console.log(a)