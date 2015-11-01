// Setting the Global stitch variables
var stitchLength = 22;  //Actual length of the stitch
var stitchThick = 6; //Thickness of the diagnal stitch

//Length of the side of the whole square the stitch takes up
var stitchSide = stitchLength / Math.sqrt(2) + stitchThick;

//Setting up the base cloth grid
var canvasBase = document.getElementById('base');
var base = canvasBase.getContext('2d');

//Setting line width and color
//an equation to make the line width the same as cross part of the cross stitch
base.lineWidth = Math.sqrt(2) * stitchThick;
base.strokeStyle = '#BDBDBD';

//A method that draws the grid background
function drawAida() {
  var height = Math.floor(canvasBase.height/stitchSide) * stitchSide;
  var width = Math.floor(canvasBase.width/stitchSide) * stitchSide;

  //Making the background a
  base.fillStyle = '#F5F6CE';
  base.fillRect(0, 0, width, height);

    for (var i = 0; i * stitchSide <= width + stitchSide; i ++){
        base.beginPath();
        base.moveTo(stitchSide * i, 0);
        base.lineTo(stitchSide * i, 0);
        base.lineTo(stitchSide * i, height);
        base.closePath();
        base.stroke();
    }

    for (var i = 0; i * stitchSide <= height + stitchSide; i ++){
        base.beginPath();
        base.moveTo(0, stitchSide * i);
        base.lineTo(0, stitchSide * i);
        base.lineTo(width, stitchSide * i);
        base.closePath();
        base.stroke();
      }
}

drawAida();

/*********************Start of Cross Stitch Canvas*****************************/
//The canvas where the crossStitches go
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var mouseDown = false;

canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mousemove", onMouseMove, false);
canvas.addEventListener("mouseup", onMouseUp, false);

//prints an x where you clicked.
function onMouseDown(event){
      printStitch(event.pageX, event.pageY);
      mouseDown = true;
}

//makes it so that mouseDown is false
function onMouseUp(event){
  mouseDown = false;
}

//Prints an x as long as the mouse is moving and held down
function onMouseMove(event){
  if(mouseDown){
      printStitch(event.pageX, event.pageY);
  }
}
//Prints a red cross stitch to the closest overlap point on the grid
function printStitch(x, y){
  var rect = canvas.getBoundingClientRect();
  x = x - rect.left;
  y = y - rect.top;
  rightCrossStitch(Math.round(x/stitchSide) * stitchSide,
  Math.round(y/stitchSide) * stitchSide, stitchThick, stitchLength, 'red');
}

//Setting the line width for the outline of the stitches
ctx.lineWidth = 1;

//Draws one diagnal stitch
function drawDiagnalStitch(x,y,width,height,rad, color){

    ctx.save();

    //Set the origin to the center of coordinates given
    ctx.translate(x, y);

    //Rotate the canvas
    ctx.rotate(rad * Math.PI);

    //sets the color and draws and fills a rectangle
    ctx.fillStyle = color;
    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.strokeRect(-width / 2, -height / 2, width, height);

    //reset the canvas
    ctx.restore();
}

//Draws a cross stitch where the stitch going from left to right is on top
function rightCrossStitch(x, y, width, height, color){
    drawDiagnalStitch(x, y, width, height, 3/4, color);
    drawDiagnalStitch(x, y, width, height, 1/4, color);
}

//Draws a cross stitch where the stitch going from right to left is on top
function leftCrossStitch(x, y, width, height, color){
    drawDiagnalStitch(x, y, width, height, 1/4, color);
    drawDiagnalStitch(x, y, width, height, 3/4, color);
}
