let canvas = document.getElementById('draw');
context = canvas.getContext("2d");
let penColor = document.getElementById("color");
let penWidth = document.getElementById("thick");

let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paint;
let mouseX;
let mouseY;
let colors = new Array();
let thickness = new Array();

let offsetLeft = canvas.parentElement.parentElement.offsetLeft;
let offsetTop = canvas.parentElement.parentElement.offsetTop;


canvas.addEventListener('mousedown', function (e) {
    mouseX = e.pageX - this.offsetLeft - offsetLeft;
    mouseY = e.pageY - this.offsetTop - offsetTop;
    paint = true;
    addClick(mouseX, mouseY);
    redraw();
});
canvas.addEventListener('mousemove', function (e) {
    if (paint) {
        addClick(e.pageX - this.offsetLeft - offsetLeft, e.pageY - this.offsetTop - offsetTop, penColor.value,penWidth.value,true);
        redraw();
    }
});
canvas.addEventListener('mouseup', function (e) {
    paint = false;
});
canvas.addEventListener('mouseleave', function (e) {
    paint = false;
});

function addClick(x, y, color, thick, dragging) {
    clickX.push(x);
    clickY.push(y);
    colors.push(color);
    thickness.push(thick);
    clickDrag.push(dragging);
}

function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.lineJoin = "round";
    for (let i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.strokeStyle = colors[i];
            context.lineWidth = thickness[i];
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.strokeStyle = colors[i+1];
            context.lineWidth = thickness[i+1];
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.stroke();
        context.closePath();
    }
}

function clearCanvas() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    clickY.splice(0,clickY.length);
    clickDrag.splice(0,clickDrag.length);
    clickX.splice(0,clickX.length);
    colors.splice(0,colors.length);
    thickness.splice(0,thickness.length);
}

