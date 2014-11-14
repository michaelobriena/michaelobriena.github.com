var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;

var mainContext = Engine.createContext();
mainContext.setPerspective(1000);

var surface = new Surface({
    size: [200, 200],
    content: "Hello World",
    properties: {
        lineHeight: "200px",
        textAlign: "center",
        backgroundColor: 'red'
    }
});

var surface2 = new Surface({
    size: [200, 200],
    content: "Hello World",
    properties: {
        lineHeight: "200px",
        textAlign: "center",
        backgroundColor: 'blue'
    }
});

var center = new Modifier({
    origin: [.5, .5],
    align: [.5, .5],
    transform: Transform.rotate(-.3, Math.PI/2-.1, 0)
})

var centerNode = mainContext.add(center);

centerNode.add(surface);

var topMod = new Modifier({
    size: [200, 200],
    origin: [.5, .5],
    transform: Transform.rotate(Math.PI/2, 0, 0)
});

var translationMod = new Modifier({
    transform: Transform.translate(0, -100, 0)
});

centerNode.add(translationMod).add(topMod).add(surface2);