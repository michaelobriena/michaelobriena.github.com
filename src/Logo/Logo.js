define(function(require, exports, module) {
    var Surface = require('famous/core/Surface');
    var RenderNode = require('famous/core/RenderNode');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');

    function Logo() {
        this.M = new Surface({
            size: [20, true],
            content: "M"
        });

        this.O = new Surface({
            size: [20, 20],
            properties: {
                backgroundColor: 'white',
                borderRadius: '10px'
            }
        });

        this.ichael = new Surface({
            size: [80, true],
            content: 'ichael'
        });

        this.brien = new Surface({
            size: [80, true],
            content: '\'Brien'
        });

        this.obrienModifier = new Modifier({
            transform: function() {
                return Transform.identity
            }.bind(this)
        })
    }

});