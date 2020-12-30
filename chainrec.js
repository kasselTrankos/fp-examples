// chainRec


const Free = require('@safareli/free') 
const { lift3 } = require( 'sanctuary-type-classes')
import {Identity} from 'ramda-fantasy'
import fl from 'fantasy-land'
import {node, go, after, coalesce, reject    , encase, chain, resolve, fork} from 'fluture'
import S from 'sanctuary'

// log :: String -> a -> a
const log = label => x =>
  (console.log(`[${label}]:`, x), x)
const patch = obj => Object.keys(fl).forEach(key => {
    if (typeof obj[key] === 'function') {
        console.log(key, '193023')
      obj[fl[key]] = obj[key]
    }
  })
  
const patchAll = (objs) => objs.forEach(patch)
var fixedAp = function(f) { return f.ap(this) }
Identity.prototype[fl.ap] = fixedAp
patchAll([
    Identity, Identity.prototype]
)

const tree = Free.liftF(1).chain(
    a => Free.liftF(2).chain(
      b => Free.of([a, b])
    )
  )

const m = tree.hoist((a) => a + 2).foldMap((a) => Identity(a), Identity)
console.log(tree, Identity(8), m)

const ma = (function recur (x) {
    const mx = resolve (x + 1)
       return  x < 100000 ? chain (recur) (mx) : mx
     }(1))
    
 fork (log ('rejection')) (log ('resolution')) (ma)
// [resolution]: 100001
fork (log ('rejection')) (log ('resolution')) (go (function*() {
    const thing = yield after (20) ('world')
    const message = yield after (20) ('Hello ' + thing)
    return message + '!'
}))

const control = coalesce (S.Left) (S.Right)

fork (log ('rejection')) (log ('resolution')) (go (function*() {
  const thing = yield control (reject ('It broke!'))
   return S.either (x => `Oh no! ${x}`)
                   (x => `Yippee! ${x}`)
                   (thing)
 }))