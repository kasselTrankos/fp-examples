// read files cli
import { cliJSON } from './cli';
const noop = ()=> {}
const fold = a => {
    console.log(a, '000000')
}

const ed = cliJSON()(fold, ()=> console.log('cmmmmm'), e => {
    console.log('error is ',e)
    ed()
})