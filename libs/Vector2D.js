"use strict";
/**
 * Basic 2D vector class.
 * All properties are intended to be private.
 * All functions are setters/getters.
 * All inputs must be numbers.
 * */
function Vector2D(x, y) {
    this._x = x || 0;
    this._y = y || 0;
}
Vector2D.prototype = Object.create({},{
    x: {
        get: function(){
            return this._x;
        },
        set: function(val){
            if(!this._isNumber(val)) this._inputError("Number");
            else this._x = val;
        },
    },
    y: {
        get: function(){
            return this._y;
        },
        set: function(val){
            if(!this._isNumber(val)) this._inputError("Number");
            else this._y = val;
        },
    },
    angle: {
      get: function () {
          return Math.atan2(this.y, this.x);
      },
      set: function (angle) {
          if(!this._isNumber(angle)) { this._inputError("Number"); return; }
          var mag = this.magnitude;
          this.x = Math.cos(angle) * mag;
          this.y = Math.sin(angle) * mag;
      }
    },
    magnitude: {
      get: function () {
          return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      set: function (mag) {
          if(!this._isNumber(mag)) { this._inputError("Number"); return; }
          var angle = this.angle;
          this.x = Math.cos(angle) * mag;
          this.y = Math.sin(angle) * mag;
      }   
    },
    add: {
        value: function (vec2) {
            if(!this._isVector(vec2)) { this._inputError("Vector object"); return; }
            this.x += vec2.x;
            this.y += vec2.y;
            return this;
        }
    },
    subtract: {
        value: function (vec2) {
            if(!this._isVector(vec2)) { this._inputError("Vector object"); return; }
            this.x -= vec2.x;
            this.y -= vec2.y;
            return this;
        }
    },

    addTo: {
        value: function (vec2) {
            if(!this._isVector(vec2)) { this._inputError("Vector object"); return; }
            return new Vector2D(vec2.x + this.x, vec2.y + this.y);
        }
    },
    subtractFrom: {
        value: function (vec2) {
            if(!this._isVector(vec2)) { this._inputError("Vector object"); return; }
            return new Vector2D(vec2.x - this.x, vec2.y - this.y);
        }
    },
    multiply : {
        value: function (scl) {
            if(!this._isNumber(scl)) { this._inputError("Number"); return; }
            this.x *= scl;
            this.y *= scl;
            return this;
        }
    },
    divide: {
        value: function (scl) {
            if(!this._isNumber(scl)) { this._inputError("Number"); return; }
            this.x /= scl;
            this.y /= scl;
            return this;
        }
    },
    clone: {
        value: function () {
            return new Vector2D(this.x, this.y);
        }
    },
    normalize: {
        value: function () {
            var mag = this.magnitude;
            if (mag !== 0) this.multiply(1 / mag);
            return this;
        }
    },
    limit: {
        value: function (max) {
            var mag = this.magnitude;
            if( mag > max ) this.divide(mag).multiply(max);
            return this;
        }
    },
    _magSqr: {
        value: function () {
            return (this.x * this.x + this.y * this.y)
        }
    },
    _isVector: {
        value: function (vector) {
            return vector instanceof Vector2D;
        }
    },
    _isNumber : {
        value: function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    },
    _inputError : {
        value: function (type) {
            console.warn("%c input is not a "+ type, "color: #ff0000; ");
        }
    }
});

Vector2D.create = function (x, y) {
    return new Vector2D(x, y);
};

