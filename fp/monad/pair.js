// Pair
import { taggedSum }  from 'daggy';

export const Pair = taggedSum('Pair', {
    Cons: ['a', 'b'],
    Nil: []
});

Pair.prototype.map = function(f) {
    return this.cata({
        Cons: (a, b) => Pair.Cons(a, f(b)),
        Nil: ()=> Pair.Nil
    });
}

Pair.prototype.chain = function(f) {
    return this.cata({
        Cons: (a, b) => f(b),
        Nil: ()=> Pair.Nil
    });
}

Pair.prototype.fst = function() {
    return this.cata({
        Cons: a => a,
        Nil: () => Pair.Nil
    });
}
Pair.prototype.snd = function() {
    return this.cata({
        Cons: (_, b) => b,
        Nil: () => Pair.Nil
    });
}