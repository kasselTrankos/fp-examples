// cli
import {question, selectableList} from './utils/cli';
import Stream from './fp/monad/stream';
import { readdir } from 'fs';


const readDir = a  => new Stream(({next, error}) => {
    readdir(a, (err, files) => { 
        return err
          ? error(err)
          : next(files)
      }) 
});
const getJSONs = x => Stream.of(x.filter(c => c.includes('.json')))
const proc = 
    question('hola mindo: ')
    .chain(readDir)
    .chain(getJSONs)
    .chain(selectableList);


proc.subscribe({
    next: x => console.log(x, 'next'),
    error: x => console.log(x, 'error'),
    complete: () => console.log('complete'),
});


