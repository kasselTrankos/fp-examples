//Cli
import readline from 'readline';
import Stream from '../fp/monad/stream';

const getList = (list, i) => list.reduce((acc, x, index)=> `${acc} ${index===i ? '\x1b[32m' : '\x1b[0m'}${x}\n`, '');
const getIndex = (list, i) => i < 0 ? list.length -1 : i >= list.length ? 0 : i

// question :: Cli a -> Stream next error complete 
const question = (a) => {
    return new Stream(({next, complete, error}) => {
        const rl = readline.createInterface({ 
            input: process.stdin, 
            output: process.stdout
        });
        return rl.question(a, str => {
            next(str);
            // rl.close();
        });
    });
}
const selectableList = list => {
    let index = -1;
    return new Stream(({next, complete})=> {
        const init = process.stdout.rows;
        const a = getList(list) 
        readline.emitKeypressEvents(process.stdin);
        const numberOfLines = list.length;
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
        process.stdin.on('keypress', (str, key) => {
            if (key.name === 'return') {
                console.log('\x1b[0m\n')
                next(list[index]);
                process.exit();
            } else if(key.name==='up') {
    
                index = getIndex(list, ++index);
                process.stdout.moveCursor(0, -numberOfLines)      // moving two lines up
                process.stdout.cursorTo(0)            // then getting cursor at the begining of the line
                process.stdout.clearScreenDown() 
                process.stdout.write( getList(list, index) )
            }else if(key.name==='down') {
    
                index = getIndex(list, --index);
                process.stdout.moveCursor(0, -numberOfLines)      // moving two lines up
                process.stdout.cursorTo(0)            // then getting cursor at the begining of the line
                process.stdout.clearScreenDown() 
                process.stdout.write( getList(list, index) )
            }
        });
        console.log('Selecciona uno');
        process.stdout.write( getList(list) )
    });
}





module.exports = {
    question,
    selectableList
};