// find patterm

import { readDir, writefile, readfile, isdirectory, basename } from './utils/fs'
import { fork, encase, map, chain, bichain, resolve, parallel, ap } from 'fluture'
import { question } from './utils/cli';
import { compose, not, curry, identical, filter, flatten} from 'ramda';
import { ignoreHidden, getFileByExtension, toJSON, splitCodeLines, log } from './utils';
import { zip, extract, fst, pipe } from 'sanctuary';
import { Token, toPatternArray, toMarkdown } from './fp/monad/tokenize'
import S from 'sanctuary'



// ignoreByName :: String -> Boolean
const ignoreByName = name => compose(not, curry(identical)(name), basename)

const getFilesInDir = files => resolve(files)
  .pipe(map(filter(ignoreByName('node_modules'))))
  .pipe(map(filter(compose(ignoreHidden, basename))))
  .pipe(chain(filteredFiles => 
    parallel(Infinity)(filteredFiles.map(isdirectory))
      .pipe(map(isDir => zip(isDir)(filteredFiles)))
      .pipe(chain(recurDir))
      .pipe(map(flatten))
  ))

// searchInFiles :: [ String ] -> {} -> [ String ] -> [ String ]
const searchInFiles = titles => pattern => content => pipe([
  S.map(Token),
  S.map(toPatternArray(pattern)),
  S.map(x => toMarkdown(splitCodeLines(content.shift()))(x)),
  S.map(x => x.unsafePerformIO()),
  S.map(x => x.length ? `\n\n##${titles.shift()}${x}` : ''),
])
(content)

// readDirs :: [Pair a b] -> Future e [ String ]
const recurDir = dir => parallel(Infinity)(dir.map( p =>
  fst(p) 
    ? readDir(extract(p)).pipe(chain(getFilesInDir))
    : resolve(extract(p))
))

// getListFiles :: String -> Future e [String]
const getListFiles = path => readDir(path)
  .pipe(chain(getFilesInDir))
  .pipe(map(filter(compose(getFileByExtension('js'), basename))))

// setDefaultFolderOnError :: a -> b -> Future c d -> Future a b
const setDefaultFolderOnError = _defaultPath => path => isdirectory(path)
  .pipe(bichain(()=> resolve(_defaultPath))(()=> resolve(path)))

  // saveMarkdown :: String -> Future a b -> Future a b
const saveMarkdonw = markdown => question('name file: ')
  .pipe(chain(encase(x => x.element)))
  .pipe(chain(filename => writefile(`${filename}.md`)(markdown)))
  .pipe(map(x => 'FILE SAVED'))

// filterTokenize -> String -> [ String ] -> Future 
const filterTokenize = path => files => readfile('tokens.json')
  .pipe(map(toJSON))
  .pipe(chain(
    tokens => resolve(searchInFiles)
    .pipe(ap(resolve(files)))
    .pipe(ap(resolve(tokens)))
    .pipe(ap(parallel(Infinity)(files.map(readfile))))
  ))
  .pipe(map(x => `#(${path})\n\n${x.join('')}`))

const proc = question('Give a path: ')
  .pipe(chain(encase(x => x.element)))
  .pipe(chain(setDefaultFolderOnError('.')))
  .pipe(chain(path => 
    getListFiles(path)
    .pipe(chain(files => filterTokenize(path)(files)))
  ))
  .pipe(chain(saveMarkdonw))
  // .pipe(chain(question('name file: ')))
  // .pipe(chain(question('name file: ')
  //   .map(prop('element'))
  //   .chain(name => writefile(`${name}.md`)(str))
  // )))
  


// compute
fork(log('error'))(log('response'))(proc)


