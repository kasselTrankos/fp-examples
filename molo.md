#(.)



##./broken/broken.js
**[ERR]**	Error: Line 36: Unexpected token ILLEGAL

##./cli-actions/cli-folder.js
**line 6**:	import { chain, reject, resolve, bichain, fork, **map**, encase } from 'fluture';
**line 27**:	  .pipe(**map**(S.filter(getFileByExtension('json'))))
**line 30**:	  .pipe(**map**(S.concat(S.concat(path)('/'))))
**line 32**:	  .pipe(**map**(compose(stringify, prop('dependencies'), toJSON)))
**line 37**:	  .pipe(**map**(x=> ' File saved !!'))

##./cli-actions/find-pattern.js
**line 4**:	import { fork, **map**, chain, bichain, resolve, parallel, ap } from 'fluture'
**line 16**:	  .pipe(**map**(filter(ignoreByName('node_modules'))))
**line 17**:	  .pipe(**map**(filter(compose(ignoreHidden, basename))))
**line 19**:	    parallel(Infinity)(filteredFiles.**map**(isdirectory))
**line 20**:	      .pipe(**map**(isDir => zip(isDir)(filteredFiles)))
**line 22**:	      .pipe(**map**(flatten))
**line 31**:	    S.**map**(Token),
**line 32**:	    S.**map**(toPatternArray(pattern)),
**line 33**:	    S.**map**(x => x.toMarkdown(splitCodeLines(inmutableContent.next()))),
**line 34**:	    S.**map**(toArray),
**line 35**:	    S.**map**(x => {
**line 45**:	const recurDir = dir => parallel(Infinity)(dir.**map**( p =>
**line 54**:	  .pipe(**map**(filter(compose(getFileByExtension('js'), basename))))
**line 63**:	  .pipe(**map**(x=> ' File saved !!'))
**line 67**:	  .pipe(**map**(toJSON))
**line 72**:	    .pipe(ap(parallel(Infinity)(files.**map**(readfile))))
**line 74**:	  .pipe(**map**(x => `#(${path})\n\n${x.join('')}`))

##./cli-actions/findincode.js
**line 13**:	import {fork, chain, bichain, reject, resolve, **map**, parallel} from 'fluture'
**line 19**:	  .pipe(**map**(filter(ignoreByName('node_modules'))))
**line 20**:	  .pipe(**map**(filter(compose(ignoreHidden, basename))))
**line 22**:	    parallel(Infinity)(filteredFiles.**map**(isdirectory))
**line 23**:	      .pipe(**map**(isDir => S.zip(isDir)(filteredFiles)))
**line 25**:	      .pipe(**map**(flatten))
**line 29**:	const recurDir = dir => parallel(Infinity)(dir.**map**( p =>
**line 69**:	      S.**map**(S.map(curry(prop)('loc'))), 
**line 69**:	      S.map(S.**map**(curry(prop)('loc'))), 
**line 109**:	    S.**map**(Token),
**line 110**:	    S.**map**(x => x.filter([{ Identifier }])),
**line 111**:	    S.**map**(x => x.toMarkdown(splitCodeLines(inmutableCode.next()))),
**line 112**:	    S.**map**(toArray),
**line 113**:	    S.**map**(x => {
**line 123**:	  parallel(Infinity)(files.**map**(readfile))
**line 124**:	 .pipe(**map**(tokenize(files)(pattern)))
**line 132**:	  .pipe(**map**(S.filter(getFileByExtension('js'))))
**line 157**:	  .pipe(**map**(x => `#(${path})\n\n${x.join('')}`))
**line 162**:	  .pipe(**map**(x=> ' File saved !!'))

##./dom.js
**line 19**:	    .**map**(setProp(compose(properties, disabled))(true))

##./fp/monad/either.js
**line 24**:	Either.prototype.**map** = function (f) {
**line 32**:	Either.**map** = Either.prototype.map;
**line 32**:	Either.map = Either.prototype.**map**;

##./fp/monad/executor.js
**line 9**:	 **map**: g => Reader(x => g(f(x))),

##./fp/monad/io.js
**line 6**:	IO.prototype.**map** = function(f) {
**line 25**:	  return IO.of(this.**map**(f).unsafePerformIO().unsafePerformIO())

##./fp/monad/linkedlist.js
**line 15**:	LinkedList.prototype.**map** = function(f) {
**line 17**:	        Cons: (head, tail) => LinkedList.Cons(f(head), tail.**map**(f)),

##./fp/monad/maybe.js
**line 13**:	Maybe.prototype.**map** = function(f) {

##./fp/monad/pair.js
**line 6**:	Pair.prototype.**map** = function(f) {

##./fp/monad/parser.js
**line 48**:	                return Parser.ArrowFunctionExpression(x.id, x.params.**map**(getParser), getParser(x.body), x.generator, x.expression, x.async);
**line 50**:	                return Parser.CallExpression(getParser(x.callee), x.arguments.**map**(getParser));
**line 52**:	                return Parser.BlockStatement(x.body.**map**(getParser), x.generator, x.expression, x.async);
**line 66**:	                return Parser.ObjectExpression(x.properties.**map**(getParser));
**line 75**:	                    interpolate(x.quasis.**map**(getParser), 
**line 76**:	                        x.expressions.**map**(x => Parser.TemplateValue(getParser(x))))
**line 83**:	                return Parser.VariableDeclaration(x.declarations.**map**(getParser), x.kind)
**line 90**:	    return Parser.Program(x.body.**map**(getParser), x.sourceType, x.comments);
**line 96**:	        'ArrowFunctionExpression': (id, params, body, generator, expression, async) => `${async ? 'async ': ''}${params.length !== 1 ? '(' : ''}${params.**map**(p=> p.toString()).join(', ')}${params.length !== 1 ? ')' : ''} => ${body.toString()}`,
**line 97**:	        'ArrayExpression': x => `[ ${x.elementprototypeprototypes.**map**(p=> Parser.of(p).toString())} ]`,
**line 100**:	        'BlockStatement': (body, generator, expression, async) => `{\n${body.**map**(p=> p.toString()).join('\n')}\n}`,
**line 101**:	        'CallExpression': (callee, args) => `${callee.toString()}(${args.**map**(p => p.toString()).join(', ')})`,
**line 106**:	        'FunctionExpression': x => `function(${x.params.**map**(p=> Parser.of(p).toString())}){\n\t${Parser.of(x.body).toString()}\n}`,
**line 107**:	        'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.**map**(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
**line 113**:	        'ObjectExpression': properties => `{${properties.**map**(p => p.toString()).join(', ')}}`,
**line 114**:	        'Program': (body, sourceType, comments) => body.**map**(p=> p.toString()),
**line 119**:	        'TemplateLiteral': both => `\`${both.**map**(p => p.toString()).join('')}\``,
**line 122**:	        'VariableDeclaration': (declarations, kind) => `${kind} ${declarations.**map**(p=> p.toString())}`,
**line 130**:	        'ArrowFunctionExpression': (id, params, body, generator, expression, async) => `${async ? 'async ': ''}${params.length !== 1 ? '(' : ''}${params.**map**(p=> p.toString()).join(', ')}${params.length !== 1 ? ')' : ''} => ${body.toString()}`,
**line 131**:	        'ArrayExpression': x => `[ ${x.elementprototypeprototypes.**map**(p=> Parser.of(p).toString())} ]`,
**line 134**:	        'BlockStatement': (body, generator, expression, async) => `{\n${body.**map**(p=> p.toString()).join('\n')}\n}`,
**line 135**:	        'CallExpression': (callee, args) => `${callee.toString()}(${args.**map**(p => p.toString()).join(', ')})`,
**line 140**:	        'FunctionExpression': x => `function(${x.params.**map**(p=> Parser.of(p).toString())}){\n\t${Parser.of(x.body).toString()}\n}`,
**line 141**:	        'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.**map**(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
**line 147**:	        'ObjectExpression': properties => `{${properties.**map**(p => p.toString()).join(', ')}}`,
**line 148**:	        'Program': (body, sourceType, comments) => body.**map**(p=> p.toString()),
**line 153**:	        'TemplateLiteral': both => `\`${both.**map**(p => p.toString()).join('')}\``,
**line 156**:	        'VariableDeclaration': (declarations, kind) => `${kind} ${declarations.**map**(p=> p.toString())}`,
**line 190**:	Parser.prototype.**map** = function(f) {
**line 191**:	    const execute = x => x.**map**(f);
**line 193**:	        'ArrowFunctionExpression': (id, params, body, generator, expression, async) => Parser.ArrowFunctionExpression(f(id), params.**map**(execute), body.map(f), f(generator), f(expression), f(async)),
**line 193**:	        'ArrowFunctionExpression': (id, params, body, generator, expression, async) => Parser.ArrowFunctionExpression(f(id), params.map(execute), body.**map**(f), f(generator), f(expression), f(async)),
**line 194**:	        'CallExpression': (callee, args) => Parser.CallExpression(callee.**map**(f), args.map(execute)),
**line 194**:	        'CallExpression': (callee, args) => Parser.CallExpression(callee.map(f), args.**map**(execute)),
**line 195**:	        'Program': (body, sourceType, comments) => Parser.Program(body.**map**(execute), f(comments), f(sourceType)),
**line 199**:	        'BlockStatement': (body, generator, expression, async) => Parser.BlockStatement(body.**map**(execute), f(generator), f(expression), f(async)),
**line 200**:	        'CatchClause': (param, body) => Parser.CatchClause(param.**map**(f), body.map(f)),
**line 200**:	        'CatchClause': (param, body) => Parser.CatchClause(param.map(f), body.**map**(f)),
**line 202**:	        'ExpressionStatement': expression => Parser.ExpressionStatement(expression.**map**(f)),
**line 203**:	        'ExportNamedDeclaration': declaration => Parser.ExportNamedDeclaration(declaration.**map**(f)),
**line 204**:	        'FunctionExpression': x => x.params.**map**(p=> Parser.of(p).find(m.type==='FunctionExpression' ? m.params : m)) && Parser.of(x.body).find(m.type === 'FunctionExpression' ? m.body : m),
**line 205**:	        'FunctionDeclaration': x => `function ${Parser.of(x.id).toString()}(${x.params.**map**(p=> Parser.of(p).toString())}) {${Parser.of(x.body).toString()}\n}`,
**line 208**:	        'MemberExpression': (object, property, computed) => Parser.MemberExpression(object.**map**(f), property.map(f), computed),
**line 208**:	        'MemberExpression': (object, property, computed) => Parser.MemberExpression(object.map(f), property.**map**(f), computed),
**line 210**:	        'ObjectExpression': properties => Parser.ObjectExpression(properties.**map**(execute)),
**line 211**:	        'Property': (key, computed, value) => Parser.Property(key.**map**(f), f(computed), value.map(f)),
**line 211**:	        'Property': (key, computed, value) => Parser.Property(key.map(f), f(computed), value.**map**(f)),
**line 212**:	        'RestElement': argument => Parser.RestElement(argument.**map**(f)),
**line 213**:	        'ReturnStatement': argument => Parser.ReturnStatement(argument.**map**(f)),
**line 214**:	        'TemplateValue': el => el.**map**(f),
**line 215**:	        'TemplateLiteral': both => Parser.TemplateLiteral(both.**map**(execute)),
**line 217**:	        'TryStatement': (block, handler) => Parser.TryStatement(block.**map**(f), handler.map(f)),
**line 217**:	        'TryStatement': (block, handler) => Parser.TryStatement(block.map(f), handler.**map**(f)),
**line 219**:	        'VariableDeclaration': (declarations, kind) => Parser.VariableDeclaration(declarations.**map**(execute), f(kind)),
**line 220**:	        'VariableDeclarator': (id, init) => Parser.VariableDeclarator(id.**map**(f), init.map(f)),
**line 220**:	        'VariableDeclarator': (id, init) => Parser.VariableDeclarator(id.map(f), init.**map**(f)),

##./fp/monad/rosetree.js
**line 36**:	        Forest.**map**(x => x.ap(b)),
**line 37**:	        fs.**map**(m => this.ap(m))
**line 46**:	RoseTree.prototype.**map** = function(f) {
**line 48**:	    Cons: (Node, Forest)=> RoseTree.Cons(f(Node), Forest.**map**(x => x.map(f))),
**line 48**:	    Cons: (Node, Forest)=> RoseTree.Cons(f(Node), Forest.map(x => x.**map**(f))),
**line 58**:	      Cons: (node, forest) => RoseTree.Cons(node, [].concat(forest, Forest.**map**(x => x.chain(f)))),

##./fp/monad/stream.js
**line 39**:	  return that.chain(f => this.**map**(f));
**line 62**:	      return x.**map**(v => this.subscribe({
**line 73**:	  return this.**map**(m).join();
**line 118**:	Stream.prototype.**map** = function(f) {

##./fp/monad/task.js
**line 12**:	Task.prototype.**map** = function(f) {

##./fp/monad/tokenize.js
**line 42**:	Tokenize.prototype[fl.**map**] = Tokenize.prototype.map = function(f) {
**line 42**:	Tokenize.prototype[fl.map] = Tokenize.prototype.**map** = function(f) {
**line 54**:	  const pattern = arr.**map**(x => [...keys(x), prop(prop(0, keys(x)), x)])
**line 55**:	  const KPMs =  this.**map**(S.map(curry(KMPSearch)(getIdentifier)(pattern)))
**line 55**:	  const KPMs =  this.map(S.**map**(curry(KMPSearch)(getIdentifier)(pattern)))
**line 58**:	  const getLines = x => unifyElements(x.**map**(z => [
**line 62**:	  return KPMs.**map**(S.map(S.map(y =>({
**line 62**:	  return KPMs.map(S.**map**(S.map(y =>({
**line 62**:	  return KPMs.map(S.map(S.**map**(y =>({
**line 101**:	  const getMarkdown = a => S.Right(S.**map**(
**line 105**:	  return this.**map**(x => S.isLeft(x) ?  S.map(S.map(x => `\n**[ERR]**\t${x}`))(S.Right(S.lefts([x]))) : S.chain(getMarkdown)(x))
**line 105**:	  return this.map(x => S.isLeft(x) ?  S.**map**(S.map(x => `\n**[ERR]**\t${x}`))(S.Right(S.lefts([x]))) : S.chain(getMarkdown)(x))
**line 105**:	  return this.map(x => S.isLeft(x) ?  S.map(S.**map**(x => `\n**[ERR]**\t${x}`))(S.Right(S.lefts([x]))) : S.chain(getMarkdown)(x))

##./fp-cli.js
**line 33**:	    .**map**(x => x.argv)
**line 34**:	    .**map**(removeUnnecesary)
**line 35**:	    .**map**(withDefaults)

##./fp-way.js
**line 6**:	const lift2 =  (f, a, b) => b.ap(a.**map**(f))

##./hylomorphism.js
**line 55**:	Algebra.prototype.**map** = function(f) {
**line 121**:	    Call: (e, args) => `Call :: Expr -> (${e}, ${args.**map**(x=> x.toString())})`,
**line 130**:	    Call: (e, args) => Expr.Call(e.flatten(), args.**map**(x => x.flatten())),
**line 141**:	    Call: (e, args) => Expr.Call(e.flatten(), args.**map**(x => x.flatten())),
**line 157**:	    Call: (e, args) => Expr.Call(e.apply(f), args.**map**(x => x.apply(f))),

##./io-ex.js
**line 9**:	import {**map**, chain} from './utils';

##./iodate.js
**line 10**:	const lift = f => a => b => b.ap(a.**map**(f))
**line 14**:	    .**map**(x => `${x.getHours()}:${x.getMinutes()}:${x.getSeconds()}`)
**line 24**:	    .bimap(x => 3, x => x.**map**(y => y + 3))
**line 72**:	    : T.extract() * fact(T.**map**(f), f);
**line 106**:	    const **map** = f => match({ Nil, Cons: x => xs => Cons(x)(f(xs)) });
**line 107**:	    const fromArray = ana({ **map** })(Arr.match({ Nil, Cons }));
**line 109**:	    return { Nil, Cons, **map**, fromArray };
**line 116**:	    const **map** = f => match({Zero, Succ: x => Succ(x)});
**line 118**:	    return { Zero, Succ, **map**, bimap};

##./lambda-way.js
**line 8**:	const **map** = f => xs => xs.map(f);
**line 8**:	const map = f => xs => xs.**map**(f);
**line 15**:	    return readdirSync(a).**map**(x => `${a}/${x}`);
**line 36**:	  **map**(B(A)(toRoseTree)),

##./linked.js
**line 19**:	const lift2 = (f, a, b) => b.ap(a.**map**(f));
**line 29**:	const klo = LinkedList.of(90).**map**(x => x + 8).ap(LinkedList.of(x => x + 900));
**line 54**:	    Cons: () => this.reduce((acc, x)=> acc.**map**(a => [...a, x]), Maybe.Just([])),

##./maybe-ex.js
**line 5**:	import { **map** } from './utils';
**line 9**:	const a = Just(1).**map**(x => x +2).chain(x => Just(x + 100))
**line 44**:	Tupla.prototype.**map** = function(f) {
**line 75**:	console.log(tuples.**map**(t => t.map(compose(addZeroStr, convertToText))))
**line 75**:	console.log(tuples.map(t => t.**map**(compose(addZeroStr, convertToText))))
**line 79**:	    **map**,
**line 80**:	    **map**,
**line 100**:	console.log(asa.**map**(toUpper));
**line 101**:	const lift2 = f => a => b => b.ap(a.**map**(f));
**line 102**:	const lift3 = f => a => b => c => c.ap(b.ap(a.**map**(f)));

##./obtain-files.js
**line 5**:	import { ignoreHidden, getFileByExtension, toJSON, **map**, splitCodeLines, getIndexValue } from './utils';
**line 14**:	const concatPaths = a => b => b.**map**(c => `${a}/${c}`);
**line 23**:	  .chain(filteredFiles => all(filteredFiles.**map**(isdirectory))
**line 24**:	    .**map**(isDir => zipWith((a, b) => Pair(a, b), isDir, filteredFiles))
**line 26**:	    .**map**(flatten)
**line 36**:	const readDirs = dir => all(dir.**map**(
**line 44**:	  const lines = flatten(fst.**map**(x => prop('lines')(x).map(l => ({ 
**line 44**:	  const lines = flatten(fst.map(x => prop('lines')(x).**map**(l => ({ 
**line 49**:	  return [ all.**map**(x => {
**line 78**:	  .**map**(map(Token))
**line 78**:	  .map(**map**(Token))
**line 80**:	      b.**map**(x => x.findArrPatterns(a).unsafePerformIO())
**line 83**:	  .**map**(([title, code, pattern]) => Pair(pattern, code)
**line 84**:	    .**map**(splitCodeLines)
**line 86**:	    .**map**(x => `\n\n##${title}${x}`)
**line 92**:	  .**map**(concatPaths(path))
**line 94**:	  .**map**(filter(compose(getFileByExtension('js'), basename)));
**line 99**:	  .**map**(toJSON)
**line 104**:	    .ap(all(files.**map**(readfile)))
**line 106**:	  .**map**(flatten)
**line 107**:	  .**map**(x => `#(${path})\n\n${x}`)
**line 110**:	  .**map**(prop('element'))
**line 118**:	    .**map**(prop('element'))

##./pair.js
**line 8**:	import { **map** } from 'ramda';
**line 98**:	    .**map**(z => z + ' hola')
**line 122**:	console.log(_p.**map**(x => x + 8));
**line 131**:	const allToLower = a => a.split('').**map**(toLower).join('');
**line 161**:	 **map**: f => _Pair(x, f(y))

##./parser.js
**line 38**:	    .**map**(parse)
**line 44**:	    .**map**(Parser.fromEsprima)
**line 45**:	    .**map**(x => x.find( {
**line 53**:	    .**map**(x => x.toString())

##./signature.js
**line 43**:	List.prototype.**map** = function(f) {
**line 44**:	    return new List(this.head ? f(this.head) : null, this.tail ? this.tail.**map**(f) : null)
**line 122**:	const data = v.**map**(m).map(cata({Left: i, Right: j}));
**line 122**:	const data = v.map(m).**map**(cata({Left: i, Right: j}));
**line 133**:	const d = data.**map**(x => coproduct(f, g, x))//.map(cata({Left: i, Right: j}));
**line 147**:	    const ttt = d.reduce((acc, x)=> Right(acc.ap(x.**map**(concater))), Right(Multiply.empty()));
**line 158**:	const a = log(0).**map**(x => x + 10).chain(x => IO(()=> Right(x))).unsafePerformIO().cata({
**line 163**:	const ja = List.empty().concat(new List(5, new List(9, new List(6, List.of(2))))).concat(List.of(90)).concat(new List(100, List.of(8))).**map**(x => x * 3);

##./task.js
**line 14**:	    .**map**(log(x + ' is a palindromo:  '))

##./test/rosetree.test.js
**line 10**:	      const b = v.ap(u.ap(a.**map**(f => g => x => f(g(x)))));

##./utils/fs.js
**line 51**:	export const concatPaths = a => b => b.**map**(c => `${a}/${c}`)

##./utils/index.js
**line 19**:	export const **map** = f => xs => xs.map(f);
**line 19**:	export const map = f => xs => xs.**map**(f);

##./utils/tokenize.js
**line 2**:	import { equals, prop, props, keys, curry, flatten, add, last, **map**} from 'ramda'
**line 38**:	  const pattern = arr.**map**(x => [...keys(x), prop(prop(0, keys(x)), x)]);
**line 39**:	  const KPMs =  this.**map**(curry(KMPSearch)(getIdentifier)(pattern));
**line 42**:	  const getLines = x => unifyElements(x.**map**(z => [
**line 46**:	  const lines = KPMs.**map**(x => x.map(y => ({
**line 46**:	  const lines = KPMs.map(x => x.**map**(y => ({