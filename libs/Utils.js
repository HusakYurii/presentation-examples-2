"use strict";

var Utils = {};
Utils.drawLine = function (start, end, width, color, alpha) {
    width = width || 4;
    color = color || 0xFFFFFF;
    alpha = alpha || 1;
    return new PIXI.Graphics().lineStyle(width, color, 1).moveTo(start.x, start.y).lineTo(end.x, end.y).endFill();
};

Utils.drawTransparentRect = function (x, y, w, h, lineWidth, lineColor, alpha, alignment) {
    lineWidth = lineWidth || 2;
    lineColor = lineColor || 0xFFFFFF;
    alpha = alpha || 1;
    alignment = alignment || 0.5;
    return new PIXI.Graphics().lineStyle(lineWidth, lineColor, alpha, alignment).drawRect(x, y, w, h).endFill();
};

Utils.drawRect = function (x, y,  w, h, color, alpha) {
    color = color || 0xFFFFFF;
    alpha = alpha || 1;
    return new PIXI.Graphics().beginFill(color, alpha).drawRect(x, y, w, h).endFill();
};

Utils.drawCircle = function (x, y, r, color, alpha) {
    color = color || 0xFFFFFF;
    alpha = alpha || 1;
    return new PIXI.Graphics().beginFill(color, alpha).drawCircle(x, y, r).endFill();
};

Utils.drawRoundedRect = function (x, y,  w, h, r, color, alpha){
    color = color || 0xFFFFFF;
    alpha = alpha || 1;
    return new PIXI.Graphics().beginFill(color, alpha).drawRoundedRect (x, y, w, h, r).endFill();
};

Utils.drawText = function (txt, color, style) {
    color = color || 0xFFFFFF;
    style = style || { fill: color, fontFamily: "Arial Black", fontSize: 30};
    return new PIXI.Text(String(txt), style);
};

Utils.arc = function(cx, cy, radius, startAngle, endAngle, lineWidth, color, anticlockwise){
    lineWidth = lineWidth || 2;
    color = color || 0xFFFFFF;
    return new PIXI.Graphics().lineStyle(lineWidth, color).arc(cx, cy, radius, startAngle, endAngle, anticlockwise);
};

Utils.toRadians = function (degrees) {
    return degrees * (Math.PI/180);
};

Utils.toDegrees = function (radians) {
    return radians * (180 / Math.PI);
};

Utils.getRandomInt = function (min, max) {
    return (Math.random() * (max - min) + min) | 0;
};

Utils.getRandom = function (min, max) {
    return (Math.random() * (max - min) + min);
};