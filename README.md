# EXAMPLES OF FP

* lambda :: recursive read folder  by lambda way  ```+ :: revursive a -> RoseTree a [RoseTree a]```.
* fp :: recursive read folder  by FP way  ```+ :: revursive a -> RoseTree a [RoseTree a]```.

Start using **crokcks Async** soon is migrated to **Fluture Future** by two reason:
- There is no ap, to made traversable, or made lift. In future can use parallell, pap or concurrent, many methods.
- The method given by crocks all, breaks by "maxium call stack" and Future solve this even using parallel.

## Cli 
* obtain the "dependencies" property for search *.json using ```npm run fp-cli-e -- --action cli-json```  

Its beatiful think thath this model data [Tupla, Tupla, ...], can be made like this
```pipe(map, map)(f)(xs)``` and then access to child Tupla.map to run f, then return again [Tupla, Tupla, ....]
Path now is incremental in fp-way, The data.tree got only folder name .

Next step add the name js ```Identifier```  by cli 


Got three actions: 
 1. ```cli-json``` wich obtains dependencies prop from json.
 1. ```find-in-code``` wich find string given into .js code.
 1. ```find-pattern``` find recursive in your files( ignore dependencies) a pattern defined in ```token.json```