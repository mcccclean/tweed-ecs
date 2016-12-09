
var Entity = require('./entity');

function Manager() {
    this.entities = [];
    this.newentities = [];

    this.time = 0;
    this.frame = 0;
    this.id = 1;
}

Manager.prototype.spawn = function(blueprint, params) {
    var obj = Object.assign(new Entity(), blueprint, params, {
        game: this,
        id: this.id
    });
    this.id += 1;

    obj.message('init');

    this.newentities.push(obj);
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
            // TODO: destroy callback on host
            return !e.destroyed;
        });
    
    this.frame += 1;
};

module.exports = Manager;
