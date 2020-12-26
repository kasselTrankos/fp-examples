// tokenize is
const daggy = require('daggy');
import { tokenize } from 'esprima';
import {KMPSearch} from './../../utils/algoritm/knuthmorrispratt';
import { prop, props, add, flatten, last, keys, curry, equals} from 'ramda';
import { getIndexValue } from './../../utils' 

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


Tokenize.prototype.map = function(f) {
    return Tokenize(()=>f(this.unsafePerformIO()));
}


Tokenize.prototype.findArrPatterns = function(arr) {
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

Tokenize.prototype.setMarkdown = function(lines) {
    const _lines = flatten(
        this.map(x => prop('lines')(x).map(l => ({ 
                [l]: compose(getIndexValue(lines))(l)
            })
        ))
    );
    const all = zip(fst, _lines)
    return [ all.map(x => {
      const lineStart = prop('line', prop('start', prop(0, x)));
      x[1][lineStart] = prop(prop('line', prop('start', prop(0, x))), prop(1, x)).substring(
        0, prop('column', prop('start', prop('0', x)))
      ) + '**' + prop(prop('line', prop('start', prop(0, x))), prop(1, x)).substring(
        prop('column', prop('start', prop('0', x)))
      );
      const lineEnd = prop('line', prop('end', prop(0, x)))
      x[1][lineEnd] = prop(prop('line', prop('end', prop(0, x))), prop(1, x)).substring(
        0, prop('column', prop('end', prop('0', x)))
      ) + '**' + prop(prop('line', prop('end', prop(0, x))), prop(1, x)).substring(
        prop('column', prop('end', prop('0', x)))
      );
      return Object.keys(prop(1, x)).reduce(
          (acc, y) => `${acc}\n* **line ${y}**: ${prop(y, prop(1, x))}`, '');
    })]
}


export const Token = code => Tokenize(() => tokenize(code, { comment: true, loc: true }));