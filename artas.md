#map

## cli-folder.js
* line 4: import { prop, compose, **map**, filter, pipeK } from  'ramda';
* line 30:   .**map**(x => x.filter(getFileByExtension('json')))
* line 32:   .**map**(prop('element'))
* line 34:   .**map**(compose(stringify, prop('dependencies'), toJSON))

## cli.js

## covariant.js

## dom.js
* line 19:     .**map**(setProp(compose(properties, disabled))(true))

## falgebra.js

## fp-cli.js
* line 28:     .**map**(x => x.argv)
* line 29:     .**map**(removeUnnecesary)
* line 30:     .**map**(withDefaults)

## fp-way.js
* line 6: const lift2 =  (f, a, b) => b.ap(a.**map**(f))

## get-methods-name.js
* line 5: import { getFileByExtension, filter, stringify, **map** } from './utils'; 
* line 62:   compose(**map**(getLoc), getUnsafeProp, filter(getIdenfier(pattern))
* line 67: const tokenizeFiles = files => files.**map**(tokenizePair)
* line 70: const readFiles = files => all(files.**map**(readfile));
* line 83:   ...file.**map**(setMarkDown('##')), 
* line 84:   ...locs.**map**(getFileContentListMarkDown(lines))
* line 90:     **map**(joinIntoLines),
* line 91:     **map**(merge((lines, locs) => getFileMarkdown(files.splice(0, 1))(lines, locs)))
* line 98:   .**map**(tokenizeFiles)
* line 99:   .**map**(map(map(getLinePattern(pattern))))
* line 99:   .map(**map**(map(getLinePattern(pattern))))
* line 99:   .map(map(**map**(getLinePattern(pattern))))
* line 100:   .**map**(getFilesMarkdownCoincidences(files))
* line 101:   .**map**(setTitle(pattern))
* line 102:   .**map**(joinIntoLines)
* line 106:   .**map**(filter(getFileByExtension('js')));
* line 110:     .**map**(compose(trim, prop('element')))

## hylomorphism.js
* line 55: Algebra.prototype.**map** = function(f) {
* line 121:     Call: (e, args) => `Call :: Expr -> (${e}, ${args.**map**(x=> x.toString())})`,
* line 130:     Call: (e, args) => Expr.Call(e.flatten(), args.**map**(x => x.flatten())),
* line 141:     Call: (e, args) => Expr.Call(e.flatten(), args.**map**(x => x.flatten())),
* line 157:     Call: (e, args) => Expr.Call(e.apply(f), args.**map**(x => x.apply(f))),

## io-1.js

## io-ex.js
* line 9: import {**map**, chain, prop} from './utils';
* line 23: var cat = B(**map**(prop('name')))(B(chain(toJSON))(readFile));
* line 30: const c = a.concat(b).concat(RoseTree.empty()).**map**(x  => x + 12);

## iodate.js
* line 10: const lift = f => a => b => b.ap(a.**map**(f))
* line 14:     .**map**(x => `${x.getHours()}:${x.getMinutes()}:${x.getSeconds()}`)
* line 24:     .bimap(x => 3, x => x.**map**(y => y + 3))
* line 72:     : T.extract() * fact(T.**map**(f), f);
* line 106:     const **map** = f => match({ Nil, Cons: x => xs => Cons(x)(f(xs)) });
* line 107:     const fromArray = ana({ **map** })(Arr.match({ Nil, Cons }));
* line 109:     return { Nil, Cons, **map**, fromArray };
* line 116:     const **map** = f => match({Zero, Succ: x => Succ(x)});
* line 118:     return { Zero, Succ, **map**, bimap};

## lambda-ex.js

## lambda-way.js
* line 8: const **map** = f => xs => xs.map(f);
* line 8: const map = f => xs => xs.**map**(f);
* line 15:     return readdirSync(a).**map**(x => `${a}/${x}`);
* line 36:   **map**(B(A)(toRoseTree)),

## linked.js
* line 19: const lift2 = (f, a, b) => b.ap(a.**map**(f));
* line 29: const klo = LinkedList.of(90).**map**(x => x + 8).ap(LinkedList.of(x => x + 900));
* line 54:     Cons: () => this.reduce((acc, x)=> acc.**map**(a => [...a, x]), Maybe.Just([])),

## mahoma.js

## maybe-ex.js
* line 5: import { **map** } from './utils';
* line 9: const a = Just(1).**map**(x => x +2).chain(x => Just(x + 100))
* line 44: Tupla.prototype.**map** = function(f) {
* line 75: console.log(tuples.**map**(t => t.map(compose(addZeroStr, convertToText))))
* line 75: console.log(tuples.map(t => t.**map**(compose(addZeroStr, convertToText))))
* line 79:     **map**,
* line 80:     **map**,
* line 100: console.log(asa.**map**(toUpper));
* line 101: const lift2 = f => a => b => b.ap(a.**map**(f));
* line 102: const lift3 = f => a => b => c => c.ap(b.ap(a.**map**(f)));

## obtain-files.js
* line 3: import { pipe, getFiles, filter, **map**, isDirectory } from './utils';

## pair.js
* line 8: import { **map** } from 'ramda';
* line 98:     .**map**(z => z + ' hola')
* line 122: console.log(_p.**map**(x => x + 8));
* line 131: const allToLower = a => a.split('').**map**(toLower).join('');
* line 161:  **map**: f => _Pair(x, f(y))

## parser.js
* line 38:     .**map**(parse)
* line 44:     .**map**(Parser.fromEsprima)
* line 45:     .**map**(x => x.find( {
* line 53:     .**map**(x => x.toString())

## prompt.js

## rosetree-ex.js

## signature.js
* line 43: List.prototype.**map** = function(f) {
* line 44:     return new List(this.head ? f(this.head) : null, this.tail ? this.tail.**map**(f) : null)
* line 122: const data = v.**map**(m).map(cata({Left: i, Right: j}));
* line 122: const data = v.map(m).**map**(cata({Left: i, Right: j}));
* line 133: const d = data.**map**(x => coproduct(f, g, x))//.map(cata({Left: i, Right: j}));
* line 147:     const ttt = d.reduce((acc, x)=> Right(acc.ap(x.**map**(concater))), Right(Multiply.empty()));
* line 158: const a = log(0).**map**(x => x + 10).chain(x => IO(()=> Right(x))).unsafePerformIO().cata({
* line 163: const ja = List.empty().concat(new List(5, new List(9, new List(6, List.of(2))))).concat(List.of(90)).concat(new List(100, List.of(8))).**map**(x => x * 3);

## state.js

## stream.js

## task.js
* line 14:     .**map**(log(x + ' is a palindromo:  '))