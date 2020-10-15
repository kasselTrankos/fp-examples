//io-ex.js is
const IO = require('./fp/monad/io');
var fs = require('fs');

const { B } = require('./lambda'); 
import {map, chain} from './utils';

const io_window = IO(() =>(
  {a: 1, innerWidth: 900}
));

//  readFile :: String -> IO String
var readFile = filename => IO(() => fs.readFileSync(filename, 'utf-8'))


//  print :: String -> IO String
var print = function(x) {
  return IO(function() {
    return x;
  });
};


var cat = B(chain(print))(readFile);

console.log(cat('./README.md').unsafePerformIO(), '00000')
const e = io_window.map((win) => win.innerWidth);
console.log(e.unsafePerformIO())
