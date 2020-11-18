// task test
import Task from './fp/monad/task';
import IO from './fp/monad/io';
import readline from 'readline';


Task.prototype.toIO = function() {
    const t = this.fork(()=> {},  x => console.log(x, '000000') || new IO(()=> console.log(x, '000') || x));
    console.log(t);
    return 'pp'
    // return IO(()=> this.fork(e => console.error(e, '99999'), kol => kol));
}

/// _readline :: Task a => String -> Error String
const _readline = a => new Task((_, resolve)=> {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
    return rl.question(a, str => {
        resolve(str);
        rl.close();
    });
});

// isPalindromo :: String -> Bool
const isPalindromo = a => a === a.split('').reverse().join('');

const aa = _readline('palindromo: \n')
    .map(isPalindromo)
    .toIO()
console.log(aa, 'klo');
    //.fork(console.error, console.log);


