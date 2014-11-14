var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;

var mainContext = Engine.createContext();
mainContext.setPerspective(400);

var redSurface = new Surface({
    size: [200, 200],
    properties: {
        backgroundColor: 'red'
    }
});

var blueSurface = new Surface({
    size: [200, 200],
    properties: {
        backgroundColor: 'blue'
    }
});

var mainMod = new Modifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform : Transform.rotateX(-1)
});

var mainNode = mainContext.add(mainMod)

mainNode.add(new Modifier({transform: Transform.rotateY(Math.PI/4)})).add(redSurface);
mainNode.add(new Modifier({transform: Transform.rotateY(-Math.PI/4)})).add(blueSurface);
