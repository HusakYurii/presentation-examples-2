var APP = {};
/*Initial sizes of a canvas*/
APP.w = 800;
APP.h = 800;
/*The current stage*/
APP.stage = null;

APP.isRun = false;

APP.run = function() {

    if(APP.isRun){return;}
    APP.isRun = true;

	var view = document.querySelector("canvas");

	APP.app = new PIXI.Application({
		width: APP.w,
		height: APP.h,
		view: view,
		transparent: false,
		backgroundColor: 0xFFFFFF
	});

	APP.app.ticker.add(APP.ticker);
	APP.preloadAssets(APP.addStage, Assets);
};

APP.addStage = function(){
    APP.stage = APP.app.stage.addChild(new Stage());
    Layout.resizeView();
};

APP.preloadAssets = function(onFinish, assets){
	if(Preloader && assets){
		Preloader.addAssets = assets;
	}
	if(Preloader && onFinish){
		Preloader.load(onFinish);
	}
	else{
        APP.addStage();
	}
};

APP.ticker = function () {
	if(!APP.stage  || !APP.stage.ticker){return;}
	var delta = APP.app.ticker.elapsedMS;
    APP.stage.ticker(delta);
};

APP.resizeStage = function(glW, glH){

    if(!APP.stage){return;}

    APP.stage.position.set(glW/2, glH/2);
    APP.stage.resizeStage(glW, glH);
};

window.addEventListener("load", APP.run);
