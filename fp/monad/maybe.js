// Maybe.js is
import { taggedSum }  from 'daggy';

const Maybe = taggedSum('Maybe', {
    Just: ['x'],
    Nothing: []
});

Maybe.of = function(x) {
    return this.cata({
        Just: x,
        Nothing: Maybe.Nothing
    });
}

Maybe.prototype.map = function(f) {
    return this.cata({
        Just: x =>  Maybe.Just(f(x)),
        Nothing: Maybe.Nothing
    });
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

Maybe.prototype.alt = function(x) {
    return this.cata({
        
    });
}


module.exports = Maybe;