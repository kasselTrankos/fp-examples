// readline
import readline from 'readline';
import Async from 'crocks/Async';
import fs from 'fs';
import path from 'path';
import { Future, resolve, ap } from 'fluture'

// basename :: String -> String
export const basename = file => path.basename(file);

/// _readline :: Async a => String -> Error String
const _readline = a => Async((_, resolve)=> {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
    return rl.question(a, str => {
        resolve(str);
        // rl.close();
    });
});

// writefile :: String -> String -> Async e String
export const writefile = name => data => Future((reject, resolve) =>{ 
    fs.writeFile(name, data, err =>  err ? reject(err) : resolve(data))
    return () => { console.log ('CANT CANCEL')}
});


// readfile :: String -> Future a b
export const readfile = file => Future((rej, res) => {
    fs.readFile(file, 'utf8', (err, data)=> err 
        ? rej(err)
        : res(data)
    )
    return () => { console.log ('CANT CANCEL')}
});

// read :: String -> ASync Array Error
export const readdir = dir => Future((rej, res) => { 
    fs.readdir(dir, (err, files) => err
        ? rej(err)
        : res(files));
    return () => { console.log ('CANT CANCEL')}
});

// isdirectory :: String -> Async e Bool
export const isdirectory = path => Future((rej, res)=> {
    fs.stat(path, (err, stats) =>  err ? rej(err) : res(stats.isDirectory()))
    return ()=> { console.log('CANT be CANCELED')}
});

// concatPaths :: String -> [String] -> [ String ]
export const concatPaths = a => b => b.map(c => `${a}/${c}`)

// readDir :: String -> Future e [ String ]
export const readDir = file => resolve(concatPaths)
  .pipe(ap(resolve(file)))
  .pipe(ap(readdir(file)))
