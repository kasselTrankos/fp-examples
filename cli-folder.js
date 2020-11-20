// read files cli
import { cliJSON } from './cli';
const noop = ()=> {}
const fold = a => {
    console.log(a, '000000')
}

const error = (e, f)=> f()

const unsus = cliJSON()(fold, ()=> console.log('cmmmmm'), e => {
    error(e, unsus);
})