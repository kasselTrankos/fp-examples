// stream
const noop = () => {};
function Stream(engage) {
    this._constructor = engage;
}

function run ({next, complete, error}) {
    return this._constructor({
      next: next || noop,
      complete: complete || noop,
      error: error || noop
    });
}
// of :: Aplicative f => f ~> a -> f a
Stream.of = function(x) {
    return new Stream(({next}) =>{
      next(x);
      return ()=> {} // unsubs
    });
}

// map :: Functor a => f a ~> (a -> b) -> b 
Stream.prototype.map = function(f) {
  return new Stream(({next, complete, error})=> {
      return this.run({
        next: x => next(f(x)),
        complete: x => complete(f(x)),
        error: x => error(x)
      });
  });
}

module.exports = Stream;