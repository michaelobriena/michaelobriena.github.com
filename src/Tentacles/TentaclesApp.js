define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var RenderNode = require('famous/core/RenderNode');
    var TentacleMonster = require('./TentacleMonster');
    var GenericSync = require('famous/inputs/GenericSync');
    var MouseSync = require('famous/inputs/MouseSync');
    var TouchSync = require('famous/inputs/TouchSync');
    var Camera = require('./Camera');
    GenericSync.register({mouse: MouseSync});
    GenericSync.register({touch: TouchSync});

    function App(perspective) {
        RenderNode.apply(this, arguments);

        this.camera = new Camera();
        this.perspective = perspective || 1000;
        this.rotation = 0;
        this.scale = 5
        this.currRotation;
        this.sync = new GenericSync(['mouse', 'touch']);
        this.tentacleMonster = new TentacleMonster();

        // Set up GenericSync
        _bindEventHandlers.call(this);

        // Create the scene graph
        this.add(this.camera)
            .add(this.tentacleMonster);

        // Start the camera movements
        this.startCameraAnimation();
    }

    App.prototype = Object.create(RenderNode.prototype);
    App.prototype.constructor = App;

    // Set up the Handlers for the Generic Sync
    function _bindEventHandlers() {
        Engine.pipe(this.sync);

        this.sync.on('start', function() {
            this.camera.setRotation([0, 0, 0]);
        }.bind(this));

        this.sync.on('update', function(data) {
            this.currRotation = this.camera.getRotation();
            var yRotation = this.currRotation[1] + Math.atan(-data.delta[0] * this.scale / this.perspective);
            var xRotation = this.currRotation[0] + Math.atan(data.delta[1] * this.scale / this.perspective);
            this.camera.setRotation([xRotation, yRotation, 0])
        }.bind(this));

        this.sync.on('end', this.startCameraAnimation.bind(this));
    }

    // Start animating the camera
    App.prototype.startCameraAnimation = function startCameraAnimation() {
        this.camera.setRotation([
            Math.floor(Math.random() * 2 * Math.PI),
            Math.floor(Math.random() * 2 * Math.PI),
            Math.floor(Math.random() * 2 * Math.PI)],
            { curve: 'easeInOut', duration: (Math.floor(Math.random() * 3000) + 1000)},
            this.startCameraAnimation.bind(this));
    }

    module.exports = App;
});