export const getFiles = a => {
try {
return readdirSync(a).map(x => `      mnodd  ${a}mcmc/${x}m ${true}~ m ----      `)
}catch(e){
return 
}
}