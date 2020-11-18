// task test
import {ask} from './util/readline';
import IO from './fp/monad/io';


// log :: b -> b -> console.log( a b)
const log = a => b => console.log(a , b) 
// isPalindromo :: String -> Bool
const isPalindromo = a => a === a.split('').reverse().join('');
const continua = x =>  new IO(() => x)
    .map(isPalindromo)
    .map(log(x + ' is a palindromo: '));
   

const aa = ask(
    x => continua(x).unsafePerformIO()
)('introduce: \n');

