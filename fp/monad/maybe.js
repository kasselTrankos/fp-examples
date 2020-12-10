// Maybe.js is
import { taggedSum }  from 'daggy';

const Maybe = taggedSum('Maybe', {
    Just: ['x'],
    Nothing: []
});

Maybe.of = function(x) {
   return Maybe.Just(x);
}

Maybe.prototype.map = function(f) {
    return this.cata({
        Just: x =>  Maybe.Just(f(x)),
        Nothing:()=>  Maybe.Nothing
    });
}
Maybe.prototype.ap = function(that) {
  return this.cata({
    Just: x=> that.cata({
      Just: f => Maybe.Just(f(x)),
      Nothing:_=> Maybe.Nothing
    }),
    Nothing:_=> Maybe.Nothing
  });
}

// coof:: w a -> a
Maybe.prototype.extract = function() {
    return this.cata({
        Just: _=> _,
        Nothing: () => undefined
    })
}
// coChain :: w a -> (w a -> b ) -> w b
Maybe.prototype.coChain = function(that) {
    return this.cata({
        Just: f => that.cata({
            Just: x => f(x),
            Nothing: Maybe.Nothing
        }),
        Nothing: ()=> Maybe.Nothing
    });
}

Maybe.prototype.id = function() {
    return this;
}
Maybe.prototype.empty = function(){
    return this.cata({
        Just: Maybe.Nothing,
        Nothing: Maybe.Nothing
    });
}
Maybe.prototype.chain = function(m) {
    return this.cata({
        Just: (x) => m(x),
        Nothing: Maybe.Nothing
    });
}

Maybe.prototype.bimap = function(f, g) {
    return this.cata({
        Nothing: f,
        Just: g
    })
}

Maybe.prototype.alt = function(b) {
    return this.cata({
        Just: _ => this,
        Nothing: _ => b
    });
}


module.exports = Maybe;