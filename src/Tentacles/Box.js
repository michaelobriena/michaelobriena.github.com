define(function(require, exports, module) {
    var Surface = require('famous/core/Surface');
    var RenderNode = require('famous/core/RenderNode');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ColorPalettes = require('../color/ColorPalettes');

    function Box(size, palette) {
        RenderNode.apply(this, arguments);

        this.size = size || 100;
        this.offsets = [ // Transforms for the sides of the box
            Transform.translate(0, 0, this.size/2),
            Transform.thenMove(Transform.rotateY(-Math.PI/2), [-this.size / 2, 0, 0]),
            Transform.thenMove(Transform.rotateY(Math.PI), [0, 0, -this.size / 2]),
            Transform.thenMove(Transform.rotateY(Math.PI/2), [this.size / 2, 0, 0]),
            Transform.thenMove(Transform.rotateX(-Math.PI/2), [0, this.size / 2, 0]),
            Transform.thenMove(Transform.rotateX(Math.PI/2), [0, -this.size / 2, 0])
        ];

        this.palette = palette || 4;
        this.colorPalette = ColorPalettes.getPalette(this.palette);

        // Create the sides and add them to the scene graph
        for (var i = 0; i < 6; i++) {
            this.add(new Modifier({
                size: [this.size, this.size],
                transform: this.offsets[i],
                origin: [.5, .5],
                align: [.5, .5]
            })).add(new Surface({
                size: [this.size, this.size],
                properties: {
                    border: '2px solid black',
                    backgroundColor: this.colorPalette.getColor(i % this.colorPalette.getCount()).toString()
                }
            }))
        }
    }

    Box.prototype = Object.create(RenderNode.prototype);
    Box.prototype.constructor = Box;

    module.exports = Box;
});