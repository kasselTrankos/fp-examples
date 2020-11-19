//Cli
import readline from 'readline';
import Stream from '../fp/monad/stream';

function Cli() {

}

// question :: Cli a -> Stream next error complete 
Cli.prototype.question = function(a) {
    return new Stream(({next, complete, error}) => {
        const rl = readline.createInterface({ 
            input: process.stdin, 
            output: process.stdout
        });
        return rl.question(a, str => {
            next(str);
            rl.close();
        });
    });
}

Cli.prototype.selectableList = function(list) {

}




module.exports = Cli;