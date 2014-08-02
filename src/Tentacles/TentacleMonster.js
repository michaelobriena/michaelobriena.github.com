define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Transitionable = require('famous/transitions/Transitionable');
    var ColorPalettes = require('../color/ColorPalettes');
    var Box = require('./Box');
    var Tentacle = require('./Tentacle');

    function TentacleMonster(options) {
        View.call(this, options);

        // State
        this.breath = new Transitionable(this.options.sizes[0]);
        this.rotation = new Transitionable(0);
        
        this.tentacles = [];

        _createSceneGraph.call(this);

        // Start animations
        this.breathe();
        this.animateRotations();
    }

    TentacleMonster.prototype = Object.create(View.prototype);
    TentacleMonster.prototype.constructor = TentacleMonster;

    TentacleMonster.DEFAULT_OPTIONS = {
        sizes: [100, 50, 25],
        spacing: [150, 75],
        palette: 4,
        sides: [
            'down',
            'up',
            'right',
            'left',
            'front',
            'back',
        ]
    };

    // Create the tentacles and add to the scene graph
    function _createSceneGraph() {
        this.add(new Box(this.options.sizes[0], this.options.palette));

        var tentacle;
        for (var i = 0; i < this.options.sides.length; i++) {
            tentacle = new Tentacle({
                side: this.options.sides[i],
                midBoxSize: this.options.sizes[1],
                smallBoxSize: this.options.sizes[2],
                smallBoxSpacing: this.options.spacing[1],
                palette: this.options.palette,
                breath: this.breath,
                rotation: this.rotation
            });

            this.tentacles.push(tentacle);
            this.add(tentacle);
        }
    }

    // Endlessly loop the breathing of the middle boxes
    TentacleMonster.prototype.breathe = function breathe() {
        this.breath.set(Math.floor(Math.random() * this.options.sizes[0]) + (this.options.sizes[0] + this.options.sizes[1]) / 2,
            {curve: 'easeIn', duration: 1000},
            this.breathe.bind(this));
    };

    // Endlessly animate the winding and unwinding of the small boxes'
    // rotation along their free access
    TentacleMonster.prototype.animateRotations = function animateRotations() {
        this.updateTentacles();
        this.rotation.set(1,
            {curve: 'easeIn', duration: 1000},
            function() {
                this.rotation.set(0,
                    {curve: 'easeIn', duration: 2000},
                    this.animateRotations.bind(this));
            }.bind(this)
        );
    };

    TentacleMonster.prototype.updateTentacles = function updateTentacles() {
        for (var i = 0; i < this.options.sides.length; i++) this.tentacles[i].update();
    };

    module.exports = TentacleMonster;
});