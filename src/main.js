define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var TentaclesApp = require('./Tentacles/TentaclesApp');

    var mainContext = Engine.createContext();
    var perspective = 1000;
    mainContext.setPerspective(perspective);

    mainContext.add(new Modifier({
        origin: [0.5, 0.5],
        align: [.5, .5]
    })).add(new TentaclesApp(perspective));

    mainContext.add(new Modifier({
        transform: Transform.translate(30, 30, 0)
    })).add(new Surface({
        content: "Michael O'Brien",
        properties: {
            fontSize: '30px',
            fontFamily: 'Helvetica',
            color: 'white'
        }
    }));
    
});
