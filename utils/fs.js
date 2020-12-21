// readline
import readline from 'readline';
import Async from 'crocks/Async';
import fs from 'fs';
import path from 'path';

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
export const writefile = name => data => Async((reject, resolve)=> 
    fs.writeFile(name, data, err =>  err ? reject(err) : resolve(data)
));


// readfile :: String -> Async String Error
export const readfile = file => 
    Async((rej, res) => fs.readFile(file, 'utf8', (err, data)=> err ? rej(err) : res(data)));

// read :: String -> ASync Array Error
export const readdir = dir => Async((rej, res) => fs.readdir(dir, (err, files) => err
    ? rej(err)
    : res(files))
);

// isdirectory :: String -> Async e Bool
export const isdirectory = path  => Async((rej, res)=> fs.stat(path, (err, stats) =>
    err ? rej(err) : res(stats.isDirectory())
));
