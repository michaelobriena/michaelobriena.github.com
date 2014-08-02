define(function(require, exports, module) {
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var RenderNode = require('famous/core/RenderNode');
    var Transitionable = require('famous/transitions/Transitionable');
    var SideData = require('./SideData');
    var Box = require('./Box');

    function Tentacle(options) {
        RenderNode.apply(this, arguments);

        // Box Data
        this.side = options.side;
        this.palette = options.palette;

        // Data based on the particular side
        this.direction = SideData[options.side].direction;
        this.freeAxisIndex = SideData[options.side].freeAxisIndex;
        this.rotations = SideData[options.side].rotations;

        // Transitionables of state
        this.breath = options.breath;
        this.rotation = options.rotation;

        //State of rotation
        this.currentRotation;
        this.currentFreeAxisSpin;
        this.update();

        // Middle sized box
        this.middleBox = new Box(options.midBoxSize, this.palette);
        this.middleBoxTranslation = [0, 0, 0];
        this.middleBoxModifier = new Modifier({
            transform: function() {
                this.middleBoxTranslation[this.freeAxisIndex] = this.breath.get() * this.direction;
                return Transform.translate.apply(null, this.middleBoxTranslation);
            }.bind(this)
        });

        // Small box
        this.smallBox = new Box(options.smallBoxSize, this.palette);
        this.rotationState = 0;
        this.smallBoxMainRotation = new Modifier({ // Main rotation
            transform: function () {
                this.rotationState = this.rotation.get();
                return Transform.rotate(
                    this.currentRotation[0] * this.rotationState,
                    this.currentRotation[1] * this.rotationState,
                    this.currentRotation[2] * this.rotationState
                );
            }.bind(this)
        });

        this.smallBoxTranslation = new Modifier({ // Translation
            transform: _createSmallBoxTranslation.call(this, options.smallBoxSpacing)
        });

        this.freeAxisRotation = [0, 0, 0];
        this.smallBoxFreeAxisRotation = new Modifier({ // Spin around free axis
            transform: function () {
                this.freeAxisRotation[this.freeAxisIndex] = this.rotation.get() * this.currentFreeAxisSpin;
                return Transform.rotate.apply(null, this.freeAxisRotation);
            }.bind(this)
        });

        // Create the scene graph
        _createSceneGraph.call(this);
    }

    Tentacle.prototype = Object.create(RenderNode.prototype);
    Tentacle.prototype.constructor = Tentacle;

    // Create the scene graph
    function _createSceneGraph() {
        var node = this.add(this.middleBoxModifier);
        node.add(this.middleBox);

        node.add(this.smallBoxMainRotation)
            .add(this.smallBoxTranslation)
            .add(this.smallBoxFreeAxisRotation)
            .add(this.smallBox);
    }

    // Based on the direction, create the correct translation array
    function _createSmallBoxTranslation(spacing) {
        var translation = [0, 0, 0];
        translation[this.freeAxisIndex] = spacing * this.direction;
        return Transform.translate.apply(null, translation);
    }

    // Find a random integer
    function _discreteRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Get a new random side to transition to and a new value for extra spin along
    // the tentacles free axis
    Tentacle.prototype.update = function() {
        this.currentRotation = SideData[this.side].rotations[_discreteRandom(0, 3)];
        this.currentFreeAxisSpin = Math.PI * _discreteRandom(0, 5);
    };

    module.exports = Tentacle;
});