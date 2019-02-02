var Preloader = {};
/*Assets will be passed later*/
Preloader.assets = null;
/*The call back function which will fire as
 the loader completes loading of all assets*/
Preloader.onComplete = null;

Preloader.isLoaded = false;

Object.defineProperties(Preloader, {
    addAssets:{
        set: function (assets) {
            this.assets = assets;
        }
    },
    getAssets: {
        get: function () {
            return this.assets;
        }
    },
    isAssets: {
        get: function () {
            return !!this.assets;
        }
    },
    load: {
        value: function (callback) {
            if(this.isLoaded){ console.warn("Assets are already loaded"); return;}

            this.isLoaded = true;
            this.onComplete = callback;

            if(this.assets && this.assets.length){
                for (var i = 0; i < this.assets.length; i++) {
                    PIXI.loader.add(this.assets[i].name, this.assets[i].url);
                }
            }

            if(this.isLoaded){
                PIXI.loader.load(callback);
            }
        }
    }
});