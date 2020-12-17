// maintain state

import Arrow from 'crocks/Arrow'


import compose from 'crocks/helpers/compose'
import getProp from 'crocks/Maybe/getProp'
import option from 'crocks/pointfree/option'
import branch from 'crocks/Pair/branch'
toUpper

import Pair from 'crocks/Pair'

import merge from 'crocks/pointfree/merge'

// le// arrToUpper :: Arrow String
const arrToUpper =
Arrow(x => x.toUpperCase())

arrToUpper
.runWith('burrito bounce')
//=> 'BURRITO BOUNCE'

// join :: Pair String -> Object
const join = p => ({
original: p.snd(),
result: p.fst()
})

// flow :: Arrow String Object
const flow =
arrToUpper
  .first()
  .promap(branch, join)

const c = flow
.runWith('taco time')

console.log(c)