// parser is
import { taggedSum } from 'daggy';

export const Parser = taggedSum('Parser', {
    'ArrowFunctionExpression': ['id', 'params', 'body', 'generator', 'expression', 'async'],
    'CallExpression': ['callee', 'args'],
    'BlockStatement': ['body', 'generator', 'expression', 'async'],
    'CatchClause': ['param', 'body'],
    'ExportNamedDeclaration': ['declaration'],
    'Program': ['body', 'sourceType', 'comments'],
    'MemberExpression': ['object', 'property', 'computed'],
    'ObjectPattern': ['x'],
    'BinaryExpression': ['x'],
    'ArrayExpression': ['x'],
    'AssignmentExpression': ['x'],
    'ExpressionStatement': ['expression'],
    'FunctionExpression': ['x'],
    'ThisExpression': ['x'],
    'ConditionalExpression': ['x'],
    'FunctionDeclaration': ['x'],
    'Nil': [],
    'TemplateValue': ['el'],
    'Identifier': ['name'],
    'Literal': ['value', 'raw'],
    'ObjectExpression': ['properties'],
    'RestElement': ['argument'],
    'ReturnStatement': ['argument'],
    'Property': ['key', 'computed', 'value'],
    'TemplateLiteral': ['both'],
    'TemplateElement': ['value', 'tail'],
    'TryStatement': ['block', 'handler'],
    'VariableDeclarator': ['id', 'init'],
    'VariableDeclaration': ['declarations', 'kind'],
});

Parser.of = function(x) {
    return Parser[x.type] ? Parser[x.type](x) : Parser.Nil;
}

Parser.fromEsprima = function(x) {
    const interpolate = (a, b) => {
        const [head, ...tail] = a;
        return b.reduce((acc, x) =>[...acc, x, ...tail.splice(0, 1)] ,[head]);
    }
    const getParser = x => {
        switch(x.type) {
            case 'ArrowFunctionExpression':
                return Parser.ArrowFunctionExpression(x.id, x.params.map(getParser), getParser(x.body), x.generator, x.expression, x.async);
            case 'CallExpression':
                return Parser.CallExpression(getParser(x.callee), x.arguments.map(getParser));
            case 'BlockStatement':
                return Parser.BlockStatement(x.body.map(getParser), x.generator, x.expression, x.async);
            case 'CatchClause':
                return Parser.CatchClause(getParser(x.param), getParser(x.body));
            case 'ExpressionStatement':
                return Parser.ExpressionStatement(getParser(x.expression));
            case 'ExportNamedDeclaration':
                return Parser.ExportNamedDeclaration(getParser(x.declaration))
            case 'Identifier':
                return Parser.Identifier(x.name);
            case 'Literal':
                return Parser.Literal(x.value, x.raw);
            case 'MemberExpression':
                return Parser.MemberExpression(getParser(x.object), getParser(x.property), x.computed);
            case 'ObjectExpression':
                return Parser.ObjectExpression(x.properties.map(getParser));
            case 'Property':
                return Parser.Property(getParser(x.key), x.computed, getParser(x.value));
            case 'RestElement':
                return Parser.RestElement(getParser(x.argument));
            case 'ReturnStatement':
                return Parser.ReturnStatement(getParser(x.argument));
            case 'TemplateLiteral':
                return Parser.TemplateLiteral(
                    interpolate(x.quasis.map(getParser), 
                        x.expressions.map(x => Parser.TemplateValue(getParser(x))))
                );
            case 'TemplateElement':
                return Parser.TemplateElement(x.value, x.tail);
            case 'TryStatement':
                return Parser.TryStatement(getParser(x.block), getParser(x.handler));
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
        'ArrowFunctionExpression': (id, params, body, generator, expression, async) => `${async ? 'async ': ''}${params.length !== 1 ? '(' : ''}${params.map(p=> p.toString()).join(', ')}${params.length !== 1 ? ')' : ''} => ${body.toString()}`,
        'ArrayExpression': x => `[ ${x.elementprototypeprototypes.map(p=> Parser.of(p).toString())} ]`,
        'AssignmentExpression': x => `${Parser.of(x.left).toString()} = ${Parser.of(x.right).toString()}`,
        'BinaryExpression': x => `${Parser.of(x.left).toString()} ${x.operator} ${Parser.of(x.right).toString()}`,
        'BlockStatement': (body, generator, expression, async) => `{\n${body.map(p=> p.toString()).join('\n')}\n}`,
        'CallExpression': (callee, args) => `${callee.toString()}(${args.map(p => p.toString()).join(', ')})`,
        'CatchClause': (param, body) => `catch(${param.toString()})${body.toString()}`,
        'ConditionalExpression': x => `${Parser.of(x.test).toString()} ? ${Parser.of(x.consequent).toString()} : ${Parser.of(x.alternate).toString()}`,
        'ExpressionStatement': expression => expression.toString(),
        'ExportNamedDeclaration': declaration => `export ${declaration.toString()}`,
        'FunctionExpression': x => `function(${x.params.map(p=> Parser.of(p).toString())}){\n\t${Parser.of(x.body).toString()}\n}`,
        'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.map(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
        'TemplateValue': name => `\$\{${name.toString()}\}`,
        'Identifier': name => name,
        'Literal': (_, raw) => raw,
        'MemberExpression': (object, property, computed) => `${object.toString()}.${property.toString()}`,
        'ObjectPattern': x => x,
        'ObjectExpression': properties => `{${properties.map(p => p.toString()).join(', ')}}`,
        'Program': (body, sourceType, comments) => body.map(p=> p.toString()),
        'Property': (key, composed, value) => `${key.toString()}: ${value.toString()}`,
        'RestElement': argument => `...${argument.toString()}`,
        'ReturnStatement': argument => `return ${argument.toString()}`,
        'TryStatement': (block, handler) => `try ${block.toString()}${handler.toString()}`,
        'TemplateLiteral': both => `\`${both.map(p => p.toString()).join('')}\``,
        'TemplateElement': (value, tail) => value.raw,
        'ThisExpression': _ => 'this',
        'VariableDeclaration': (declarations, kind) => `${kind} ${declarations.map(p=> p.toString())}`,
        'VariableDeclarator': (id, init) => `${id.toString()} = ${init.toString()}`,
        'Nil': () => ''
    })
}
Parser.prototype.find = function(pattern) {
    console.log(pattern)
    return this.cata({
        'ArrowFunctionExpression': (id, params, body, generator, expression, async) => `${async ? 'async ': ''}${params.length !== 1 ? '(' : ''}${params.map(p=> p.toString()).join(', ')}${params.length !== 1 ? ')' : ''} => ${body.toString()}`,
        'ArrayExpression': x => `[ ${x.elementprototypeprototypes.map(p=> Parser.of(p).toString())} ]`,
        'AssignmentExpression': x => `${Parser.of(x.left).toString()} = ${Parser.of(x.right).toString()}`,
        'BinaryExpression': x => `${Parser.of(x.left).toString()} ${x.operator} ${Parser.of(x.right).toString()}`,
        'BlockStatement': (body, generator, expression, async) => `{\n${body.map(p=> p.toString()).join('\n')}\n}`,
        'CallExpression': (callee, args) => `${callee.toString()}(${args.map(p => p.toString()).join(', ')})`,
        'CatchClause': (param, body) => `catch(${param.toString()})${body.toString()}`,
        'ConditionalExpression': x => `${Parser.of(x.test).toString()} ? ${Parser.of(x.consequent).toString()} : ${Parser.of(x.alternate).toString()}`,
        'ExpressionStatement': expression => expression.toString(),
        'ExportNamedDeclaration': declaration => `export ${declaration.toString()}`,
        'FunctionExpression': x => `function(${x.params.map(p=> Parser.of(p).toString())}){\n\t${Parser.of(x.body).toString()}\n}`,
        'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.map(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
        'TemplateValue': name => `\$\{${name.toString()}\}`,
        'Identifier': name => name,
        'Literal': (_, raw) => raw,
        'MemberExpression': (object, property, computed) => `${object.toString()}.${property.toString()}`,
        'ObjectPattern': x => x,
        'ObjectExpression': properties => `{${properties.map(p => p.toString()).join(', ')}}`,
        'Program': (body, sourceType, comments) => body.map(p=> p.toString()),
        'Property': (key, composed, value) => `${key.toString()}: ${value.toString()}`,
        'RestElement': argument => `...${argument.toString()}`,
        'ReturnStatement': argument => `return ${argument.toString()}`,
        'TryStatement': (block, handler) => `try ${block.toString()}${handler.toString()}`,
        'TemplateLiteral': both => `\`${both.map(p => p.toString()).join('')}\``,
        'TemplateElement': (value, tail) => value.raw,
        'ThisExpression': _ => 'this',
        'VariableDeclaration': (declarations, kind) => `${kind} ${declarations.map(p=> p.toString())}`,
        'VariableDeclarator': (id, init) => `${id.toString()} = ${init.toString()}`,
        'Nil': () => ''
    })
}

// Parser.prototype.find = function(m) {
//     return this.cata({
//         'Program': x =>x.body.map(x => Parser.of(x).find( m.type === 'Program' ? m.body : m)),
//         'ArrowFunctionExpression': x => x.type === 'ArrowFunctionExpression',
//         'ArrayExpression': x => x,
//         'AssignmentExpression': x => Parser.of(x.left).find(m.type ==='AssignmentExpression' ? m.left : m) || Parser.of(x.right).find(m.type ==='AssignmentExpression' ? m.right : m),
//         'BinaryExpression': x => x,
//         'BlockStatement': x => x.body.map(p=> Parser.of(p).find(m.type === 'BlockStatement' ? m.body : m)),
//         'CallExpression': x => `${Parser.of(x.callee).toString()}(${x.arguments.map(p=> Parser.of(p).toString()).join(', ')})`,
//         'ConditionalExpression': x => `${Parser.of(x.test).toString()} ? ${Parser.of(x.consequent).toString()} : ${Parser.of(x.alternate).toString()}`,
//         'ExpressionStatement': x => Parser.of(x.expression).find(m.type === 'ExpressionStatement' ? m.expression : m),
//         'FunctionExpression': x => x.params.map(p=> Parser.of(p).find(m.type==='FunctionExpression' ? m.params : m)) && Parser.of(x.body).find(m.type === 'FunctionExpression' ? m.body : m),
//         'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.map(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
//         'Identifier': x =>  x.name === m.name ? this : false,
//         'Literal': x => `${x.raw}`,
//         'MemberExpression': x => Parser.of(x.object).find(m.type === 'MemberExpression' ? m.object : m) || Parser.of(x.property).find(m.type === 'MemberExpression' ? m.property : m),
//         'ObjectPattern': x => x,
//         'ObjectExpression': x => `{\n\t\t${x.properties.map(p => Parser.of(p).toString()).join(',\n\t\t')} \n\t}`,
//         'Property': x => `${Parser.of(x.key).toString()}: ${Parser.of(x.value).toString()}`,
//         'RestElement': argument => f(argument),
//         'ReturnStatement': x => `return ${Parser.of(x.argument).toString()}`,
//         'TemplateLiteral': x => `\`${x.expressions.map(p => `$\{${Parser.of(p).toString()}\}`).join('')}\``,
//         'ThisExpression': _ => 'this',
//         'VariableDeclaration': x => `${x.kind} ${x.declarations.map(p=> Parser.of(p).toString())}`,
//         'VariableDeclarator': x => `${Parser.of(x.id).toString()} = ${Parser.of(x.init).toString()}`,
//         'Nil': () => ''
//     });
// }
Parser.prototype.map = function(f) {
    const execute = x => x.map(f);
    return this.cata({
        'ArrowFunctionExpression': (id, params, body, generator, expression, async) => Parser.ArrowFunctionExpression(f(id), params.map(execute), body.map(f), f(generator), f(expression), f(async)),
        'CallExpression': (callee, args) => Parser.CallExpression(callee.map(f), args.map(execute)),
        'Program': (body, sourceType, comments) => Parser.Program(body.map(execute), f(comments), f(sourceType)),
        'ArrayExpression': x => x,
        'AssignmentExpression': x => Parser.of(x.left).find(m.type ==='AssignmentExpression' ? m.left : m) || Parser.of(x.right).find(m.type ==='AssignmentExpression' ? m.right : m),
        'BinaryExpression': x => x,
        'BlockStatement': (body, generator, expression, async) => Parser.BlockStatement(body.map(execute), f(generator), f(expression), f(async)),
        'CatchClause': (param, body) => Parser.CatchClause(param.map(f), body.map(f)),
        'ConditionalExpression': x => `${Parser.of(x.test).toString()} ? ${Parser.of(x.consequent).toString()} : ${Parser.of(x.alternate).toString()}`,
        'ExpressionStatement': expression => Parser.ExpressionStatement(expression.map(f)),
        'ExportNamedDeclaration': declaration => Parser.ExportNamedDeclaration(declaration.map(f)),
        'FunctionExpression': x => x.params.map(p=> Parser.of(p).find(m.type==='FunctionExpression' ? m.params : m)) && Parser.of(x.body).find(m.type === 'FunctionExpression' ? m.body : m),
        'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.map(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
        'Identifier': name => Parser.Identifier(f(name)),
        'Literal': (value, raw) => Parser.Literal(f(value), f(raw)),
        'MemberExpression': (object, property, computed) => Parser.MemberExpression(object.map(f), property.map(f), computed),
        'ObjectPattern': x => x,
        'ObjectExpression': properties => Parser.ObjectExpression(properties.map(execute)),
        'Property': (key, computed, value) => Parser.Property(key.map(f), f(computed), value.map(f)),
        'RestElement': argument => Parser.RestElement(argument.map(f)),
        'ReturnStatement': argument => Parser.ReturnStatement(argument.map(f)),
        'TemplateValue': el => el.map(f),
        'TemplateLiteral': both => Parser.TemplateLiteral(both.map(execute)),
        'TemplateElement': (value, tail) => Parser.TemplateElement(f(value), f(tail)),
        'TryStatement': (block, handler) => Parser.TryStatement(block.map(f), handler.map(f)),
        'ThisExpression': _ => 'this',
        'VariableDeclaration': (declarations, kind) => Parser.VariableDeclaration(declarations.map(execute), f(kind)),
        'VariableDeclarator': (id, init) => Parser.VariableDeclarator(id.map(f), init.map(f)),
        'Nil': () => ''
    });
}   