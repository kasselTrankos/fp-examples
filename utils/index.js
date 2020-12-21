
export { readFile, writeFile } from './fs';
const { readdirSync, readdir, lstatSync, readFileSync } = require('fs');
import { parseModule } from 'esprima';
import path from 'path';
import { prop, flip, curry } from 'ramda';
import Maybe from 'crocks/Maybe';

const { Just, Nothing } = Maybe;

// getMaybe :: f -> * -> Maybe * Nothing
export const getMaybe = f => x => f(x) ? Just(x) : Nothing();

// getIndexValue :: [] -> Int -> *
export const getIndexValue = arr => index=> flip(curry(prop))(arr)(index);

// gotWhiteSpaces :: String -> Maybe a b
export const gotWhiteSpaces = x => /\s/g.test(x);


export const map = f => xs => xs.map(f);
export const filter = f => xs => xs.filter(f);

// getFileByExtension :: String -> String -> Boolean
export const getFileByExtension = ext => file => ext === path.extname(file).substring(1);

// toJSON :: Sting -> Object
export const toJSON = str => JSON.parse(str);

// stringify :: Object -> String
export const stringify = o => JSON.stringify(o, null, 2); 

// ignoreHidden :: String -> Boolean
export const ignoreHidden = x =>  x.substring(0, 1) !== '.';

// parse :: Strig -> Esprima Object
export const parse = a => parseModule(a, {comment: true});
// toString :: * -> String
export const toString = a => a.toString();
export const log = t => x => {
  console.log(t, '::::', x);
  return x;
}
// + :: isDirectory a => Bool
export const isDirectory = a => 
{
  try{
    return lstatSync(`${a}`).isDirectory();
  } catch(e){
    return false;
  }
};


// + :: isFile a => Bool
export const isFile = a => 
{
  try{
    return lstatSync(`${a}`).isFile();
  } catch(e){
    return false;
  }
};
