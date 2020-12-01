Parser.prototype.toString = function() {
  return this.cata({
      'ArrowFunctionExpression': x => `${x.params.length !== 1 ? '(' : ''} ${x.params.map(p=> Parser.of(p).toString()).join(', ')}${x.params.length !== 1 ? ')' : ''} => ${Parser.of(x.body).toString()}`,
  })
}