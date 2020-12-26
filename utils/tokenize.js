// tokenize.js is
import { equals, prop, props, keys, curry, flatten, add, last, map} from 'ramda'
import IO from './../fp/monad/io';
import { tokenize } from 'esprima';
import {KMPSearch} from './algoritm/knuthmorrispratt';

// tokenizeIO : String -> IO {}
export const tokenizeIO = code => IO(() => tokenize(code, { comment: true, loc: true }));


// getIdentifier :: String -> {} -> Boolean
export const getIdentifier = pattern => obj => 
  equals(props(['type', 'value'], obj), pattern);


// getLineNumber :: String -> {} -> Int 
export const getLineNumber = position => loc => prop('line', prop(position, loc));

// getColumnNumber :: String -> {} -> Int 
export const getColumnNumber = position => loc => prop('column', prop(position, loc));

// getStartLineNumber :: {} -> Int
export const getStartLineNumber = obj => getLineNumber('start')(obj);

// getEndLineNumber :: {} -> Int
export const getEndLineNumber = obj => getLineNumber('end')(obj);

// getStartColumnNumber :: {} -> Int
export const getStartColumnNumber = obj => getColumnNumber('start')(obj);


// getEndColumnNumber :: {} -> Int
export const getEndColumnNumber = obj => getColumnNumber('end')(obj);



IO.prototype.findArrPatterns = function(arr) {
  const pattern = arr.map(x => [...keys(x), prop(prop(0, keys(x)), x)]);
  const KPMs =  this.map(curry(KMPSearch)(getIdentifier)(pattern));

  const unifyElements = elms => [ ... new Set(flatten(elms)) ];
  const getLines = x => unifyElements(x.map(z => [
    add(getStartLineNumber(prop('loc', z)))(-1),
    add(getEndLineNumber(prop('loc', z)))(-1)
  ]))
  const lines = KPMs.map(x => x.map(y => ({
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

  return lines;
}
