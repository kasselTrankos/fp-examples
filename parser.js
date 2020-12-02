// parser
import { Parser } from './fp/monad/parser';
import {readFile, parse, prop, compose, writeFile} from './utils';
import { Left, Right} from './fp/monad/either';
import { zip } from 'ramda';



const FILE = 'demo-ex.js';

// getDeclarations :: Object -> Either String String
const getDeclarations = x => x.type
    ? Right(Parser.of(x).toString())
    : Left(' Bad declaration');

const toString = arr => arr.reduce((acc, x)=> `${acc}${x}\n`, '')
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
        // .map(x => x.extract())
        // .chain(writeFile('cog.js'))
    .map(Parser.fromEsprima)
    .map(x =>x.map(g => g === 'var' ? 'const' : g))
    .map(x => x.toString())
parser.fork(
    e => console.log('Error', e),
    x => console.log(JSON.stringify(x))
);