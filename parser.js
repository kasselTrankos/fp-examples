// parser
import { Parser } from './fp/monad/parser';
import { readfile } from './utils/fs'
import { parse, prop, compose, writeFile, lift2} from './utils';
const FILE = 'dom.js';
const x = [1,2,3]
// [
//     'dom.js',              'falgebra.js',
//     'fp-cli.js',           'fp-way.js',
//     'get-methods-name.js', 'hylomorphism.js',
//     'io-1.js',             'io-ex.js',
//     'iodate.js',           'lambda-ex.js',
//     'lambda-way.js',       'linked.js',
//     'mahoma.js',           'maybe-ex.js',
//     'obtain-files.js',     'pair.js',
//     'parser.js',           'prompt.js',
//     'rosetree-ex.js',      'signature.js',
//     'stream.js',           'task.js'
//   ]

//front to back
const add = f => a => b => [f(a), f(b)];
const parallel = f => g => a => b =>{
    let empty = []
    while(a.length && b.length){
        empty= [...empty, ...f(g)(a)(b)]
    }
    return empty;
}
    
const y = parallel(add)(x=> x.shift())([1,2, 3])(['a', 'b', 'c']);

console.log([...y])



const parser = readfile(FILE)
    .map(parse)
    // .map(x => x.find( {
        //     "type": "MemberExpression",
    //     "object": {
    //       "type": "Identifier",
    //       "name": "Parser"
    //     }
    //   }))
    // .map(parse)
    // .map(x => x.map(g => g === 'var' ? 'const': g))
    // .map(x => JSON.stringify(x))
    // .map(x => x.map(c => c.toString()))
    // .map(x => x.map(toString))
    .map(Parser.fromEsprima)
    // .map(x =>x.map(g => g === 'var' ? 'const' : g))
    .map(x => x.toString())
    // .map(x => x.join(''))
    // .chain(writeFile('cog.js'))
parser.fork(
    e => console.log('Error', e),
//     // console.log,
    x =>  console.log(x)//console.log(JSON.stringify(x))
);