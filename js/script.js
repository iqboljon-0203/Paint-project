const canvas=document.querySelector('canvas'),
    toolBtns=document.querySelectorAll('.tool'),
    fillColor=document.querySelector('#fill-color'),
    sizeSlider=document.querySelector('#size-slider'),
    colorBtns=document.querySelectorAll('.colors .option'),
    colorPicker=document.querySelector('#color-picker'),
    clearCanvasBtn=document.querySelector('.clear-canvas'),
    saveImgBtn=document.querySelector('.save-img');
let context=canvas.getContext('2d'),
    isDrawing=false,
    brushWidth=10,
    selectedTool="brush",
    selectedColor='#000',
    prevMouseX,
    prevMouseY,
    snapShot;
////set canvas backgorund
const setCanvasBackground =()=>{
    context.fillStyle="#fff";
    context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle=selectedColor;
};
window.addEventListener('load',()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
    setCanvasBackground();

});
const startDraw=(e)=>{
    isDrawing=true;
    prevMouseX=e.offsetX;
    prevMouseY=e.offsetY;
    context.beginPath();
    context.lineWidth=brushWidth;
    context.strokeStyle=selectedColor;
    context.fillStyle=selectedColor;
    snapShot=context.getImageData(0,0,canvas.width,canvas.height);
};
let drawRectangle = (e)=>{
    if(!fillColor.checked){
        context.strokeRect(e.offsetX,e.offsetY, prevMouseX-e.offsetX, prevMouseY-e.offsetY);
    }else{
        context.fillRect(e.offsetX,e.offsetY, prevMouseX-e.offsetX, prevMouseY-e.offsetY);
    }
};
////DRAW CIRCLE
let drawCircle=(e)=>{
    context.beginPath()
    const radius=Math.sqrt(Math.pow(prevMouseX-e.offsetX,2))+Math.pow(prevMouseY-e.offsetY,2);
    context.arc(prevMouseX,prevMouseY,radius,0,2*Math.PI);
    context.stroke();
    fillColor.checked?context.fill():context.stroke();
};
let drawRTriangle =(e)=>{
    context.beginPath();
    context.moveTo(prevMouseX,prevMouseY);
    context.lineTo(e.offsetX,e.offsetY);
    context.lineTo(prevMouseX*2-e.offsetX,e.offsetY);
    context.closePath();
    fillColor.checked?context.fill():context.stroke();
};
const drawing = (e)=>{
    if(!isDrawing) return;
    context.putImageData(snapShot,0,0);
    switch(selectedTool){
        case 'brush':
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
            break;
        case 'rectangle':
            drawRectangle(e);
            break;
        case 'circle':
            drawCircle(e);
            break;
        case 'triangle':
            drawRTriangle(e);
            break;
        case 'eraser':
            context.strokeStyle='#fff';
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
            break;
        default:
            break;
    }
    
};
toolBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelector('.options .active').classList.remove('active');
        btn.classList.add('active');
        selectedTool=btn.id;
        console.log(selectedTool);
    });
});
////
////change brush width
sizeSlider.addEventListener('change',()=>{
    brushWidth=sizeSlider.value;
});
////cset color to shape
colorBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelector('.options .selected').classList.remove('selected');
        btn.classList.add('selected');
        const bgColor=window.getComputedStyle(btn).getPropertyValue('background-color');
        selectedColor=bgColor;
        console.log(selectedColor);
    });
});
/////
colorPicker.addEventListener('change',()=>{
    colorPicker.parentElement.style.background=colorPicker.value;
    colorPicker.parentElement.click();
});
/////
clearCanvasBtn.addEventListener('click',()=>{
    context.clearRect(0,0,canvas.width,canvas.height);
    setCanvasBackground();
});
saveImgBtn.addEventListener('click',()=>{
    const link=document.createElement('a');
    link.download=`Iqboljon-paint${Date.now()}.jpg`;
    link.href=canvas.toDataURL();
    link.click();
});
const stopDrawing=()=>{
    isDrawing=false;
};

canvas.addEventListener('mousedown',startDraw);
canvas.addEventListener('mousemove',drawing);
canvas.addEventListener('mouseup',stopDrawing);

