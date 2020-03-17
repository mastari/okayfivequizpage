document.addEventListener("DOMContentLoaded", easelSetup, false);
var canvas, c;
var currentEaselActive = true;
var animationInterval;
var isStroke = false,
  isFill = false,
  isBackground = ["white", false];
var dfltMode = {
  stroke: ["black", 1.7, true],
  fill: ["white", true]
};
var frameTime = {};
function easelSetup() {
  // if(setup) setup();
  if (isStroke) dfltMode.stroke = [c.strokeStyle, c.lineWidth, true];
  if (isFill) dfltMode.fill = [c.fillStyle, true];
  frameTime.fps = 60;
  frameTime.then = Date.now();
  frameTime.interval = 1000 / frameTime.fps;
}
var degreeMode = "radian";
function angleMode(mode) {
  if (mode == DEGREES || mode == RADIANS) degreeMode = mode();
  else console.log("Easel: Invalid angle mode");
}
function returnAngle(turn) {
  if (degreeMode == "radian") return turn;
  else return turn * (Math.PI / 180);
}
function DEGREES() {
  return "degree";
}
function RADIANS() {
  return "radian";
}

function createEasel(id, width, height, drawFunc) {
  canvas = document.getElementById(id);
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
  }
  c = canvas.getContext("2d");
  coldReset();
  // c.imageSmoothingEnabled = true;
  animation(drawFunc);
}

function getEaselWidth() {
  let cW = parseInt($(canvas).css("width"));
  return (canvas.width / cW) * cW;
}

function getEaselHeight() {
  let cH = parseInt($(canvas).css("height"));
  return (canvas.height / cH) * cH;
}

function noStroke() {
  isStroke = false;
}
function noFill() {
  isFill = false;
}

function fill(color) {
  isFill = true;
  c.fillStyle = color;
}

function stroke(color, width) {
  isStroke = true;
  c.strokeStyle = color || c.strokeStyle;
  c.lineWidth = width || c.lineWidth;
}

function strokeWeight(width) {
  if (width) {
    isStroke = true;
    c.lineWidth = width || c.lineWidth;
  }
}

function line(x1, y1, x2, y2) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.closePath();
  if (isStroke) c.stroke();
}

function rect(x, y, w, h) {
  if (isFill) c.fillRect(x, y, w, h);
  if (isStroke) c.strokeRect(x, y, w, h);
}
function ellipse(x, y, rx, ry) {
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  beginShape();
  if (ry) c.ellipse(x, y, rx, ry, 0, Math.PI * 2, false);
  else c.ellipse(x, y, rx, rx, 0, Math.PI * 2, false);
  endShape();
}
function push() {
  let strokeStyle = c.strokeStyle,
    fillStyle = c.fillStyle,
    globalAlpha = c.globalAlpha,
    lineWidth = c.lineWidth,
    lineCap = c.lineCap,
    lineJoin = c.lineJoin,
    miterLimit = c.miterLimit,
    shadowOffsetX = c.shadowOffsetX,
    shadowOffsetY = c.shadowOffsetY,
    shadowBlur = c.shadowBlur,
    shadowColor = c.shadowColor,
    globalCompositeOperation = c.globalCompositeOperation,
    font = c.font,
    textAlign = c.textAlign,
    textBaseline = c.textBaseline;
  c.save();
  (c.fillStyle = fillStyle),
    (c.globalAlpha = globalAlpha),
    (c.lineWidth = lineWidth),
    (c.lineCap = lineCap),
    (c.lineJoin = lineJoin),
    (c.miterLimit = miterLimit),
    (c.shadowOffsetX = shadowOffsetX),
    (c.shadowOffsetY = shadowOffsetY),
    (c.shadowBlur = shadowBlur),
    (c.shadowColor = shadowColor),
    (c.globalCompositeOperation = globalCompositeOperation),
    (c.font = font),
    (c.textAlign = textAlign),
    (c.textBaseline = textBaseline);
}
function pop() {
  let strokeStyle = c.strokeStyle,
    fillStyle = c.fillStyle,
    globalAlpha = c.globalAlpha,
    lineWidth = c.lineWidth,
    lineCap = c.lineCap,
    lineJoin = c.lineJoin,
    miterLimit = c.miterLimit,
    shadowOffsetX = c.shadowOffsetX,
    shadowOffsetY = c.shadowOffsetY,
    shadowBlur = c.shadowBlur,
    shadowColor = c.shadowColor,
    globalCompositeOperation = c.globalCompositeOperation,
    font = c.font,
    textAlign = c.textAlign,
    textBaseline = c.textBaseline;
  c.restore();
  (c.fillStyle = fillStyle),
    (c.globalAlpha = globalAlpha),
    (c.lineWidth = lineWidth),
    (c.lineCap = lineCap),
    (c.lineJoin = lineJoin),
    (c.miterLimit = miterLimit),
    (c.shadowOffsetX = shadowOffsetX),
    (c.shadowOffsetY = shadowOffsetY),
    (c.shadowBlur = shadowBlur),
    (c.shadowColor = shadowColor),
    (c.globalCompositeOperation = globalCompositeOperation),
    (c.font = font),
    (c.textAlign = textAlign),
    (c.textBaseline = textBaseline);
}

function translate(mx, my) {
  c.translate(mx, my);
}
function rotate(turn) {
  c.rotate(returnAngle(turn));
}
function scale(sx, sy) {
  c.scale(sx, sy || sx);
}
function beginShape(x, y) {
  c.beginPath();
  if (x && y) vertex(x, y);
}
function vertex(x, y) {
  c.lineTo(x, y);
}
function closeShape() {
  c.closePath();
  if (isStroke) {
    c.stroke();
  }
  if (isFill) {
    c.fill();
  }
}
function endShape() {
  if (isStroke) {
    c.stroke();
  }
  if (isFill) {
    c.closePath();
    c.fill();
  }
}

function fillShape() {
  c.closePath();
  c.fill();
}

function strokeShape() {
  c.closePath();
  c.stroke();
}

function background(color) {
  isBackground = [color, true];
}

function detachEasel() {
  currentEaselActive = false;
}

function coldReset() {
  currentEaselActive = true;
  isStroke = false;
  isFill = false;
  isBackground = ["white", false];
  dfltMode = {
    stroke: ["black", 1.7, true],
    fill: ["white", true]
  };
}

function clear() {
  let oldf = isFill;
  let olds = isStroke;
  let oldc = c.fillStyle;
  noStroke();
  fill(isBackground[0]);
  rect(0, 0, canvas.width, canvas.height);
  fill(oldc);
  isStroke = olds;
  isFill = oldf;
}
var count = 0;
function frameRegulate(func) {
  frameTime.now = Date.now();
  frameTime.delta = frameTime.now - frameTime.then;
  if (frameTime.delta > frameTime.interval) {
    frameTime.then = frameTime.now - (frameTime.delta % frameTime.interval);
    func();
  }
}
function animation(drawFunc) {
  if (currentEaselActive) {
    requestAnimationFrame(() => animation(drawFunc));
    if (dfltMode.stroke[2]) {
      stroke(dfltMode.stroke[0], parseFloat(dfltMode.stroke[1]));
    }
    if (dfltMode.fill[1]) {
      fill(dfltMode.fill[0]);
    }
    frameRegulate(() => {
      if (drawFunc) {
        push();
        if (isBackground[1]) clear();
        drawFunc();
        pop();
      }
    });
  }
}

if (isStroke) dfltMode.stroke = [c.strokeStyle, c.lineWidth, true];
if (isFill) dfltMode.fill = [c.fillStyle, true];

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
class Template {
  constructor(drawing) {
    this.drawing = drawing;
  }
  print(tx, ty) {
    if (
      this.drawing &&
      {}.toString.call(this.drawing) === "[object Function]"
    ) {
      c.save();
      if (tx || ty) translate(tx || 0, ty || 0);
      this.drawing();
      c.restore();
    } else console.log("The defined stamp is not a function!");
  }
}
