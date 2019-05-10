import p5 = require("p5");
const {dialog} = require("electron").remote;

//@ts-ignore
p5.RendererGL.prototype._initContext = function() {
    this.attributes.antialias = true;
    try {
        this.drawingContext =
            this.canvas.getContext('webgl', this.attributes) ||
            this.canvas.getContext('experimental-webgl', this.attributes);
        if (this.drawingContext === null) {
            throw new Error('Error creating webgl context');
        } else {
            console.log('p5.RendererGL: enabled webgl context');
            var gl = this.drawingContext;
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            this._viewport = this.drawingContext.getParameter(
                this.drawingContext.VIEWPORT
            );
        }
    } catch (er) {
        throw er;
    }
};

var num = 15;
var mid = num/2;
var distance = 2.5*num;
var colorScale = 255/num;

var parent = document.getElementById('vis')!;

var sketch = (p: p5) => {
    let yaw = 0;
    let pitch = 0;
    p.setup = ()=>{
        let size = getSize();
        p.createCanvas(size,size,p.WEBGL);
        p.angleMode("radians");
        p.stroke(255);
        p.noStroke();
        pitch = p.radians(-30);
        yaw = p.radians(-30);
    }

    p.draw = ()=>{
        p.clear();

        p.perspective(p.radians(40),1,0.1,500);
        p.camera(mid, mid, mid+distance, mid, mid, mid, 0, 1, 0);

        p.translate(mid, mid, mid);
        p.rotateY(yaw);
        p.rotate(pitch, p.createVector(p.cos(yaw),0,p.sin(yaw)));
        p.translate(-mid, -mid-distance/16, -mid);

        p.stroke(255,200);
        p.strokeWeight(num*0.0075);
        p.noFill();
        p.line(0,0,0,num,0,0);
        p.line(0,0,0,0,num,0);
        p.line(0,0,0,0,0,num);
        p.line(num,0,0,num,num,0);
        p.line(num,0,0,num,0,num);
        p.line(0,num,0,num,num,0);
        p.line(0,num,0,0,num,num);
        p.line(0,0,num,num,0,num);
        p.line(0,0,num,0,num,num);
        p.line(0,0,num,num,0,num);
        p.line(num,num,num,0,num,num);
        p.line(num,num,num,num,0,num);
        p.line(num,num,num,num,num,0);
        p.noStroke();

        for(let x = 0; x <= num; x++) {
            for(let y = 0; y <= num; y++){
                for(let z = 0; z <= num; z++){
                    p.fill(x*colorScale, y*colorScale, z*colorScale);
                    // p.point(x, y, z);
                    p.translate(x,num-y,z);
                    p.sphere(0.2, 6, 4);
                    p.translate(-x,y-num,-z);
                }
            }
        }

        p.noLoop();
    }
}

var sketchp5 = new p5(sketch, parent);

function getSize(){
    return Math.min(parent.clientWidth, parent.clientHeight);
}

var timeout: NodeJS.Timeout;

function updateSize(){
    clearTimeout(timeout);
    let size = getSize();
    sketchp5.resizeCanvas(size, size, true);
    timeout = setTimeout(()=>{
        sketchp5.redraw();
    }, 100);
}

window.onresize = updateSize;

var fileInput = <HTMLInputElement> document.getElementById('file')!;
fileInput.addEventListener("change", async ()=>{

});

var inputType = <HTMLSelectElement> document.getElementById('inputType')!;
updateFilter();

function updateFilter(){
    switch(inputType.value){
        case "image":
            fileInput.accept = ".png";
            break;
        case "cube":
            fileInput.accept = ".cube";
            break;
    }
}

export = undefined;