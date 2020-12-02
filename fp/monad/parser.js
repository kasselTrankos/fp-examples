// parser is
import { taggedSum } from 'daggy';

export const Parser = taggedSum('Parser', {
    'Program': ['body', 'sourceType', 'comments'],
    'TemplateLiteral': ['x'],
    'MemberExpression': ['x'],
    'CallExpression': ['x'],
    'ArrowFunctionExpression': ['x'],
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
    'Identifier': ['name'],
    'Literal': ['value', 'raw'],
    'VariableDeclarator': ['id', 'init'],
    'VariableDeclaration': ['declarations', 'kind'],
});

Parser.of = function(x) {
    return Parser[x.type] ? Parser[x.type](x) : Parser.Nil;
}

Parser.fromEsprima = function(x) {
    console.log(x)
    const getParser = x => {
        switch(x.type) {
            case 'Identifier':
                return Parser.Identifier(x.name)
            case 'Literal':
                return Parser.Literal(x.value, x.raw)
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
        'ArrowFunctionExpression': x => `${x.params.length !== 1 ? '(' : ''}${x.params.map(p=> Parser.of(p).toString()).join(', ')}${x.params.length !== 1 ? ')' : ''} => ${Parser.of(x.body).toString()}`,
        'ArrayExpression': x => `[ ${x.elementprototypeprototypes.map(p=> Parser.of(p).toString())} ]`,
        'AssignmentExpression': x => `${Parser.of(x.left).toString()} = ${Parser.of(x.right).toString()}`,
        'BinaryExpression': x => `${Parser.of(x.left).toString()} ${x.operator} ${Parser.of(x.right).toString()}`,
        'BlockStatement': x => x.body.map(p=> Parser.of(p).toString()),
        'CallExpression': x => `${Parser.of(x.callee).toString()}(${x.arguments.map(p=> Parser.of(p).toString()).join(', ')})`,
        'ConditionalExpression': x => `${Parser.of(x.test).toString()} ? ${Parser.of(x.consequent).toString()} : ${Parser.of(x.alternate).toString()}`,
        'ExpressionStatement': x => Parser.of(x.expression).toString(),
        'FunctionExpression': x => `function(${x.params.map(p=> Parser.of(p).toString())}){\n\t${Parser.of(x.body).toString()}\n}`,
        'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.map(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
        'Identifier': name => `${name}`,
        'Literal': (_, raw) => `${raw}`,
        'MemberExpression': x => `${Parser.of(x.object).toString()}.${Parser.of(x.property).toString()}`,
        'ObjectPattern': x => x,
        'ObjectExpression': x => `{\n\t\t${x.properties.map(p => Parser.of(p).toString()).join(',\n\t\t')} \n\t}`,
        'Program': (body, sourceType, comments) => body.map(p=> p.toString()),
        'Property': x => `${Parser.of(x.key).toString()}: ${Parser.of(x.value).toString()}`,
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
    
    return this.cata({
        'Program': (body, sourceType, comments) => Parser.Program(body.map(f), f(comments), f(sourceType)),
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
        'Identifier': x => Parser.Identifier(Object.assign({}, x, { name: f(x.name)})),
        'Literal': x => Parser.Literal(Object.assign({}, x, {raw: f(x.raw)})),
        'MemberExpression': x => Parser.of(x.object).find(m.type === 'MemberExpression' ? m.object : m) || Parser.of(x.property).find(m.type === 'MemberExpression' ? m.property : m),
        'ObjectPattern': x => x,
        'ObjectExpression': x => `{\n\t\t${x.properties.map(p => Parser.of(p).toString()).join(',\n\t\t')} \n\t}`,
        'Property': x => `${Parser.of(x.key).toString()}: ${Parser.of(x.value).toString()}`,
        'ReturnStatement': x => `return ${Parser.of(x.argument).toString()}`,
        'TemplateLiteral': x => `\`${x.expressions.map(p => `$\{${Parser.of(p).toString()}\}`).join('')}\``,
        'ThisExpression': _ => 'this',
        'VariableDeclaration': x => Parser.VariableDeclaration(Object.assign({}, x, {kind: f(x.kind), declarations: x.declarations.map(p=> Parser.of(p).map(f))})),
        'VariableDeclarator': x => Parser.VariableDeclarator(Object.assign({}, x, {id: Parser.of(x.id).map(f), init:Parser.of(x.init).map(f)})),
        'Nil': () => ''
    });
}