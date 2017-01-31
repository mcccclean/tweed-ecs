
var Entity = require('./entity');

function Manager() {
    this.entities = [];
    this.newentities = [];

    this.time = 0;
    this.frame = 0;
    this.id = 1;
}

Manager.prototype.findAny = function(cb) {
    return this.entities.find(cb);
};

Manager.prototype.findAll = function(cb) {
    return this.entities.filter(cb);
};

Manager.prototype.messageAll = function() {
    var args = new Array(arguments.length);
    for(var i = 1; i < args.length; ++i) {
        args[i] = arguments[i];
    }

    this.entities.forEach(function(e) {
        e.message.apply(e, args);
    });
};

Manager.prototype.spawn = function(blueprint, params) {
    var obj = Object.assign(new Entity(), blueprint, params, {
        game: this,
        id: this.id
    });
    this.id += 1;

    obj.message('init');

    this.newentities.push(obj);

    return obj;
};

Manager.prototype.update = function(dt) {
    this.time += dt;

    var newentities = this.newentities;
    this.newentities = [];

    this.entities = this.entities
        .concat(newentities)
        .filter(e => {
            e.message('update', dt);
            return true;
        })
        .filter(e => {
            if(e.destroyed) {
                e.message('destroy');
                return false;
            } else {
                return true;
            }
        });
    
    this.frame += 1;
};

module.exports = Manager;
