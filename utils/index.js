const { readdirSync, lstatSync, readFileSync } = require('fs');

export const pipe = (...fns) => x => fns.reduceRight((acc, fn)=> fn(acc) , x);
export const ap = f => xs => xs.ap(f);
export const chain = f => xs => xs.chain(f);
export const map = f => xs => xs.map(f);
export const flatMap = f => xs => xs.flatMap(f);
export const filter = f => xs => xs.filter(f);
export const lift2 = f => a => b => b.ap(a.map(f)); 
export const log = t => x => {
  console.log(t, '::::', x);
  return x;
}
// + :: getFiles a -> [a]
export const getFiles = a => {
  try {
    return readdirSync(a)//.map(x => `${a}/${x}`);
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

export const readFile = filename => console.log(filename) || readFileSync(filename, 'utf-8');


export const prop = k => o => o[k];