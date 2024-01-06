// p5.drawCharacterOnGraphics.js - A basic p5.js function using createGraphics and returning canvas and pixel array

// 给ChineseCharacter类添加drawCharacterOnGraphics方法
ChineseCharacter.prototype.drawCharacterOnGraphics = function() {
  // Create a p5.Graphics object as a separate canvas
  let characterCanvas = createGraphics(this.canvasSize, this.canvasSize);

  // Set text characteristics in the graphics object
  characterCanvas.background(255); // Set background to white
  characterCanvas.fill(0); // Set fill to black for the text
  characterCanvas.textSize(this.fontSize);
  characterCanvas.textAlign(CENTER, CENTER);
  characterCanvas.textFont(this.fontName); // Use the specified font

  // Draw the text on the graphics object
  characterCanvas.text(this.character, characterCanvas.width / 2, characterCanvas.height / 2);

  // Extract pixel array from the graphics object
  characterCanvas.loadPixels();
  let pixelsArray = characterCanvas.pixels; // This is the array representation of your graphics

  // Return the graphics object and its pixel array
  return { canvas: characterCanvas, pixels: pixelsArray };
};

// 创建ConcentricCircles的实例，你可以设置参数来匹配你的需求
this.backgroundCircles = new ConcentricCircles(10, 20, 100, 100, canvasSize / 2, canvasSize / 2);
  

// 计算椭圆上均匀分布的点
function getEllipsePoints(centerX, centerY, radiusX, radiusY, numPoints) {
  let points = [];
  for (let i = 0; i < numPoints; i++) {
    let angle = TWO_PI * i / numPoints;
    let x = centerX + radiusX * cos(angle);
    let y = centerY + radiusY * sin(angle);
    // Add debug print
    if (isNaN(x) || isNaN(y)) {
      console.log("NaN detected", x, y);
    }
    points.push(createVector(x, y));
  }
  return points;
}


