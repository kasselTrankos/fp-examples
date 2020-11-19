// task test
import {ask} from './utils/readline';
import IO from './fp/monad/io';


// log :: a -> b -> console.log( a b)
const log = a => b => console.log(a , b) 
// isPalindromo :: String -> Bool
const isPalindromo = a => a === a.split('').reverse().join('');
const continua = x =>  new IO(() => x)
    // .map(x => JSON.parse(x))
    // .map(x => x.name)
    // // .map(isPalindromo)
    .map(log(x + ' is a palindromo:  '))
    .unsafePerformIO()
const error = (er)=>  console.log('mierda mal', er)

ask(
    error,
    // aqui viene el either
    continua
)('introduce: \n');

