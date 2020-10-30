// haskell signature
// Num a => a -> a 

// Number::cube a => a -> a
const cube = a => a * a;
// max3 :: (Double, Double, Double) -> Double
const max3 = ( a, b ,c ) => Math.max(Math.max(a, b), c);
// Study for coproduct 
// () === Any ya que es haskell
// unit :: a -> ()
const unit = a => [];
// ex:
// yes :: a -> Bool
const yes = a => true;
// not :: a -> Bool
const not = a => false;

// m :: Int -> (Int, Bool)
const m = x => [x, true];
// p :: Int -> Int
const p = x => x;
// q :: Int -> Boolean
const q = _ => true;

const fst = m => m[0];

const scnd = m => m[1];
// all is from https://bartoszmilewski.com/2015/01/07/products-and-coproducts/

// pp :: Int -> Int
const pp = x => fst(m(x));
const qq = x => scnd(m(x));
const B = f => g => x =>f(g(x)); 


console.log(pp(11), B(fst)(m)(11), qq(90), B(scnd)(m)(90));