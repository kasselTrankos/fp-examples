//Cli
import readline from 'readline';
import Stream from '../fp/monad/stream';

const NONE = '\x1b[0m';
const GREEN = '\x1b[32m';

// getList :: [a], Int -> [b]
const getList = (list, i) => list.reduce((acc, x, index) => `${acc} ${index===i ? GREEN : NONE}${x}\n`, '');

// getIndez :: [a], Int -> Int
const getIndex = (list, i) => i < 0 ? list.length -1 : i >= list.length ? 0 : i

// cleanLines :: [a] -> Nothing
const cleanLines = a => {
    process.stdout.moveCursor(0, -a)      // moving two lines up
    process.stdout.cursorTo(0)            // then getting cursor at the begining of the line
    process.stdout.clearScreenDown() 
}

// question a -> Stream String 
const question = (a) => {
    return new Stream(({next, complete, error}) => {
        const rl = readline.createInterface({ 
            input: process.stdin, 
            output: process.stdout
        });
        rl.question(a, str => {
            next(str);
        });
        return () => rl.close()
    });
}
// selectableList :: Stream [a] -> Stream [a]
const selectableList = list => {
    let index = 0;
    return new Stream(({next, complete, error})=> {
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
                index = getIndex(list, --index);
                cleanLines(numberOfLines);
                process.stdout.write(getList(list, index) )
            }else if(key.name==='down') {
                index = getIndex(list, ++index);
                cleanLines(numberOfLines);
                process.stdout.write(getList(list, index) )
            }
        });
        console.log('Selecciona uno');
        process.stdout.write( getList(list, index) )
    }, ()=> process.exit());
}

module.exports = {
    question,
    selectableList
};