/*  canvas : html element로 context를 갖는다
    context : 요소 안에서 우리가 픽셀에 접근할 수 있는 방법 */
const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const clear = document.getElementById("jsClear");

const INITIAL_COLOR ="#2C2C2C";
const CANVAS_SIZE = 500;

let painting = false;
let filling = false;

/*  pixel modifier --> offsetX, offsetY 사용을 위해 canvas 크기 지정
    css 에서 지정한 canvas 크기와는 다름    */
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.strokeStyle = INITIAL_COLOR;
context.fillStyle =INITIAL_COLOR;
context.lineWidth = 10;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

/*  offsetX, offsetY : canvas 범위
    clientX, clientY : 전체 screen 범위 */
function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting) { // 마우스 클릭 안한 경우
        context.beginPath(); 
        context.moveTo(x,y);
    }
    /*  마우스가 canvas위에서 클릭 되어있는 경우
        lineTo : path의 이전 위치부터 현 위치까지 line을 만든다.
        stroke : 현재의 sub-path를 현재의 stroke style로 line을 긋는다. */
    else{ 
        context.lineTo(x,y); 
        context.stroke();
    }
}

/*배열에 저장된 element들을 클릭할 때 마다 
현재 함수 내 color 변수에 해당 element의 backgroundColor가 저장된다.*/
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    context.fillStyle = color;
}
/* input range를 변경할 때마다  
현재 함수 내 lineSize 변수에 해당 element의 value 저장된다.*/
function handleRangeChange(event){
    const lineSize = event.target.value;
    context.lineWidth = lineSize;
}

function handleModeClick(){
    if(filling===true) {
        filling=false; 
        mode.innerText = "FILL";
    }
    else{
        filling=true; 
        mode.innerText = "PAINT";
    }
}

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
}

function handleCanvasClick(){
    if(filling)
        context.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

//classname으로 'jsColor'를 가진 element들을 array로 묶고 이벤트를 추가한다.
Array.from(colors).forEach(colorItem => 
    colorItem.addEventListener("click", handleColorClick)
);

if(range) range.addEventListener("input", handleRangeChange);

if(mode) mode.addEventListener("click", handleModeClick);

if(clear) clear.addEventListener("click", clearCanvas);

