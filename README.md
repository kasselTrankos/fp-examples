# EXAMPLES OF FP

* lambda :: recursive read folder  by lambda way  ```+ :: revursive a -> RoseTree a [RoseTree a]```.
* fp :: recursive read folder  by FP way  ```+ :: revursive a -> RoseTree a [RoseTree a]```.


## Cli 
* obtain the "dependencies" property for search *.json ```fp-cli-e``` using ```npm run fp-cli-e -- --action cli-json```  

Its beatiful think thath this model data [Tupla, Tupla, ...], can be made like this
```pipe(map, map)(f)(xs)``` and then access to child Tupla.map to run f, then return again [Tupla, Tupla, ....]
Path now is incremental in fp-way, The data.tree got only folder name .
