// fp-cli
import {cliJSON} from './cli-folder';
import IO from './fp/monad/io';
import {Executor, Action} from './fp/monad/executor';
import { mergeRight, dissoc} from 'ramda';
import yargs from 'yargs/yargs';

const defOptions = {
    action: 'cli-json',
    path: './',
    file: 'malaje.json'
};


const actions = {
    [Action('cli-json')]: (path, file) => cliJSON(path)(file)
}

// withDefaults :: Object -> Object
const withDefaults = mergeRight(defOptions);
// removeUnnecesary :: Object -> Object
const removeUnnecesary = o => dissoc('$0', dissoc('_', o));
// Args:: object -> IO
const Args = argv => IO(() =>  yargs(argv));

// getArgs :: Object -> object 
const getArgs = argv => Args(argv)
    .map(x => x.argv)
    .map(removeUnnecesary)
    .map(withDefaults)
    .unsafePerformIO();

// proc :: Object -> void
const proc = args => 
    Executor(actions)
    .action(Action(args.action))
    .run(args.path, args.file);

proc(getArgs(process.argv))