// readline
import readline from 'readline';
import Task from '../fp/monad/task';
import { readFileSync } from 'fs';
import { get } from 'https';

/// _readline :: Task a => String -> Error String
const _readline = a => new Task((_, resolve)=> {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
    return rl.question(a, str => {
        resolve(str);
        rl.close();
    });
});

const getFile = a => new Task((reject, resolve)=> {
    try {
        const e = readFileSync(a, {encoding:'utf8', flag:'r'});
        resolve(e);
    }
    catch(er) {
        reject(er)
    }
});

// ask :: Function  -> String -> String
export const ask = (f, g) => a => 
    _readline(a)
    .chain(x => getFile(x))
    .fork(f, g)
