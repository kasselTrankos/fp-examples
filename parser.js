// parser
import { Parser } from './fp/monad/parser';
import {readFile, parse, prop, compose, writeFile} from './utils';
import { Left, Right} from './fp/monad/either';



const FILE = 'demo-ex.js';

// getDeclarations :: Object -> Either String String
const getDeclarations = x => x.type 
    ? Right(Parser.of(x).toString())
    : Left(' Bad declaration');

const toString = arr => arr.reduce((acc, x)=> `${acc}${x}\n`, '')
readFile(FILE)
    .map(parse)
    .map(x => JSON.stringify(x))
    // .map(getDeclarations)
    // .map(x => x.map(toString))
    // .map(x => x.extract())
    // .chain(writeFile('cog.js'))
    .fork(
        e => console.log('Error', e),
        x => console.log(x)
    );