// readline
import readline from 'readline';
import Task from '../fp/monad/task';
import { readFile , readdir} from 'fs';
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

const getList = (list, i) => list.reduce((acc, x, index)=> `${acc}\t ${index===i ? '\x1b[36m' : '\x1b[31m'}-${x}`, '');
const getIndex = (list, i) => i < 0 ? list.length -1 : i >= list.length ? 0 : i

const drawList = list => new Task((_, resolve)=> {
    let index = -1;
    const a = getList(list) 
    readline.emitKeypressEvents(process.stdin);
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
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write( getList(list, index) )
        }else if(key.name==='right') {

            index = getIndex(list, --index);
            
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write( getList(list, index) )
        }
    });
    console.log('Press any key...');
    process.stdout.write( getList(list) )

});

// ask :: Function  -> String -> String
export const ask = (f, g) => a => 
drawList([1, 2, 0, 9])
    // _readline(a)
    // .chain(readDir)
    // .chain(drawList)
    // .chain(x => getFile(x))
    .fork(f, g)
