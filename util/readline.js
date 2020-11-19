// readline
import readline from 'readline';
import Task from '../fp/monad/task';
import { readFile , readdir} from 'fs';
import { get } from 'https';
import Stream from '../fp/monad/stream';

/// _readline :: Task a => String -> Error String
const _readline = a => new Task((_, resolve)=> {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
    return rl.question(a, str => {
        resolve(str);
        // rl.close();
    });
});

const getFile = a => new Task((reject, resolve)=> {
    try {
        const e = readFile(a, {encoding:'utf8', flag:'r'});
        resolve(e);
    }
    catch(er) {
        reject(er)
        console.log(er)
    }
});

const readDir = a  => new Task((reject, resolve) => {
    readdir(a, (err, files) => { 
        if (err) 
          reject(err); 
        else { 
          resolve(files)
        } 
      }) 
});

const getList = (list, i) => list.reduce((acc, x, index)=> `${acc}\t ${index===i ? '\x1b[32m' : '\x1b[0m'}${x}${index%8===0 ? '\n' : ''}`, '');
const getIndex = (list, i) => i < 0 ? list.length -1 : i >= list.length ? 0 : i
console.log(process.stdout.columns)
const drawList = list => new Task((_, resolve)=> {
    let index = -1;
    const init = process.stdout.rows;
    const a = getList(list) 
    readline.emitKeypressEvents(process.stdin);
    const numberOfLines = Math.ceil(list.length / 8);
    if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
    }
    process.stdin.on('keypress', (str, key) => {
        if (key.name === 'return') {
            console.log('\x1b[0m\n')
            resolve(list[index]);
            process.exit();
        } else if(key.name==='left') {

            index = getIndex(list, ++index);
            process.stdout.moveCursor(0, -numberOfLines)      // moving two lines up
            process.stdout.cursorTo(0)            // then getting cursor at the begining of the line
            process.stdout.clearScreenDown() 
            process.stdout.write( getList(list, index) )
        }else if(key.name==='right') {

            index = getIndex(list, --index);
            process.stdout.moveCursor(0, -numberOfLines)      // moving two lines up
            process.stdout.cursorTo(0)            // then getting cursor at the begining of the line
            process.stdout.clearScreenDown() 
            process.stdout.write( getList(list, index) )
        }
    });
    console.log('Press any key...');
    process.stdout.write( getList(list) )

});

// ask :: Function  -> String -> String
export const ask = (f, g) => a => 
// drawList([1, 2, 0, 9])
    _readline(a)
    .chain(readDir)
    .chain(drawList)
    // .chain(x => getFile(x))
    .fork(f, g)
