// cli
import {question, selectableList} from './utils/cli';
import Stream from './fp/monad/stream';
import { readdir } from 'fs';


const readDir = a  => new Stream(({next, error, complete}) => {
    readdir(a, (err, files) => err
        ? error(err)
        : complete () || next(files)
    );
    return ()=> {}
});
const getJSONs = x => Stream.of(x.filter(c => c.includes('.json')))
    


export const cliJSON = (a, b)=> (f, g, e)=>  question('que folder: ')
    // .chain(readDir)
    // .chain(getJSONs)
    // .chain(selectableList)
    .subscribe({
        next: f,
        error: e,
        complete: g,
    });


