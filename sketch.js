function setup() {
  createCanvas(400, 400);
  background(200);
  // background(255);

  // 创建ChineseCharacter实例
  let myCharacter = new ChineseCharacter("我", 200, "Arial", 300);
  // 接着，调用实例的drawCharacterOnGraphics方法
  myCharacter.drawCharacterOnGraphics();
  myCharacter.invertCharacterCanvasColors();
  // Now, draw the separate graphics object onto the main canvas
  // myCharacter.drawCharacterCanvas();

  myCharacter.drawConcentricCircles();
  myCharacter.invertCirclesCanvasColors();
  myCharacter.drawCirclesCanvas();

  myCharacter.findEllipseSegments();
  myCharacter.visualizeSegmentsWithColors();
  

}

function draw() {
  // draw function is left empty intentionally
  // noLoop();

}


