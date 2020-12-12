// fp-cli
import {cliJSON} from './cli-folder';
import Maybe from 'folktale/maybe';
import { exclude } from 'inquirer/lib/objects/separator';

const defOptions = [
    { action: 'action'},
    { path: './'},
    { file: 'malaje.json'}
];
const actions = {
    cliJSON: path => file =>cliJSON(path)(file)
}


const argv = require('yargs/yargs')(process.argv.slice(2))
    .default(defOptions)
    .argv;

function Executor(action) {
    this.action = action;
}

Executor.prototype.apply = function() {

}


actions[argv.action](argv.path)(argv.file)