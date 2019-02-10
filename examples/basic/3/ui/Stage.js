function Stage(){
	PIXI.Container.call(this);

	this.center = null;

	this.sun = null;
    this.moon = null;
    this.earth = null;

	this.addAllComponents();
}
	
Stage.prototype = Object.create(PIXI.Container.prototype);
Stage.prototype.constructor = Stage;

Stage.prototype.addAllComponents = function () {
	this.center = this.addChild(new PIXI.Graphics()).beginFill(0xFF0000, 1).drawRect(-5,-5,10,10).endFill();

	this.sun = this.addChild(new Planet("sun", {mass: 800, loc: {x: 0, y: 0}, vel:{mag: 0, angl: 0}, g:{mag: 0, angl: 0}}));
	this.earth = this.addChild(new Planet("earth", {mass: 8, loc: {x: 0, y: -300}, vel: {mag: -5, angl: 0}, g: {mag: 0, angl: 0}}));

};


Stage.prototype.ticker = function(delta) {
	this.earth.gravitateTo(this.sun, delta);
};

Stage.prototype.resizeStage = function(glW, glH) {
	
};
