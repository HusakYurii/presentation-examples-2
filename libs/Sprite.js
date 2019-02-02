"use strict";
/**
* A custom Sprite class, this class just a nice wrapper.
 * If there is no texture under given name, it sets to EMPTY texture - it was done
 * for preventing errors.
* */
function Sprite(name) {
    var texture = name ? PIXI.Texture.fromFrame(name) : PIXI.Texture.EMPTY;
    PIXI.Sprite.call(this, texture);

    this.anchor.set(0.5);

}

Sprite.prototype = Object.create(PIXI.Sprite.prototype);
Sprite.prototype.constructor = Sprite;

