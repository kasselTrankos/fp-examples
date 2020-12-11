// cli
import {question, selectableList} from './utils/cli';
import Async from 'crocks/Async';
import inquirer from 'inquirer';


// 

// getFromList :: String -> Array -> Async String Error 
export const getFromList = question => list => console.log(list) || Async((rej, res)=> {
  return inquirer
    .prompt([{
      name: 'element',
      type: "list",
      message: question,
      choices: list,
      },])
    .then(res)
    .catch(rej);
})



export const cliJSON = (a, b)=> (f, g, e)=>  question('que folder: ')
    .chain(readDir)
    .chain(getJSONs)
    .chain(selectableList)
    .subscribe({
        next: f,
        error: e,
        complete: g,
    });


