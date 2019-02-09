function Stage(){
	PIXI.Container.call(this);

	this.pointer = null;
    this.bricks = [];
    this.ball = null;

	this.addAllComponents();
}
	
Stage.prototype = Object.create(PIXI.Container.prototype);
Stage.prototype.constructor = Stage;

Stage.prototype.addAllComponents = function () {

	this.pointer = this.addChild(new Cross());

	this.ball = this.addChild(new Ball("ball"));

	var bricks = CONFIG.bricks;

	for(var i = 0; i < bricks.length; i++){
		var params = bricks[i];
		var brick = new Brick(params.url);

        brick.position.set(params.loc.x, params.loc.y);
        brick.rotation = params.angle;

        this.bricks.push(brick);
        this.addChild(brick);
	}

};
/*This one for manipulating using DOM */
Stage.prototype.addForceOnBall = function (n, val){
	n = Number(n);
	val = Number(val);
    switch (n){
		case Stage.VELOCITY_DIR: this.ball.velocity.angle = val; break;
		case Stage.VELOCITY_MAG: this.ball.velocity.magnitude = val; break;
		case Stage.ACC_MAG: this.ball.addForce("g", val, Math.PI/2); break;
	}
};

Stage.prototype.isOutOfWorld = function (obj) {
	var ws = {
		width: Layout.glW,
        height: Layout.glH,
	};

    if( Math.abs(obj.x) >= ws.width/2) {
    	obj.changeDir({rotation: Math.PI/2, roughness: 0.9})
    }
    if( Math.abs(obj.y) >= ws.height/2) {
    	obj.changeDir({rotation: 0, roughness:0.9})
    }

};

Stage.prototype.ticker = function(delta) {
	if(this.ball) this.ball.update(delta);
    this.ball.velocity.limit(10);

	this.isOutOfWorld(this.ball);

	var loc = this.ball.toGlobal({x:0, y:0});

	for(var i = this.bricks.length - 1; i >= 0; --i){
		if(!this.bricks[i].contains(loc.x, loc.y)) continue;
		this.ball.changeDir(this.bricks[i]);
	}
};

Stage.prototype.resizeStage = function(glW, glH) {

};

Stage.VELOCITY_DIR = 1;
Stage.VELOCITY_MAG = 2;
Stage.ACC_DIR = 3;
Stage.ACC_MAG = 4;