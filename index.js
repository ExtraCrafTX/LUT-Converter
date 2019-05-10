"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var p5 = require("p5");
var dialog = require("electron").remote.dialog;
//@ts-ignore
p5.RendererGL.prototype._initContext = function () {
    this.attributes.antialias = true;
    try {
        this.drawingContext =
            this.canvas.getContext('webgl', this.attributes) ||
                this.canvas.getContext('experimental-webgl', this.attributes);
        if (this.drawingContext === null) {
            throw new Error('Error creating webgl context');
        }
        else {
            console.log('p5.RendererGL: enabled webgl context');
            var gl = this.drawingContext;
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            this._viewport = this.drawingContext.getParameter(this.drawingContext.VIEWPORT);
        }
    }
    catch (er) {
        throw er;
    }
};
var num = 15;
var mid = num / 2;
var distance = 2.5 * num;
var colorScale = 255 / num;
var parent = document.getElementById('vis');
var sketch = function (p) {
    var yaw = 0;
    var pitch = 0;
    p.setup = function () {
        var size = getSize();
        p.createCanvas(size, size, p.WEBGL);
        p.angleMode("radians");
        p.stroke(255);
        p.noStroke();
        pitch = p.radians(-30);
        yaw = p.radians(-30);
    };
    p.draw = function () {
        p.clear();
        p.perspective(p.radians(40), 1, 0.1, 500);
        p.camera(mid, mid, mid + distance, mid, mid, mid, 0, 1, 0);
        p.translate(mid, mid, mid);
        p.rotateY(yaw);
        p.rotate(pitch, p.createVector(p.cos(yaw), 0, p.sin(yaw)));
        p.translate(-mid, -mid - distance / 16, -mid);
        p.stroke(255, 200);
        p.strokeWeight(num * 0.0075);
        p.noFill();
        p.line(0, 0, 0, num, 0, 0);
        p.line(0, 0, 0, 0, num, 0);
        p.line(0, 0, 0, 0, 0, num);
        p.line(num, 0, 0, num, num, 0);
        p.line(num, 0, 0, num, 0, num);
        p.line(0, num, 0, num, num, 0);
        p.line(0, num, 0, 0, num, num);
        p.line(0, 0, num, num, 0, num);
        p.line(0, 0, num, 0, num, num);
        p.line(0, 0, num, num, 0, num);
        p.line(num, num, num, 0, num, num);
        p.line(num, num, num, num, 0, num);
        p.line(num, num, num, num, num, 0);
        p.noStroke();
        for (var x = 0; x <= num; x++) {
            for (var y = 0; y <= num; y++) {
                for (var z = 0; z <= num; z++) {
                    p.fill(x * colorScale, y * colorScale, z * colorScale);
                    // p.point(x, y, z);
                    p.translate(x, num - y, z);
                    p.sphere(0.2, 6, 4);
                    p.translate(-x, y - num, -z);
                }
            }
        }
        p.noLoop();
    };
};
var sketchp5 = new p5(sketch, parent);
function getSize() {
    return Math.min(parent.clientWidth, parent.clientHeight);
}
var timeout;
function updateSize() {
    clearTimeout(timeout);
    var size = getSize();
    sketchp5.resizeCanvas(size, size, true);
    timeout = setTimeout(function () {
        sketchp5.redraw();
    }, 100);
}
window.onresize = updateSize;
var fileInput = document.getElementById('file');
fileInput.addEventListener("change", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
var inputType = document.getElementById('inputType');
updateFilter();
function updateFilter() {
    switch (inputType.value) {
        case "image":
            fileInput.accept = ".png";
            break;
        case "cube":
            fileInput.accept = ".cube";
            break;
    }
}
module.exports = undefined;
