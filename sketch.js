function setup() {
  createCanvas(400, 400);
  background(200)

  // 创建ChineseCharacter实例
  let myCharacter = new ChineseCharacter("你", 200, "Arial", 300);
  // 接着，调用实例的drawCharacterOnGraphics方法
  let result = myCharacter.drawCharacterOnGraphics();
  characterCanvas = result['canvas']
  // Now, draw the separate graphics object onto the main canvas
  // image(characterCanvas, 0, 0);
  characterArray = result['pixels']

  // 同心圆数量
  let numCircles = 10;
  // 最小半径
  let minRadius = 20;
  // 最大半径
  let maxRadius = 100;
  // 每个椭圆上的点数
  let numPoints = 100;

  let ellipsePoints = {}; // 存储椭圆点
  let centerX = width / 2;
  let centerY = height / 2;
  for (let i = 0; i < numCircles; i++) {
    let radius = minRadius + i * (maxRadius - minRadius) / numCircles;
    ellipsePoints[i] = getEllipsePoints(centerX, centerY, radius, radius, numPoints);
    radiusX = radius
    radiusY = radius
    noFill();
    stroke(0);
    ellipse(centerX, centerY, radiusX * 2, radiusY * 2);
  }

  // 处理像素数据
  loadPixels();

  // 创建一个二维数组来存储灰度值
  let grayScaleArray = new Array(width);
  for (let i = 0; i < width; i++) {
    grayScaleArray[i] = new Array(height);
  }

  // 遍历像素，计算灰度值，并存储在二维数组中
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];

      // 计算灰度值
      let gray = (r + g + b) / 3;
      grayScaleArray[x][y] = gray;
    }
  }

  circles_array = grayScaleArray;

  // 将画布转换成灰度模式
  loadPixels(); // 加载画布上的像素数据到 pixels 数组
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // 获取当前像素的索引
      let index = (x + y * width) * 4;
      // 计算RGB的平均值来获得灰度值
      // let gray = (pixels[index] + pixels[index+1] + pixels[index+2]) / 3;
      // 设置像素为灰度值
      pixels[index] = 255 - pixels[index];
      pixels[index + 1] = 255 - pixels[index + 1];
      pixels[index + 2] = 255 - pixels[index + 2];
    }
  }
  updatePixels(); // 将修改后的像素数据反映到画布上

  invertCanvasColors();
  updatePixels(); // 将修改后的像素数据反映到画布上

}

function draw() {
  // draw function is left empty intentionally
  // noLoop();

}


// 将画布上的所有像素取反
function invertCanvasColors() {
  loadPixels(); // 加载画布上的像素数据到 pixels 数组
  for (let i = 0; i < pixels.length; i += 4) {
    // 取反每个颜色分量
    pixels[i] = 255 - pixels[i]; // 取反红色分量
    pixels[i + 1] = 255 - pixels[i + 1]; // 取反绿色分量
    pixels[i + 2] = 255 - pixels[i + 2]; // 取反蓝色分量
    // Alpha通道不变（如果需要，也可以取反）
    // pixels[i + 3] = 255 - pixels[i + 3];
  }
  updatePixels(); // 将修改后的像素数据反映到画布上
}