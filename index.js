const colour = "#3d34a5";
const strokeWidth = 30;

let latestPoint;
let drawing = false;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const continueStroke = newPoint => {

    context.beginPath();
    context.moveTo(latestPoint[0], latestPoint[1]);
    context.strokeStyle = colour;
    context.lineWidth = strokeWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(newPoint[0], newPoint[1]);
    context.stroke();
    latestPoint = newPoint;


};

const startStroke = point => {

    drawing = true;
    latestPoint = point;

};

const getTouchPoint = evt => {

    if(!evt.currentTarget) {
        return [0, 0];
    }

    const rect = evt.currentTarget.getBoundingClientRect();
    const touch = evt.targetTouches[0];
    return [touch.clientX - rect.left, touch.clientY-rect.top];

};


const BUTTON = 0b01; // LeftClick Event.
const mouseButtonIsDown = buttons => (BUTTON & buttons) === BUTTON;

const mouseMove = evt => {
    if(!drawing){
        return;
    }
    continueStroke([evt.offsetX, evt.offsetY]);
};

const mouseDown = evt =>  {
    if(drawing){
        return;
    }
    evt.preventDefault();
    canvas.addEventListener("mousemove", mouseMove ,false);
    startStroke([evt.offsetX, evt.offsetY]);

};

const mouseEnter = evt => {
    if (!mouseButtonIsDown(evt.button) || drawing){
        return;
    }
    mouseDown(evt);
};

const endStroke = evt =>  {
    if (!drawing){
        return;
    }
    drawing = false;
    evt.currentTarget.removeEventListener("mousemove", mouseMove, false);
};

const touchStart = evt => {
    if(drawing){
        return ;
    }
    evt.preventDefault();
    startStroke(getTouchPoint(evt));
}

const touchMove = evt =>{
    if(!drawing){
        return;
    }
    continueStroke(getTouchPoint(evt));
};

const touchEnd = evt => {
    drawing = false;
};

canvas.addEventListener("touchstart", touchStart,false);
canvas.addEventListener("touchmove",touchMove, false);
canvas.addEventListener("touchcancel",touchEnd,false);
canvas.addEventListener("touchend", touchEnd, false);
canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mouseup", endStroke, false);
canvas.addEventListener("mouseout",endStroke,false);
canvas.addEventListener("mouseenter", mouseEnter, false);

