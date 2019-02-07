"use strict";
/**
 * Class of "almost real" physical body - ball
 * */
function Ball(name) {
    Body.Solid.call(this, name);
    this.bodyShape = 2;

    this.interactive = true;
    this.isClisked = false;
    this.isMoved = false;

    this.on("pointerdown", this.onPointerDown, this);
    this.on("pointermove", this.onPointerMove, this);
    this.on("pointerup", this.onPointerUp, this);
    this.on("pointerupoutside", this.onPointerUp, this);
}

Ball.prototype = Object.create(Body.Solid.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.changeDir = function (obj) {
    var angle = this.velocity.angle;
    this.velocity.angle = 2*obj.rotation - angle;
    this.velocity.multiply(obj.roughness);
};


Ball.prototype.onPointerDown = function (event) {
    if (this.isClisked) return;
    this.isClisked = true;
};

Ball.prototype.onPointerMove = function (event) {
    if (!this.isClisked) return;
    var loc = event.data.getLocalPosition(this.parent);
    this.position.set(loc.x, loc.y);
    this.isMoved = true;

};

Ball.prototype.onPointerUp = function (event) {
    this.isClisked = false;
    this.isMoved = false;
};
