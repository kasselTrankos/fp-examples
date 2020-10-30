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
const m = [1, true];
// p :: Int -> Int
const p = x => x;
// q :: Int -> Boolean
const q = _ => true;

const fst = (x, y) => x;

const scnd = (x, y) => y

console.log(max3(11,3,6), scnd(...m));