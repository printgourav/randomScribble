const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

function randomVal(number) {
    return Math.floor(Math.random() * number)
}

function drawRandomCurve(){
    const width = canvas.width;
    const height = canvas.height;
    const x1 = randomVal(width);
    const y1 = randomVal(height);
    const cpX = randomVal(width);
    const cpY = randomVal(height);
    const x2 = randomVal(width);
    const y2 = randomVal(height);

    const r = randomVal(256);
    const g = randomVal(256);
    const b = randomVal(256);
    const color = `rgb(${r},${g},${b})`

    ctx.strokeStyle = color;
    ctx.lineWidth = Math.random() * 20 + 1
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cpX, cpY, x2, y2);
    ctx.stroke();
}

setInterval(drawRandomCurve,100);