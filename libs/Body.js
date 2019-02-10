"use strict";
/**
* Body object represents a main class which holds all
 * all constructors for creating physical things of the game world.
 * Each particular physical body/thing can have it own unique properties and methods
*   bodyShape: 1 is rectangle, 2 - is circle;
 * */

var Body = {};

Body.Solid = function (name) {
    Sprite.call(this, name);

    this.velocity = Vector2D.create(0,0);
    this.bodyShape = 1;
    this.forces = [];

};

Body.Solid.prototype = Object.create(Sprite.prototype);
Body.Solid.prototype.constructor = Body.Solid;

Body.Solid.prototype.setVelocity = function(magnitude, direction){
    this.velocity.magnitude = magnitude;
    this.velocity.angle = direction;
};

Body.Solid.prototype.addForce = function (name, magnitude, direction){

    this[name] = Vector2D.create(0,0);
    this[name].magnitude = magnitude;
    this[name].angle = direction;

    this.forces.push(this[name]);
};

Body.Solid.prototype.deletForce = function(name){
    var idx = this.forces.indexOf(this[name]);
    if(idx === -1) return;
    this.forces.splice(idx, 1);
};

Body.Solid.prototype.update = function(delta){

    for(var i = this.forces.length - 1; i >= 0; --i){
        this.velocity.add(this.forces[i]);
    }
    this.add(this.velocity, delta);
};

/*I will keep it simple for now.
* But I should probably patch my Vector2D in to PIXI.Point prototype as it was discussed here
 * https://github.com/pixijs/pixi.js/issues/403
 * */
Body.Solid.prototype.add = function (vec2, delta) {
    if(!vec2) return;
    if(!delta) delta = 16;

    this.position.x += (vec2.x * delta/16);
    this.position.y += (vec2.y * delta/16);
};

Body.Solid.prototype.addTo =  function (vec2) {
    return new Vector2D(vec2.x + this.x, vec2.y + this.y);
};

Body.Solid.prototype.subtractFrom = function (vec2) {
    return new Vector2D(vec2.x - this.x, vec2.y - this.y);
};


