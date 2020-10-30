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

console.log(max3(11,3,6), unit());