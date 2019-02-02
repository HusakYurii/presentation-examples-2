var Layout = {};
/*Global canvas sizes */
Layout.glW = 0;
Layout.glH = 0;

Layout.resizeView = function() {

    var currW = window.innerWidth;
    var currH = window.innerHeight;

    if(Layout.glW === currW && Layout.glH === currH){return;}
	
	var newW, newH;
	
	if(currH > currW){ //portrait
		newW = APP.w;
		newH = newW * (currH/currW);
	}
	else{ //landscape
		newH = APP.h;
		newW = newH * (currW/currH);
	}

    Layout.glW = newW;
    Layout.glH = newH;

    APP.app.view.style.width = currW + "px";
    APP.app.view.style.height = currH + "px";

    APP.app.renderer.resize(newW, newH);

    APP.resizeStage(newW, newH);
};

window.addEventListener("resize", Layout.resizeView);
