// parser
import { pipe, } from 'ramda';
import {readFile, parse, prop, compose, writeFile} from './utils';
import { Left, Right} from './fp/monad/either';
import { taggedSum } from 'daggy';

const element = taggedSum('element', {
    'Identifier': ['x'],
    'Literal': ['x'],
    'Program': ['x'],
    'TemplateLiteral': ['x'],
    'MemberExpression': ['x'],
    'CallExpression': ['x'],
    'ArrowFunctionExpression': ['x'],
    'VariableDeclaration': ['x'],
    'VariableDeclarator': ['x'],
    'ObjectPattern': ['x'],
    'BinaryExpression': ['x'],
    'ArrayExpression': ['x'],
    'AssignmentExpression': ['x'],
    'ExpressionStatement': ['x'],
    'FunctionExpression': ['x'],
    'BlockStatement': ['x'],
    'ReturnStatement': ['x'],
    'ThisExpression': ['x'],
    'ObjectExpression': ['x'],
    'Property': ['x'],
    'ConditionalExpression': ['x'],
    'FunctionDeclaration': ['x'],
    'Nil': [],
});
const getElement = x => element[x.type] ? element[x.type](x) : element.Nil;
const getValueOr = (value, other) =>  value.length ? value :  other;
const elementToString = e => e.toString();
const el = pipe(
    getElement,
    elementToString
);
element.prototype.toString = function() {
    return this.cata({
        'Identifier': x => `${x.name}`,
        'Literal': x => `${x.raw}`,
        'TemplateLiteral': x => x,
        'ThisExpression': x => 'this',
        'Program': x => x.body.map(el),
        'ArrowFunctionExpression': x => `${getValueOr(x.params.map(el), '()')} => ${el(x.body)}`,
        'MemberExpression': x => `${el(x.object)}.${el(x.property)}`,
        'CallExpression': x => `${el(x.callee)}(${(x.arguments || []).map(el)})`,
        'VariableDeclaration': x => `${x.kind} ${(x.declarations || []).map(el)}`,
        'VariableDeclarator': x => `${el(x.id)} = ${el(x.init)}`,
        'ObjectPattern': x => x,
        'BinaryExpression': x => `${el(x.left)} ${x.operator} ${el(x.right)}`,
        'ArrayExpression': x => `[ ${x.elements.map(el)} ]`,
        'ExpressionStatement': x => el(x.expression),
        'AssignmentExpression': x => `${el(x.left)} = ${el(x.right)}`,
        'FunctionExpression': x => `function(${x.params.map(el)}){${el(x.body)}}`,
        'ReturnStatement': x => `return ${el(x.argument)}`,
        'BlockStatement': x => x.body.map(el),
        'ObjectExpression': x => `{ ${x.properties.map(el)} }`,
        'Property': x => `${el(x.key)}: ${el(x.value)}`,
        'FunctionDeclaration': x => `function ${el(x.id)}(${x.params.map(el)}) {${el(x.body)}}`,
        'ConditionalExpression': x => `${el(x.test)} ? ${el(x.consequent)} : ${el(x.alternate)}`,
        'Nil': () => ''
    })
}

const FILE = 'demo-ex.js';

// getDeclarations :: Object -> Either String String
const getDeclarations = x => x.type 
    ? Right(el(x))
    : Left(' Bad declaration');

const toString = arr => arr.reduce((acc, x)=> `${acc}${x}\n`, '')
readFile(FILE)
    .map(parse)
    // .map(x => JSON.stringify(x))
    .map(getDeclarations)
    .map(x => x.map(toString))
    .map(x => x.extract())
    .chain(writeFile('cog.js'))
    .fork(
        e => console.log('Error', e),
        x => console.log(x)
    );