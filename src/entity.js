
function Entity() {
    
}

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
