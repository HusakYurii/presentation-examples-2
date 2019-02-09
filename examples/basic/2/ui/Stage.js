function Stage(){
	PIXI.Container.call(this);

	this.center = null;
	this.ball = null;

	this.addAllComponents();

	this.hitArea = new PIXI.Rectangle(-1,-1,2,2);

	this.isPause = true;

    this.interactive = true;
    this.isClisked = false;
    this.isMoved = false;

    this.on("pointerdown", this.onPointerDown, this);
    this.on("pointermove", this.onPointerMove, this);
    this.on("pointerup", this.onPointerUp, this);
    this.on("pointerupoutside", this.onPointerUp, this);
}
	
Stage.prototype = Object.create(PIXI.Container.prototype);
Stage.prototype.constructor = Stage;

Stage.prototype.addAllComponents = function () {
	this.center = this.addChild(new PIXI.Graphics()).beginFill(0xFF0000, 1).drawRect(-5,-5,10,10).endFill();

	this.ball = this.addChild(new Body.Solid("ball"));
    this.ball.addForce("steer", 0,0);

};


Stage.prototype.onPointerDown = function (event) {
    if (this.isClisked) return;
    this.isClisked = true;
    this.isPause = false;

};

Stage.prototype.onPointerMove = function (event) {
    if (!this.isClisked) return;
    this.isMoved = true;

    var loc = event.data.getLocalPosition(this);

    var mouse = new Vector2D(loc.x, loc.y);

    var res = this.ball.subtractFrom(mouse).normalize();
	this.ball.steer.magnitude = res.magnitude * 0.2;
	this.ball.steer.angle = res.angle;
};

Stage.prototype.onPointerUp = function (event) {
    this.isClisked = false;
    this.isMoved = false;

};

Stage.prototype.ticker = function(delta) {

	this.ball.update(delta);
	this.ball.velocity.limit(3);

	if(!this.isClisked && !this.isPause) {
		if(this.ball.velocity.magnitude < 0.001) this.isPause = true;

        this.ball.velocity.magnitude *= 0.95;
        this.ball.steer.magnitude *= 0.95;
	}

};

Stage.prototype.resizeStage = function(glW, glH) {
    this.hitArea.width = glW;
    this.hitArea.height = glH;
    this.hitArea.x = -glW/2;
	this.hitArea.y = -glH/2;
};
