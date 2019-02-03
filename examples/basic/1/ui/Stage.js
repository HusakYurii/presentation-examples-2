function Stage(){
	PIXI.Container.call(this);
	this.center = null;

	this.addAllComponents();
}
	
Stage.prototype = Object.create(PIXI.Container.prototype);
Stage.prototype.constructor = Stage;

Stage.prototype.addAllComponents = function () {
	this.center = this.addChild(new PIXI.Graphics()).beginFill(0xFF0000, 1).drawRect(-5,-5,10,10).endFill();

};


Stage.prototype.ticker = function(delta) {

};

Stage.prototype.resizeStage = function(glW, glH) {
	
};
