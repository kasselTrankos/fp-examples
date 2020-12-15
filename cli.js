// cli
import {question, selectableList} from './utils/cli';


export const cliJSON = (a, b)=> (f, g, e)=>  question('que folder: ')
    .chain(readDir)
    .chain(getJSONs)
    .chain(selectableList)
    .subscribe({
        next: f,
        error: e,
        complete: g,
    });


