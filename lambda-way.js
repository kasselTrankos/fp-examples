// recursive is
const { readdirSync, lstatSync } = require('fs');
const RoseTree = require('./fp/monad/rosetree');
const { I, B, S } = require('./lambda');

const pipe = (...fns) => x => fns.reduceRight((acc, fn)=> fn(acc) , x);
const append = a => b => a.concat(new RoseTree(null, b));
const map = f => xs => xs.map(f);
const ap = f => xs => xs.p(f);
const filter = f => xs => xs.filter(f);

// + :: getfiles a -> [a]
const getfiles = a => {
  try {
    return readdirSync(a).map(x => `${a}/${x}`);
  }catch(e){
    return [];
  }
};
// + :: isDirectory a => Bool
const isDirectory = a => 
{
  try{
    return lstatSync(`${a}`).isDirectory();
  } catch(e){
    return false;
  }
};

const A = d => S(append)(proc)(d);
const prop = key => o => o[key];
const getNode = prop('node');
const toRoseTree = x => RoseTree.of(`${x}`);

const proc = pipe( 
  map(B(A)(toRoseTree)),
  filter(isDirectory),
  getfiles,
  I,
  getNode,
);
    

const origin = RoseTree.of('./bb');
const data = A(origin);
console.log( JSON.stringify(data))
