// is obtain-files.js
import { question } from './utils/cli';
import { readdir, isdirectory, basename, readfile, writefile } from './utils/fs';
import { Token } from './fp/monad/tokenize' 
import { ignoreHidden, getFileByExtension, toJSON, map, splitCodeLines, getIndexValue } from './utils';
import { all } from 'crocks/Async';
import { zipWith, flatten, filter, compose, prop, isEmpty, not, curry, zip } from 'ramda';
import Pair from 'crocks/Pair'
import Async from 'crocks/Async'

const { Resolved } = Async

// concatPath :: [String] -> String -> [ String ]
const concatPath = a => b => b.map(c => `${a}/${c}`);

// removeNodeModulesFolder :: String -> Bool
const removeNodeModulesFolder = x => compose(x => x !== 'node_modules', basename)(x);

// getDirs :: [String] -> Async e [String]
const getDirs = files => Async.of(
  files
    .filter(removeNodeModulesFolder)
    .filter(compose(ignoreHidden, basename))
  )
  .chain(filteredFiles => 
    all(filteredFiles.map(isdirectory))
    .map(isDir => zipWith((a, b) =>  Pair(a, b), isDir, filteredFiles))
    .chain(readDirs)
    .map(flatten)
  )

// setFullPath :: String -> Async e [ String ]
const setFullPath = file => Async.of(concatPath)
  .ap(Resolved(file))
  .ap(readdir(file))


// readDirs :: [String] -> Async e [String]
const readDirs = dir => all(dir.map(
  x => x.fst()
    ? setFullPath(x.snd()).chain(getDirs)
    : Resolved(x.snd()))
);

// all this to tokenize
const getLines = (fst, snd) => {
  const lines = flatten(fst.map(x => prop('lines')(x).map(l => ({ 
      [l]: compose(getIndexValue(snd))(l)
    })
  )));
  const all = zip(fst, lines)
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
    return Object.keys(prop(1, x)).reduce((acc, y) => `${acc}\n* **line ${y}**: ${prop(y, prop(1, x))}`, '' );
  })]
  
}
const zipThreeWith = (f, x, y ,z ) => Array.from({length: x.length}, (_, i)=> 
  f(prop(i, x), prop(i, y), prop(i, z))
)


const getContent = ([title, code, pattern]) => Pair(pattern, code)
  .map(splitCodeLines)
  .merge(getLines)
  .map(x => `\n\n##${title}${x}`)

// searchInFiles :: [ String ] -> {} -> [ String ]
const searchInFiles = files =>  pattern => content =>
  Pair(pattern, content)
    .map(map(Token))
    .merge((a, b) => zipThreeWith((a, b, z) => [a, b , z], files, content, 
        b.map(x =>x.findArrPatterns(a).unsafePerformIO())
    ))
    .filter(compose(not, isEmpty, prop(2)))
    .map(getContent)

// getListFiles :: String -> Async err [ String]
const getListFiles = path => 
  readdir(path)
  .map(concatPath(path))
  .chain(getDirs)
  .map(filter(compose(getFileByExtension('js'), basename)));


const filterTokenize = path => files =>
  readfile('tokens.json')
  .map(toJSON)
  .chain(rules => 
    Async.of(searchInFiles)
    .ap(Resolved(files))
    .ap(Resolved(rules))
    .ap(all(files.map(readfile)))
  )
  .map(flatten)
  .map(x => `#(${path})\n\n${x}`)
  
question('Dame un path ("." error | default): ')
  .map(prop('element'))
  .chain(
    path => isdirectory(path)
    .bichain( () => Resolved('.'), () => Resolved(path) )
  )
  .chain(path => 
    getListFiles(path)
    .chain(files => filterTokenize(path)(files))
  )
  .chain(
    str => question('name file: ')
    .map(prop('element'))
    .chain(name => writefile(`${name}.md`)(str))
  )
  .fork(x => console.error('e-rr-or m', x),x =>  console.log(x));
