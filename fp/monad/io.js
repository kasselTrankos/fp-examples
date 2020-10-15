// IO.js
const daggy = require('daggy');
const B = f => g => x => f(g(x))

const IO = daggy.tagged('IO', ['unsafePerformIO']);

IO.prototype.map= function(f) {
  return IO(B(f)(this.unsafePerformIO));
}

IO.of = function(x) {
  return IO(()=> x)
}

IO.prototype.chain= function(f) {
  return IO.of(this.map(f).unsafePerformIO().unsafePerformIO())
}

IO.of= function (x) {
  return IO(() => x);
}

module.exports = IO;

