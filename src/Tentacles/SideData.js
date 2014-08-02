define(function(require, exports, module) {
    var rotations = {
        'noY': [
            [Math.PI/2, 0, 0],
            [-Math.PI/2, 0, 0],
            [0, 0, Math.PI/2],
            [0, 0, -Math.PI/2]
        ],
        'noX': [
            [0, 0, Math.PI/2],
            [0, 0, -Math.PI/2],
            [0, Math.PI/2, 0],
            [0, -Math.PI/2, 0]
        ],
        'noZ': [
            [Math.PI/2, 0, 0],
            [-Math.PI/2, 0, 0],
            [0, Math.PI/2, 0],
            [0, -Math.PI/2, 0]
        ]
    };

    module.exports = {
        'down': {
            direction: 1,
            freeAxisIndex: 1,
            rotations: rotations['noY']
        },
        'up': {
            direction: -1,
            freeAxisIndex: 1,
            rotations: rotations['noY']
        },
        'right': {
            direction: 1,
            freeAxisIndex: 0,
            rotations: rotations['noX']
        },
        'left': {
            direction: -1,
            freeAxisIndex: 0,
            rotations: rotations['noX']
        },
        'front': {
            direction: 1,
            freeAxisIndex: 2,
            rotations: rotations['noZ']
        },
        'back': {
            direction: -1,
            freeAxisIndex: 2,
            rotations: rotations['noZ']
        },
    }
});