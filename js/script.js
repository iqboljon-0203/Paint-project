const canvas=document.querySelector('canvas');
let context=canvas.getContext('2d'),
    isDrawing=false,
    brushWidth=10;
window.addEventListener('load',()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;

});
const startDraw=()=>{
    isDrawing=true;
    context.beginPath();
    context.lineWidth=brushWidth;
};
const drawing = (evt)=>{
    if(!isDrawing) return;
    context.lineTo(evt.offsetX, evt.offsetY);
    context.stroke();
};
const stopDrawing=()=>{
    isDrawing=false;
};

canvas.addEventListener('mousedown',startDraw);
canvas.addEventListener('mousemove',drawing);
canvas.addEventListener('mouseup',stopDrawing);
