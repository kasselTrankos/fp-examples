// parser is
import { taggedSum } from 'daggy';
import { call, map } from 'ramda';

export const Parser = taggedSum('Parser', {
    'ArrowFunctionExpression': ['id', 'params', 'body', 'generator', 'expression', 'async'],
    'CallExpression': ['callee', 'args'],
    'Program': ['body', 'sourceType', 'comments'],
    'TemplateLiteral': ['x'],
    'MemberExpression': ['x'],
    'ObjectPattern': ['x'],
    'BinaryExpression': ['x'],
    'ArrayExpression': ['x'],
    'AssignmentExpression': ['x'],
    'ExpressionStatement': ['x'],
    'FunctionExpression': ['x'],
    'BlockStatement': ['x'],
    'ReturnStatement': ['x'],
    'ThisExpression': ['x'],
    'ConditionalExpression': ['x'],
    'FunctionDeclaration': ['x'],
    'Nil': [],
    'Identifier': ['name'],
    'Literal': ['value', 'raw'],
    'ObjectExpression': ['properties'],
    'Property': ['key', 'computed', 'value'],
    'VariableDeclarator': ['id', 'init'],
    'VariableDeclaration': ['declarations', 'kind'],
});

Parser.of = function(x) {
    return Parser[x.type] ? Parser[x.type](x) : Parser.Nil;
}

Parser.fromEsprima = function(x) {
    const getParser = x => {
        switch(x.type) {
            case 'ArrowFunctionExpression':
                return Parser.ArrowFunctionExpression(x.id, x.params.map(getParser), getParser(x.body), x.generator, x.expression, x.async);
            case 'CallExpression':
                return Parser.CallExpression(getParser(x.callee), x.arguments.map(getParser));
            case 'Identifier':
                return Parser.Identifier(x.name);
            case 'Literal':
                return Parser.Literal(x.value, x.raw);
            case 'ObjectExpression':
                return Parser.ObjectExpression(x.properties.map(getParser));
            case 'Property':
                return Parser.Property(getParser(x.key), x.computed, getParser(x.value))
            case 'VariableDeclaration':
                return Parser.VariableDeclaration(x.declarations.map(getParser), x.kind)
            case 'VariableDeclarator':
                return Parser.VariableDeclarator(getParser(x.id), getParser(x.init));
            default:
                return Parser.Nil;
        }
    };
    return Parser.Program(x.body.map(getParser), x.sourceType, x.comments);
}

Parser.prototype.toString = function() {
    
    return this.cata({
        'ArrowFunctionExpression': (id, params, body, generator, expression, async) => `${async ? 'async': ''} ${params.length !== 1 ? '(' : ''}${params.map(p=> p.toString()).join(', ')}${params.length !== 1 ? ')' : ''} => ${body.toString()}`,
        'ArrayExpression': x => `[ ${x.elementprototypeprototypes.map(p=> Parser.of(p).toString())} ]`,
        'AssignmentExpression': x => `${Parser.of(x.left).toString()} = ${Parser.of(x.right).toString()}`,
        'BinaryExpression': x => `${Parser.of(x.left).toString()} ${x.operator} ${Parser.of(x.right).toString()}`,
        'BlockStatement': x => x.body.map(p=> Parser.of(p).toString()),
        'CallExpression': (callee, args) => `${callee.toString()}(${args.map(p => p.toString()).join(', ')}`,
        'ConditionalExpression': x => `${Parser.of(x.test).toString()} ? ${Parser.of(x.consequent).toString()} : ${Parser.of(x.alternate).toString()}`,
        'ExpressionStatement': x => Parser.of(x.expression).toString(),
        'FunctionExpression': x => `function(${x.params.map(p=> Parser.of(p).toString())}){\n\t${Parser.of(x.body).toString()}\n}`,
        'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.map(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
        'Identifier': name => name,
        'Literal': (_, raw) => raw,
        'MemberExpression': x => `${Parser.of(x.object).toString()}.${Parser.of(x.property).toString()}`,
        'ObjectPattern': x => x,
        'ObjectExpression': properties => `{${properties.map(p => p.toString()).join(', ')}}`,
        'Program': (body, sourceType, comments) => body.map(p=> p.toString()),
        'Property': (key, composed, value) => `${key.toString()}: ${value.toString()}`,
        'ReturnStatement': x => `return ${Parser.of(x.argument).toString()}`,
        'TemplateLiteral': x => `\`${x.expressions.map(p => `$\{${Parser.of(p).toString()}\}`).join('')}\``,
        'ThisExpression': _ => 'this',
        'VariableDeclaration': (declarations, kind) => `${kind} ${declarations.map(p=> p.toString())}`,
        'VariableDeclarator': (id, init) => `${id.toString()} = ${init.toString()}`,
        'Nil': () => ''
    })
}

Parser.prototype.find = function(m) {
    return this.cata({
        'Program': x =>x.body.map(x => Parser.of(x).find( m.type === 'Program' ? m.body : m)),
        'ArrowFunctionExpression': x => x.type === 'ArrowFunctionExpression',
        'ArrayExpression': x => x,
        'AssignmentExpression': x => Parser.of(x.left).find(m.type ==='AssignmentExpression' ? m.left : m) || Parser.of(x.right).find(m.type ==='AssignmentExpression' ? m.right : m),
        'BinaryExpression': x => x,
        'BlockStatement': x => x.body.map(p=> Parser.of(p).find(m.type === 'BlockStatement' ? m.body : m)),
        'CallExpression': x => `${Parser.of(x.callee).toString()}(${x.arguments.map(p=> Parser.of(p).toString()).join(', ')})`,
        'ConditionalExpression': x => `${Parser.of(x.test).toString()} ? ${Parser.of(x.consequent).toString()} : ${Parser.of(x.alternate).toString()}`,
        'ExpressionStatement': x => Parser.of(x.expression).find(m.type === 'ExpressionStatement' ? m.expression : m),
        'FunctionExpression': x => x.params.map(p=> Parser.of(p).find(m.type==='FunctionExpression' ? m.params : m)) && Parser.of(x.body).find(m.type === 'FunctionExpression' ? m.body : m),
        'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.map(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
        'Identifier': x =>  x.name === m.name ? this : false,
        'Literal': x => `${x.raw}`,
        'MemberExpression': x => Parser.of(x.object).find(m.type === 'MemberExpression' ? m.object : m) || Parser.of(x.property).find(m.type === 'MemberExpression' ? m.property : m),
        'ObjectPattern': x => x,
        'ObjectExpression': x => `{\n\t\t${x.properties.map(p => Parser.of(p).toString()).join(',\n\t\t')} \n\t}`,
        'Property': x => `${Parser.of(x.key).toString()}: ${Parser.of(x.value).toString()}`,
        'ReturnStatement': x => `return ${Parser.of(x.argument).toString()}`,
        'TemplateLiteral': x => `\`${x.expressions.map(p => `$\{${Parser.of(p).toString()}\}`).join('')}\``,
        'ThisExpression': _ => 'this',
        'VariableDeclaration': x => `${x.kind} ${x.declarations.map(p=> Parser.of(p).toString())}`,
        'VariableDeclarator': x => `${Parser.of(x.id).toString()} = ${Parser.of(x.init).toString()}`,
        'Nil': () => ''
    });
}
Parser.prototype.map = function(f) {
    const execute = x => x.map(f);
    return this.cata({
        'ArrowFunctionExpression': (id, params, body, generator, expression, async) => Parser.ArrowFunctionExpression(f(id), params.map(execute), body.map(f), f(generator), f(expression), f(async)),
        'CallExpression': (callee, args) => Parser.CallExpression(callee.map(f), args.map(execute)),
        'Program': (body, sourceType, comments) => Parser.Program(body.map(execute), f(comments), f(sourceType)),
        'ArrayExpression': x => x,
        'AssignmentExpression': x => Parser.of(x.left).find(m.type ==='AssignmentExpression' ? m.left : m) || Parser.of(x.right).find(m.type ==='AssignmentExpression' ? m.right : m),
        'BinaryExpression': x => x,
        'BlockStatement': x => x.body.map(p=> Parser.of(p).find(m.type === 'BlockStatement' ? m.body : m)),
        'ConditionalExpression': x => `${Parser.of(x.test).toString()} ? ${Parser.of(x.consequent).toString()} : ${Parser.of(x.alternate).toString()}`,
        'ExpressionStatement': x => Parser.of(x.expression).find(m.type === 'ExpressionStatement' ? m.expression : m),
        'FunctionExpression': x => x.params.map(p=> Parser.of(p).find(m.type==='FunctionExpression' ? m.params : m)) && Parser.of(x.body).find(m.type === 'FunctionExpression' ? m.body : m),
        'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.map(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
        'Identifier': name => Parser.Identifier(f(name)),
        'Literal': (value, raw) => Parser.Literal(f(value), f(raw)),
        'MemberExpression': x => Parser.of(x.object).find(m.type === 'MemberExpression' ? m.object : m) || Parser.of(x.property).find(m.type === 'MemberExpression' ? m.property : m),
        'ObjectPattern': x => x,
        'ObjectExpression': properties => Parser.ObjectExpression(properties.map(execute)),
        'Property': (key, computed, value) => Parser.Property(key.map(f), f(computed), value.map(f)),
        'ReturnStatement': x => `return ${Parser.of(x.argument).toString()}`,
        'TemplateLiteral': x => `\`${x.expressions.map(p => `$\{${Parser.of(p).toString()}\}`).join('')}\``,
        'ThisExpression': _ => 'this',
        'VariableDeclaration': (declarations, kind) => Parser.VariableDeclaration(declarations.map(execute), f(kind)),
        'VariableDeclarator': (id, init) => Parser.VariableDeclarator(id.map(f), init.map(f)),
        'Nil': () => ''
    });
}