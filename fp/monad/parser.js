// parser is
import { taggedSum } from 'daggy';
import { pair, pipe, } from 'ramda';

export const Parser = taggedSum('Parser', {
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

Parser.of = function(x) {
    return Parser[x.type] ? Parser[x.type](x) : Parser.Nil;
}

Parser.prototype.toString = function() {
    return this.cata({
        'ArrowFunctionExpression': x => `${x.params.length !== 1 ? '(' : ''}${x.params.map(p=> Parser.of(p).toString()).join(', ')}${x.params.length !== 1 ? ')' : ''} => ${Parser.of(x.body).toString()}`,
        'ArrayExpression': x => `[ ${x.elements.map(p=> Parser.of(p).toString())} ]`,
        'AssignmentExpression': x => `${Parser.of(x.left).toString()} = ${Parser.of(x.right).toString()}`,
        'BinaryExpression': x => `${Parser.of(x.left).toString()} ${x.operator} ${Parser.of(x.right).toString()}`,
        'BlockStatement': x => x.body.map(p=> Parser.of(p).toString()),
        'CallExpression': x => `${Parser.of(x.callee).toString()}(${x.arguments.map(p=> Parser.of(p).toString()).join(', ')})`,
        'ConditionalExpression': x => `${Parser.of(x.test).toString()} ? ${Parser.of(x.consequent).toString()} : ${Parser.of(x.alternate).toString()}`,
        'ExpressionStatement': x => Parser.of(x.expression).toString(),
        'FunctionExpression': x => `function(${x.params.map(p=> Parser.of(p).toString())}){\n\t${Parser.of(x.body).toString()}\n}`,
        'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.map(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
        'Identifier': x => `${x.name}`,
        'Literal': x => `${x.raw}`,
        'MemberExpression': x => `${Parser.of(x.object).toString()}.${Parser.of(x.property).toString()}`,
        'ObjectPattern': x => x,
        'ObjectExpression': x => `{\n\t\t${x.properties.map(p => Parser.of(p).toString()).join(',\n\t\t')} \n\t}`,
        'Program': x => x.body.map(p=> Parser.of(p).toString()),
        'Property': x => `${Parser.of(x.key).toString()}: ${Parser.of(x.value).toString()}`,
        'ReturnStatement': x => `return ${Parser.of(x.argument).toString()}`,
        'TemplateLiteral': x => `\`${x.expressions.map(p => `$\{${Parser.of(p).toString()}\}`).join('')}\``,
        'ThisExpression': _ => 'this',
        'VariableDeclaration': x => `${x.kind} ${x.declarations.map(p=> Parser.of(p).toString())}`,
        'VariableDeclarator': x => `${Parser.of(x.id).toString()} = ${Parser.of(x.init).toString()}`,
        'Nil': () => ''
    })
}