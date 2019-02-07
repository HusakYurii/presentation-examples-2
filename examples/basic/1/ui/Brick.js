"use strict";
/**
 * Class of "almost real" physical body - brick
 * */
function Brick(name) {
    Body.Solid.call(this, name);
    this.bodyShape = 1;
    this.roughness = 0.9;
}

Brick.prototype = Object.create(Body.Solid.prototype);
Brick.prototype.constructor = Brick;


Brick.prototype.contains = function (x, y) {

    var inside = false;
    var points = this.vertexData;
    var length = points.length / 2;

    for (var i = 0, j = length - 1; i < length; j = i++){

        var xi = points[i * 2];
        var yi = points[(i * 2) + 1];
        var xj = points[j * 2];
        var yj = points[(j * 2) + 1];

        var intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * ((y - yi) / (yj - yi))) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};