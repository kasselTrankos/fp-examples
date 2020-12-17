import { prop, compose, map, filter, pipeK } from  'ramda';
  .map(x => x.filter(getFileByExtension('json')))
  .map(prop('element'))
  .map(compose(stringify, prop('dependencies'), toJSON))
    .map(setProp(compose(properties, disabled))(true))
    .map(x => x.argv)
    .map(removeUnnecesary)
    .map(withDefaults)
const lift2 =  (f, a, b) => b.ap(a.map(f))
import { getFileByExtension, map, filter, parse, stringify } from './utils'; 
const getLines = pair => pair.map(map(map(filterLines(pair.fst().split('\n')))))
const getLines = pair => pair.map(map(map(filterLines(pair.fst().split('\n')))))
const getLines = pair => pair.map(map(map(filterLines(pair.fst().split('\n')))))
const splitLines = map(map(splitLine))
const splitLines = map(map(splitLine))
  all(folders.map(readfile));
const hightLigthFiles = files => files.map(highLighter)
    .map(compose(trim, prop('element')))
  .map(x => x.filter(getFileByExtension('js')))
  .map((hightLigthFiles))
  .map(map(map(filterIdenfiedMap)))
  .map(map(map(filterIdenfiedMap)))
  .map(map(map(filterIdenfiedMap)))
  .map(map(getLines))
  .map(map(getLines))
  .fork(console.erroreadFilesr, x => console.log(x.map(c => c.snd().unsafePerformIO())))
  .map(filter(getFileByExtension('js')))
  .map((hightLigthFiles))
  .map(map(map(filterIdenfiedMap)))
  .map(map(map(filterIdenfiedMap)))
  .map(map(map(filterIdenfiedMap)))
  .map(map(getLines))
  .map(map(getLines))
  .map(map(inside))
  .map(map(inside))
  .map(filter(c => c.length))
  .map(x => x.reduce((acc, c) => [...acc, ...c], []))
  .map(toString)
Algebra.prototype.map = function(f) {
    Call: (e, args) => `Call :: Expr -> (${e}, ${args.map(x=> x.toString())})`,
    Call: (e, args) => Expr.Call(e.flatten(), args.map(x => x.flatten())),
    Call: (e, args) => Expr.Call(e.flatten(), args.map(x => x.flatten())),
    Call: (e, args) => Expr.Call(e.apply(f), args.map(x => x.apply(f))),
import {map, chain, prop} from './utils';
var cat = B(map(prop('name')))(B(chain(toJSON))(readFile));
const c = a.concat(b).concat(RoseTree.empty()).map(x  => x + 12);
const lift = f => a => b => b.ap(a.map(f))
    .map(x => `${x.getHours()}:${x.getMinutes()}:${x.getSeconds()}`)
    .bimap(x => 3, x => x.map(y => y + 3))
    : T.extract() * fact(T.map(f), f);
    const map = f => match({ Nil, Cons: x => xs => Cons(x)(f(xs)) });
    const fromArray = ana({ map })(Arr.match({ Nil, Cons }));
    return { Nil, Cons, map, fromArray };
    const map = f => match({Zero, Succ: x => Succ(x)});
    return { Zero, Succ, map, bimap};
const map = f => xs => xs.map(f);
const map = f => xs => xs.map(f);
    return readdirSync(a).map(x => `${a}/${x}`);
  map(B(A)(toRoseTree)),
const lift2 = (f, a, b) => b.ap(a.map(f));
const klo = LinkedList.of(90).map(x => x + 8).ap(LinkedList.of(x => x + 900));
    Cons: () => this.reduce((acc, x)=> acc.map(a => [...a, x]), Maybe.Just([])),
import { map } from './utils';
const a = Just(1).map(x => x +2).chain(x => Just(x + 100))
Tupla.prototype.map = function(f) {
console.log(tuples.map(t => t.map(compose(addZeroStr, convertToText))))
console.log(tuples.map(t => t.map(compose(addZeroStr, convertToText))))
    map,
    map,
console.log(asa.map(toUpper));
const lift2 = f => a => b => b.ap(a.map(f));
const lift3 = f => a => b => c => c.ap(b.ap(a.map(f)));
import { pipe, getFiles, filter, map, isDirectory } from './utils';
import { map } from 'ramda';
    .map(z => z + ' hola')
console.log(_p.map(x => x + 8));
const allToLower = a => a.split('').map(toLower).join('');
 map: f => _Pair(x, f(y))
    .map(parse)
    .map(Parser.fromEsprima)
    .map(x => x.find( {
    .map(x => x.toString())
List.prototype.map = function(f) {
    return new List(this.head ? f(this.head) : null, this.tail ? this.tail.map(f) : null)
const data = v.map(m).map(cata({Left: i, Right: j}));
const data = v.map(m).map(cata({Left: i, Right: j}));
const d = data.map(x => coproduct(f, g, x))//.map(cata({Left: i, Right: j}));
    const ttt = d.reduce((acc, x)=> Right(acc.ap(x.map(concater))), Right(Multiply.empty()));
const a = log(0).map(x => x + 10).chain(x => IO(()=> Right(x))).unsafePerformIO().cata({
const ja = List.empty().concat(new List(5, new List(9, new List(6, List.of(2))))).concat(List.of(90)).concat(new List(100, List.of(8))).map(x => x * 3);
    .map(log(x + ' is a palindromo:  '))