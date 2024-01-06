// p5.drawCharacterOnGraphics.js - A basic p5.js function using createGraphics and returning canvas and pixel array

// 给ChineseCharacter类添加drawCharacterOnGraphics方法
ChineseCharacter.prototype.drawCharacterOnGraphics = function () {
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

  this.characterArray = pixelsArray;
  this.characterCanvas = characterCanvas;
};

// ChineseCharacter.prototype.invertCharacterCanvasColors = function() {
//   // 确保characterGraphics和characterArray已经定义并且包含数据
//   if (!this.characterCanvas || !this.characterArray) {
//       console.error("Please draw the character first using drawCharacterOnGraphics method.");
//       return;
//   }

//   // 加载graphics对象上的像素数据到 graphicsPixels 数组
//   let characterGraphics = this.characterCanvas;
//   characterGraphics.loadPixels();
//   let graphicsPixels = characterGraphics.pixels;

//   // 遍历像素并取反颜色
//   for (let i = 0; i < graphicsPixels.length; i += 4) {
//       graphicsPixels[i] = 255 - graphicsPixels[i];     // 取反红色分量
//       graphicsPixels[i + 1] = 255 - graphicsPixels[i + 1]; // 取反绿色分量
//       graphicsPixels[i + 2] = 255 - graphicsPixels[i + 2]; // 取反蓝色分量
//       // Alpha通道不变（如果需要，也可以取反）
//   }

//   // 将修改后的像素数据反映到graphics对象上
//   characterGraphics.updatePixels();

//   // 更新 characterArray 成员变量
//   this.characterArray = graphicsPixels;

//   // 更新 characterCanvas 成员变量，虽然在实际上已经被直接修改了
//   this.characterCanvas = characterGraphics;
// };

// 定义一个辅助函数来反转颜色
// function invertColors(graphicsObject, pixelsArray) {
  function invertColors(graphicsObject) {
  graphicsObject.loadPixels();  // 确保最新的像素数据被加载
  pixelsArray = graphicsObject.pixels;
  for (let i = 0; i < pixelsArray.length; i += 4) {
      pixelsArray[i] = 255 - pixelsArray[i]; // 取反红色分量
      pixelsArray[i + 1] = 255 - pixelsArray[i + 1]; // 取反绿色分量
      pixelsArray[i + 2] = 255 - pixelsArray[i + 2]; // 取反蓝色分量
      // Alpha通道不变（如果需要，也可以取反）
  }
  graphicsObject.updatePixels(); // 将修改后的像素数据反映到graphics对象上
}

// 修改ChineseCharacter类的方法来使用新的invertColors函数
ChineseCharacter.prototype.invertCharacterCanvasColors = function() {
  if (!this.characterCanvas || !this.characterArray) {
      console.error("Please draw the character first using drawCharacterOnGraphics method.");
      return;
  }

  // 调用invertColors函数来反转颜色
  invertColors(this.characterCanvas);

  // 更新 characterArray 成员变量
  this.characterArray = this.characterCanvas.pixels;

  // 这里不需要再次更新 characterCanvas 成员变量，
  // 因为它在实际上已经被invertColors函数直接修改了
};

ChineseCharacter.prototype.drawCharacterCanvas = function () {
  image(this.characterCanvas, 0, 0);
}

ChineseCharacter.prototype.drawConcentricCircles = function () {

  // 创建ConcentricCircles的实例，你可以设置参数来匹配你的需求
  this.backgroundCircles = new ConcentricCircles(10, 20, 100, 100, this.canvasSize / 2, this.canvasSize / 2);
  // this.backgroundCircles = new ConcentricCircles(); // Use default values or specify your own
  let { circlesCanvas, circlesArray } = this.backgroundCircles.draw();
  this.circlesArray = circlesArray;
  this.circlesCanvas = circlesCanvas;
}

ChineseCharacter.prototype.drawCirclesCanvas = function () {
// Use the canvas or pixels as you wish
  image(this.circlesCanvas, 0, 0); // For example, draw the canvas to the main display
}
