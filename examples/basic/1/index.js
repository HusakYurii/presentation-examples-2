var APP = {};
/*Initial sizes of a canvas*/
APP.w = 800;
APP.h = 800;
/*The current stage*/
APP.stage = null;

APP.cache = null;
APP.elemets = ["velocity-direction", "velocity-magnitude", "acceleration-magnitude", "reset-button"];

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

	APP.cacheDom();
	APP.addListeners();
};

APP.addStage = function(){
	if(APP.stage){
        APP.app.stage.removeChild(APP.stage);
        APP.stage = null;
	}
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

APP.addListeners = function () {
	for(var el in APP.cache){
		if(APP.cache[el].type === "button") APP.cache[el].addEventListener('click', APP.onButtonClick);
		else APP.cache[el].addEventListener('change', APP.onInputChange);
	}
};

APP.onButtonClick = function(event) {
	APP.resetInputs();
	APP.addStage();
};

APP.onInputChange = function(event) {
    var name = event.target.getAttribute("data-id");
    var val = event.target.value;
    APP.stage.addForceOnBall(name, val);
};

APP.resetInputs = function () {
    for(var el in APP.cache){
        if(APP.cache[el].type === "button") continue;
        else APP.cache[el].value = null;
    }
};

APP.cacheDom = function () {
	if(!APP.cache) APP.cache = {};

	for(var i = APP.elemets.length - 1; i >= 0; --i){
		var name = APP.getName(APP.elemets[i]);
		var el = document.getElementById(APP.elemets[i]);
		APP.cache[name] = el;
	}
};

APP.getName = function(string){
	var res = string.match(/\-\w/)[0];
	res = res.substr(-1,1).toUpperCase();
	return string.replace(/\-\w/, res);
};

window.addEventListener("load", APP.run);
