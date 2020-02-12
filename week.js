let canvasStart;
let canvasEnd;

let drag = false;
let choosedEvent = false;
let color = "rgb(150,150,150)";

let startX;
let startY;
let endX;
let endY;

let mon,tue,wen,thu,fri,sat,sun = [];

function setCanvasY(){
    canvasStart = document.getElementById("mon").getBoundingClientRect().top;
    canvasEnd = document.getElementById("mon").getBoundingClientRect().bottom;
}

function click(event){
}

function mouseDown(event){
    drag = true;
    startY = (event.pageY-canvasStart)/3.14;
}

function mouseMove(event){
    if(drag){
        var ctx = event.currentTarget.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, startY, event.currentTarget.width, (event.pageY-canvasStart)/3.14 - startY);
    }
}

function mouseUp(event){
    drag = false;
    
    if(event.currentTarget.id=="mon"){
        mon.pus({begining:0, end: 1});
        alert(mon[0]);
    }
}

function mouseOut(event){
    drag = false;
}


function startEdit() {
    setCanvasY();

    var days = document.getElementsByClassName("day");
    for(i=0;i<days.length;i++){

        days[i].addEventListener("click", click, false);
        days[i].addEventListener("mousedown", mouseDown, false);
        days[i].addEventListener("mousemove", mouseMove, false);
        days[i].addEventListener("mouseup", mouseUp, false);
        days[i].addEventListener("mouseout", mouseOut, false);
        //days[i].addEventListener("mouseover", mouseOver, false); //показывает время
        //days[i].addEventListener("contextmenu", mouseOver, false);
    }
}

