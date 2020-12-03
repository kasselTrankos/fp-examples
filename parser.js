// parser
import { Parser } from './fp/monad/parser';
import {readFile, parse, prop, compose, writeFile, lift2} from './utils';
const FILE = 'demo-ex.js';
const x = [1,2,3]

//front to back
while(x.length){
 var value = x.shift();
 console.log(value);
}
const add = f => a => b => [f(a), f(b)];
const rest = f => g => a => b =>{
    let empty = []
    while(a.length && b.length){
        empty= [...empty, ...f(g)(a)(b)]
    }
    return empty;
}
    

const y = rest(add)(x=> x.shift())([1,2])(['a', 'b']);

console.log([...y])



const parser = readFile(FILE)
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
    x => console.log(JSON.stringify(x))
);