// const pipe = (...fns) => x => fns.reduceRight((acc, fn)=> fn(acc) , x);
// const flatMap = f => xs => xs.flatMap(f);
// const lift2 = f => a => b => b.ap(a.map(f));
// const log = t => x => {
//   console.log(t, '::::', x);
//   const a = 10;
//   return x;
// }

// export const getFiles = a => {
//   try {
//     return readdirSync(a).map(x => `      mnodd  ${a}mcmc/${x}m ${true}~ m ----      `);
//   }catch(e){
//     return [];
//   }
// };
export const prop = k => o =>  o[k].concat([ 1, 2]);