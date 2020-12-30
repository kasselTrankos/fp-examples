// tokenize is
const daggy = require('daggy');
import { tokenize } from 'esprima';
import {KMPSearch} from './../../utils/algoritm/knuthmorrispratt';
import { prop, props, add, flatten, last, keys, curry, equals, find} from 'ramda';
import { getIndexValue } from './../../utils'
import S from 'sanctuary'
import fl from 'fantasy-land'

// getLineNumber :: String -> {} -> Int 
const getLineNumber = position => loc => prop('line', prop(position, loc));

// getColumnNumber :: String -> {} -> Int 
const getColumnNumber = position => loc => prop('column', prop(position, loc));

// getStartLineNumber :: {} -> Int
const getStartLineNumber = obj => getLineNumber('start')(obj);

// getEndLineNumber :: {} -> Int
const getEndLineNumber = obj => getLineNumber('end')(obj);

// getStartColumnNumber :: {} -> Int
const getStartColumnNumber = obj => getColumnNumber('start')(obj);


// getEndColumnNumber :: {} -> Int
const getEndColumnNumber = obj => getColumnNumber('end')(obj);


// getIdentifier :: String -> {} -> Boolean
const getIdentifier = pattern => obj => 
equals(props(['type', 'value'], obj), pattern);

const Tokenize = daggy.tagged('Tokenize', ['unsafePerformIO']);


// map :: f => ( a -> b) -> f b
Tokenize.prototype[fl.map] = Tokenize.prototype.map = function(f) {
    return Tokenize(()=>f(this.unsafePerformIO()))
}

export const toPatternArray = arr => tokenize => tokenize.toPatternArray(arr);
Tokenize.prototype.toPatternArray = function(arr) {
    const pattern = arr.map(x => [...keys(x), prop(prop(0, keys(x)), x)]);
    const KPMs =  this.map(curry(KMPSearch)(getIdentifier)(pattern));
  
    const unifyElements = elms => [ ... new Set(flatten(elms)) ];
    const getLines = x => unifyElements(x.map(z => [
      add(getStartLineNumber(prop('loc', z)))(-1),
      add(getEndLineNumber(prop('loc', z)))(-1)
    ]))

    return KPMs.map(x => x.map(y => ({
      lines: getLines(y),
      start: {
        line: add(getStartLineNumber(prop('loc', prop(0, y))))(-1), 
        column: getStartColumnNumber(prop('loc', prop(0, y)))
      },
      end: { 
        line: add(getEndLineNumber(prop('loc', last(y))))(-1),
        column: getEndColumnNumber(prop('loc', last(y))) + prop('value', last(y)).length
      }
    })))
}

export const toMarkdown = data => tokenize => tokenize.toMarkdown(data)
Tokenize.prototype.toMarkdown = function(code) {

  const getStartMarkdown = x => this.map(find(p => getStartLineNumber(p) === x)).unsafePerformIO()
  const getEndMarkdown = x => this.map(find(p => getEndLineNumber(p) === x)).unsafePerformIO()
  const insertNegrita = str => pos => {
    const arrStr = str.split('')
    arrStr.splice(pos, 0, '*')
    arrStr.splice(pos, 0, '*')
    return arrStr.join('');
  }
  const getLineMarkdown = x => {
    const str = getIndexValue(code)(x)
    const startStr = getStartMarkdown(x) ? insertNegrita(str)(getStartColumnNumber(getStartMarkdown(x))) : str
    const endStr = getEndMarkdown(x) ? insertNegrita(startStr)(getEndColumnNumber(getEndMarkdown(x))) : startStr
    
    return endStr
  }; 

  return this.map(S.map( x =>
    S.reduce(acc => x => `${acc}\n**line ${x}**:${getLineMarkdown(x)}`)('')(prop('lines')(x))
  ))
}


export const Token = code => Tokenize(() => tokenize(code, { comment: true, loc: true }));