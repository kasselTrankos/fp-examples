// parser
import { pipe, } from 'ramda';
import {readFile, parse, prop, compose} from './utils';
import { Left, Right} from './fp/monad/either';
import { taggedSum } from 'daggy';

const element = taggedSum('element', {
    'Identifier': ['x'],
    'Literal': ['x'],
    'TemplateLiteral': ['x'],
    'MemberExpression': ['x'],
    'CallExpression': ['x'],
    'ArrowFunctionExpression': ['x'],
    'VariableDeclaration': ['x'],
    'VariableDeclarator': ['x'],
    'ObjectPattern': ['x'],
    'BinaryExpression': ['x'],
    'ArrayExpression': ['x'],
    'Nil': []
});
const getElement = x => (element[x.type] || element.Nil)(x);
const getValueOr = (value, other) =>  value.lenght ? value :  other;
const elementToString = e => e.toString();
const el = pipe(
    getElement,
    elementToString
);
const toElement = x => x.type 
    ? console.log(JSON.stringify(x), '\ndfj.sdlkfj') || Left(el(x))
    : x;
element.prototype.toString = function() {
    return this.cata({
        'Identifier': x => `${x.name}`,
        'Literal': x => `${x.raw}`,
        'TemplateLiteral': x => x,
        'ArrowFunctionExpression': x => `${getValueOr(x.params.map(el), '()')} => ${el(x.body)}`,
        'MemberExpression': x => `${el(x.object)}.${el(x.property)}`,
        'CallExpression': x => `${el(x.callee)}(${(x.arguments || []).map(el)})`,
        'VariableDeclaration': x => `${x.kind} ${(x.declarations || []).map(el)}`,
        'VariableDeclarator': x => `${el(x.id)} = ${el(x.init)}`,
        'ObjectPattern': x => x,
        'BinaryExpression': x => `${el(x.left)} ${x.operator} ${el(x.right)}`,
        'ArrayExpression': x => `[ ${x.elements.map(el)} ]`,
        'Nil': () => ''
    })
}

const FILE = 'demo-ex.js';

const secureProp = k => o => prop(k)(o)
    ? Right(o[k])
    : Left(' nop hay nada')

const toStr = a => b => `${a} ${b} = `
const toString = o => {
    const declarations  = toElement(o)
        // .chain(secureProp('callee'))
    return  `${declarations}`
    //`${prop('kind')(o)} ${declarations.id.name} = ${declarations.init.callee}`
}

readFile(FILE)
    .map(parse)
    .map(x => x.body.filter(a => a.type ==='VariableDeclaration'))
    .map(x => x.map(toString))
    // .map(a=> a[0])
    // .map(x=> x.filter(a => a.type === 'Identifier'))
    .fork(
        e => console.log('Error', e),
        x => console.log(x)
    );