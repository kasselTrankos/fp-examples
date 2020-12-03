// parser
import { Parser } from './fp/monad/parser';
import {readFile, parse, prop, compose, writeFile, lift2} from './utils';
const FILE = 'demo-ex.js';

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