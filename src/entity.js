
// This class makes a lot of use of arguments to allow for variadic
// interface with functions. We need to get all but the first argument,
// but using [].slice.call(arguments, 1) renders the function unoptimisable.
// So, we've got a copy-pasted chunk to manually get it instead.
//
// see https://github.com/petkaantonov/bluebird/wiki/Optimization-killers

function Entity() {
    this.components = [];
}

Entity.prototype.queryAny = function(m) {
    var args = new Array(arguments.length);
    for(var i = 1; i < args.length; ++i) {
        args[i] = arguments[i];
    }

    for(var i = 0; i < this.components.length; ++i) {
        var f = this.components[i][m];
        if(f) {
            var ret = f.apply(this, args);
            if(typeof(ret) !== 'undefined') {
                return ret;
            }
        }
    }
};

Entity.prototype.queryAll = function(m) {
    var args = new Array(arguments.length);
    for(var i = 1; i < args.length; ++i) {
        args[i] = arguments[i];
    }

    return this.components.map((c) => {
        var f = c[m];
        if(f) {
            return f.apply(this, args);
        }
    });
};

Entity.prototype.message = function(m) {
    var args = new Array(arguments.length);
    for(var i = 1; i < args.length; ++i) {
        args[i] = arguments[i];
    }
    
    this.components.forEach((c) => {
        var f = c[m];
        if(f) {
            f.apply(this, args);
        }
    });
};

Entity.prototype.destroy = function() {
    this.destroyed = true;
};

module.exports = Entity;
