"use strict";
/*Just helper for ui to notify where the center of an object is*/
function Cross(scl) {
    PIXI.Container.call(this);

    this.addChild(Utils.drawRect(-1, -10, 2, 20, "0x000000"));
    this.addChild(Utils.drawRect(-10, -1, 20, 2, "0x000000"));
    this.scale.set(scl || 1);

}

Cross.prototype = Object.create(PIXI.Container.prototype);
Cross.prototype.constructor = Cross;