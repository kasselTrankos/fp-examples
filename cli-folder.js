// read files cli
import { getFromList } from './cli';
import Maybe from 'folktale/maybe';
import Result from 'folktale/result';
import { prop, compose, map, filter, pipeK } from  'ramda';
import { getFileByExtension, toJSON, stringify } from './utils'; 
import { readdir,  readFile, writeFile} from './utils/fs';

const { Just, Nothing } = Maybe


// toMaybe :: * -> Maybe Just * Notthing
const toMaybe = a => a ? Just(a) : Nothing();
// saveFile :: String -> String -> Async Boolean Error
const saveFile = name => content => writeFile(name)(content).fork(console.error, console.log);
// onEndRead ::  Async e a ~> ((e -> b), (a -> b))) -> Async e b
const onEndRead = maybe => maybe.matchWith({
  Just: compose(saveFile('hola'), prop('value')),
  Nothing: ()=>  console.log('No hay nada que ver')
})
readdir('./')
  .map(x => x.filter(getFileByExtension('json')))
  .chain(getFromList('Select file: '))
  .map(prop('element'))
  .chain(readFile)
  .map(compose(stringify, prop('devDependencies'), toJSON))
  .bimap(() => Maybe.Nothing(), toMaybe)
  .fork(onEndRead, onEndRead);