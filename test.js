var Manager = require('./');

var man = new Manager();

var testc = {
    init: function() { console.log('init', this.id, this.name); },
    update: function() { 
        console.log('update', this.id, this.name); 
        this.game.spawn(tester, 0, 0, { name: 'clono' });
    }
};

var tester = {
    name: 'jerry',
    components: [ testc ]
};

man.spawn(tester, 0, 0, {});
man.spawn(tester, 0, 0, { name: 'jar' });

function up() {
    man.update(1/30);
}

up();
up();
