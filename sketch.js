function setup() {
  createCanvas(400, 400);
  // background(200);
  // background(255);
  background(0);

  // 创建ChineseCharacter实例
  let myCharacter = new ChineseCharacter("我", 200, "Arial", 400);
  // 接着，调用实例的drawCharacterOnGraphics方法
  myCharacter.drawCharacterOnGraphics();
  myCharacter.invertCharacterCanvasColors();
  // Now, draw the separate graphics object onto the main canvas
  // myCharacter.drawCharacterCanvas();

  myCharacter.drawConcentricCircles();
  myCharacter.invertCirclesCanvasColors();
  // myCharacter.drawCirclesCanvas();

  myCharacter.findEllipseSegments();

  // 输出结果，检查segments是否符合预期
  console.log(myCharacter.ellipseSegments);
  // myCharacter.visualizeSegmentsWithColors();
  

}

function draw() {
  // draw function is left empty intentionally
  // noLoop();

}


