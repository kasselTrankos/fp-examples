import { taggedSum } from 'daggy';
//f-algebra
// u :: Int -> Int -> Int -> Int
const u = a => a * a;

// n:: Int -> Int -> Int
const n = m => 1;

console.log(u(2), n(90))

// Pair of products is the cartesian product represented as exponential product
// u   mxm
// n   mx1
// then the pair of n and u
// m^(m x m) x m^1
// F a -npm> 
// F-Algebra  :: f a -> f a -> a
// m x m + m x 1 -> m
// f a = f a -> a

// question :: String -> MEmpty | Mappend a a 

// Expr :: Int -> Int
function Expr(value) {
    this.value = value;
}
Expr.Zero = function() {
    return new Expr(0);
}
Expr.One = function () {
    return new Expr(1);
}
Expr.Add = function(a, b) {
    return new Expr(a.value + b.value);
}
Expr.prototype.Mult = function(a, b){
    return new Expr(a.value * b.value);
}
Expr.prototype.Neg = function() {
    return new Expr(-this.value);
}
const Fix = f => f(Fix(f))
const _42 = new Expr(42);
const _21  = new Expr(21);


console.log(Expr.Zero(), Expr.Add(_42, _21));