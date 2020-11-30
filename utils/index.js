
export { readFile } from './fs';
const { readdirSync, readdir, lstatSync, readFileSync } = require('fs');
import { parseModule } from 'esprima';

// parse :: Strig -> Esprima Object
export const parse = a => parseModule(a, {comment: true});

export const compose = (...fns) => x => fns.reduce((acc, fn)=> fn(acc) , x);

export const pipe = (...fns) => x => fns.reduceRight((acc, fn)=> fn(acc) , x);
export const ap = f => xs => xs.ap(f);
export const reduce = (f, acc) => xs => xs.reduce(f, acc);
export const chain = f => xs => xs.chain(f);
// map :: (a -> b) -> Functor -> (a -> b) -> f a -> f b 
export const map = f => xs => console.log(xs, 'joder') || xs.map(f);
export const flatMap = f => xs => xs.flatMap(f);
export const filter = f => xs => xs.filter(f);
export const lift2 = f => a => b => b.ap(a.map(f)); 
// toString :: * -> String
export const toString = a => a.toString();
export const log = t => x => {
  console.log(t, '::::', x);
  return x;
}
// + :: getFiles a -> [a]
export const getFiles = a => {
  try {
    return readdirSync(a).map(x => `${a}/${x}`);
  }catch(e){
    return [];
  }
};




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

// prop :: String -> Object -> *
export const prop = k => o =>  o[k];

