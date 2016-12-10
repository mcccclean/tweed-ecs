
function Entity() {
    
}

Entity.prototype.queryAny = function(m) {
    var args = [].slice.call(arguments, 1);
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
    var args = [].slice.call(arguments, 1);
    return this.components.map((c) => {
        var f = c[m];
        if(f) {
            return f.apply(this, args);
        }
    });
};

Entity.prototype.message = function(m) {
    var args = [].slice.call(arguments, 1);
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
