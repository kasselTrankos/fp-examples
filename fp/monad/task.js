// task monad

function Task(computation, complete) {
    this.fork = computation;
    this.cleanup = complete || function() {};
}

Task.of = function(x) {
    return new Task((_, resolve) => resolve(x));
}

Task.prototype.map = function(f) {
    return new Task((reject, resolve)=> this.fork(reject, x => resolve(f(x))));
}


module.exports = Task;