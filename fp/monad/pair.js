// Pair
import { tagged }  from 'daggy';

export const Pair = tagged('Pair', ['a', 'b']);

Pair.prototype.map = function(f) {
    return Pair(this.a, f(this.b))
}

Pair.prototype.chain = function(f) {
    return f(this.b)
}


Pair.prototype.fst = function() {
    return this.a;
}
Pair.prototype.snd = function() {
    return this.b;
}