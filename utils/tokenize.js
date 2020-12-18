// tokenize.js is
import { equals, prop, props} from 'ramda'
import IO from './../fp/monad/io';
import { tokenize } from 'esprima';

// tokenizeIO : String -> IO {}
export const tokenizeIO = code => IO(() => tokenize(code, { comment: true, loc: true }));


// getIdentifier :: String -> {} -> Boolean
export const getIdentifier = pattern => obj => 
  equals(props(['type', 'value'], obj), ['Identifier', pattern]);


// getLineNumber :: String -> {} -> Int 
export const getLineNumber = position => loc => prop('line', prop(position, loc));

// getColumnNumber :: String -> {} -> Int 
export const getColumnNumber = position => loc => prop('column', prop(position, loc));

// getStartLineNumber :: {} -> Int
export const getStartLineNumber = obj => getLineNumber('start')(obj);

// getStartColumnNumber :: {} -> Int
export const getStartColumnNumber = obj => getColumnNumber('start')(obj);

// getEndColumnNumber :: {} -> Int
export const getEndColumnNumber = obj => getColumnNumber('end')(obj);


