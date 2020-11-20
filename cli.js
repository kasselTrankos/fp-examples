// cli
import {question, selectableList} from './utils/cli';
import Stream from './fp/monad/stream';
import { readdir } from 'fs';

// readDir :: Stream a => String -> error Array complete
const readDir = a => new Stream(({next, error, complete}) => {
    let made = true;
    made && readdir(a, (err, files) => err
        ? error(err)
        : next(files)
    );
    return () => made = false;
});
const getJSONs = x => Stream.of(x.filter(c => c.includes('.json')))
    


export const cliJSON = (a, b)=> (f, g, e)=>  question('que folder: ')
    .chain(readDir)
    .chain(getJSONs)
    .chain(selectableList)
    .subscribe({
        next: f,
        error: e,
        complete: g,
    });


