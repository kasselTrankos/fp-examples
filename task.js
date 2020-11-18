// task test
import Task from './fp/monad/task';
import IO from './fp/monad/io';
import readline from 'readline';


Task.prototype.toIO = function() {
    return IO(()=> this.fork(e => console.error(e, '99999'), kol => kol));
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

const aa = _readline('dame tu nombre: \n')
    .map(isPalindromo).fork(console.error, console.log);


