// readline
import readline from 'readline';
import Task from '../fp/monad/task';

/// _readline :: Task a => String -> Error String
const _readline = a => new Task((_, resolve)=> {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
    return rl.question(a, str => {
        resolve(str);
        rl.close();
    });
});

// ask :: Function  -> String -> String
export const ask = f => a => _readline(a)
    .fork(()=> {}, f)
