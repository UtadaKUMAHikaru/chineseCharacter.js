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

  this.characterGrayScaleMatrix = convertArrayToGrayScaleMatrix(this.characterCanvas, this.characterArray);
};


// helper function creating 2-dimentional arrays
createArray2d = function(_w, _h) {
  var temp_arr = [];
  for(var temp_x = 0; temp_x < _w; temp_x++) {
    var temp_column = [];
    for(var temp_y = 0; temp_y < _h; temp_y++) temp_column[temp_y] = 0;
    temp_arr[temp_x] = temp_column;
  }
  return temp_arr;
}

// 假设 p5.prototype.AsciiArt 已经包含 createArray2d 方法
function convertArrayToGrayScaleMatrix(characterCanvas, characterArray) {
  if (!characterCanvas || !characterArray) {
    console.error("Invalid inputs: characterCanvas and characterArray are required.");
    return;
  }

  // 创建灰度矩阵
  // let grayScaleMatrix = p5.prototype.AsciiArt.prototype.createArray2d(characterCanvas.width, characterCanvas.height);
  let grayScaleMatrix = createArray2d(characterCanvas.width, characterCanvas.height);
  
  let temp_maxWeight = 3 * 255; // max r + max g + max b (ignore alpha)

  // 遍历每个像素，计算灰度值并填充到灰度矩阵中
  for (var temp_y = 0; temp_y < characterCanvas.height; temp_y++) {
    for (var temp_x = 0; temp_x < characterCanvas.width; temp_x++) {
      let temp_anchor = (temp_y * characterCanvas.width + temp_x) * 4;
      let temp_weight =
        (
          characterArray[temp_anchor    ] +
          characterArray[temp_anchor + 1] +
          characterArray[temp_anchor + 2]
        ) / temp_maxWeight;
      // 根据AsciiArt中的方法进行灰度转换，这里直接转换成0-255范围的灰度值
      let gray = Math.floor(temp_weight * 255);
      grayScaleMatrix[temp_x][temp_y] = gray;
    }
  }

  return grayScaleMatrix;
}

// // 新的 convertArrayToGrayScaleMatrix 函数
// function convertArrayToGrayScaleMatrix(characterCanvas, characterArray) {
//   if (!characterCanvas || !characterArray) {
//       console.error("Invalid inputs: characterCanvas and characterArray are required.");
//       return;
//   }

//   // 使用AsciiArt的createArray2d方法创建一个二维数组来存储灰度值
//   let w = characterCanvas.width; // 图像的宽度
//   let h = characterCanvas.height; // 图像的高度
//   // let grayScaleMatrix = p5.prototype.AsciiArt.prototype.createArray2d(w, h);
//   let grayScaleMatrix = createArray2d(w, h);

//   // 遍历像素数组，计算灰度值，并填充到二维数组中
//   for (let i = 0; i < characterArray.length; i += 4) {
//       let x = (i / 4) % w;
//       let y = Math.floor((i / 4) / w);
//       let r = characterArray[i];
//       let g = characterArray[i + 1];
//       let b = characterArray[i + 2];
//       // 计算灰度值，忽略alpha通道
//       let gray = Math.floor((r + g + b) / 3);
//       grayScaleMatrix[x][y] = gray;
//   }

//   // 返回计算出的灰度矩阵
//   return grayScaleMatrix;
// }

// function convertArrayToGrayScaleMatrix(characterCanvas, characterArray) {
//   if (!characterCanvas || !characterArray) {
//     console.error("Invalid inputs: characterCanvas and characterArray are required.");
//     return;
//   }

//   let w = characterCanvas.width; // 图像的宽度
//   let h = characterCanvas.height; // 图像的高度
//   console.log("characterCanvas.width: ", characterCanvas.width);
//   console.log("characterCanvas.height: ", characterCanvas.height);
//   let pixels = characterArray; // 图像的像素数组

//   // 创建一个二维数组来存储灰度值
//   let grayScaleMatrix = new Array(w);
//   for (let i = 0; i < w; i++) {
//     grayScaleMatrix[i] = new Array(h);
//   }

//   // 打印二维矩阵的行数和列数
//   console.log("Before: "); // 打印行数
//   let rows = grayScaleMatrix.length; // 行数, 即灰度矩阵的外层数组长度
//   let cols = rows > 0 ? grayScaleMatrix[0].length : 0; // 列数, 即第一个内层数组的长度
//   console.log("GrayScale Matrix Rows: ", rows); // 打印行数
//   console.log("GrayScale Matrix Columns: ", cols); // 打印列数

//   // 遍历像素数组，计算灰度值，并填充到二维数组中
//   for (let i = 0; i < pixels.length; i += 4) {
//     let x = (i / 4) % w;
//     let y = Math.floor((i / 4) / w);
//     if (x % 100 == 0)
//       console.log("x, y: ", x, y); // 打印行数
//     let r = pixels[i];
//     let g = pixels[i + 1];
//     let b = pixels[i + 2];
//     // 计算灰度值
//     let gray = Math.floor((r + g + b) / 3);
//     grayScaleMatrix[x][y] = gray;
//   }

//   // 打印二维矩阵的行数和列数
//   console.log("After: "); // 打印行数
//   rows = grayScaleMatrix.length; // 行数, 即灰度矩阵的外层数组长度
//   cols = rows > 0 ? grayScaleMatrix[0].length : 0; // 列数, 即第一个内层数组的长度
//   console.log("GrayScale Matrix Rows: ", rows); // 打印行数
//   console.log("GrayScale Matrix Columns: ", cols); // 打印列数

//   // 返回计算出的灰度矩阵
//   return grayScaleMatrix;
// }


// function convertArrayToGrayScaleMatrix(characterCanvas, characterArray) {
//   if (!characterCanvas || !characterArray) {
//     console.error("Invalid inputs: characterCanvas and characterArray are required.");
//     return;
//   }

//   let w = characterCanvas.width;
//   let h = characterCanvas.height;
//   let pixels = characterArray;

//   // 创建一个二维数组来存储灰度值，初始化所有值为0
//   let grayScaleMatrix = Array.from({length: h}, () => new Array(w).fill(0));

//   // 遍历像素数组，计算灰度值，并填充到二维数组中
//   for (let i = 0; i < pixels.length; i += 4) {
//     let index = i / 4; // 获取像素在一维数组中的位置
//     let x = index % w; // x坐标
//     let y = Math.floor(index / w); // y坐标
//     let r = pixels[i];
//     let g = pixels[i+1];
//     let b = pixels[i+2];
//     let gray = Math.floor((r + g + b) / 3); // 计算灰度值
//     grayScaleMatrix[y][x] = gray; // 注意这里是[y][x]，与创建数组时的顺序一致
//   }

//   console.log("GrayScale Matrix Rows: ", grayScaleMatrix.length);
//   console.log("GrayScale Matrix Columns: ", grayScaleMatrix[0].length);

//   return grayScaleMatrix;
// }

// function convertArrayToGrayScaleMatrix(characterCanvas, characterArray) {
//   if (!characterCanvas || !characterArray) {
//     console.error("Invalid inputs: characterCanvas and characterArray are required.");
//     return;
//   }

//   let w = characterCanvas.width;  // 图像的宽度
//   let h = characterCanvas.height;  // 图像的高度
//   let pixels = characterArray;  // 图像的像素数组

//   // 创建一个二维数组来存储灰度值
//   let grayScaleMatrix = new Array(w);
//   for (let i = 0; i < w; i++) {
//     grayScaleMatrix[i] = new Array(h);
//   }

//   // 遍历像素数组，计算灰度值，并填充到二维数组中
//   for (let i = 0; i < pixels.length; i += 4) {
//     // 注意这里的坐标计算方式
//     let x = (i / 4) % w;  // 计算x坐标
//     let y = Math.floor((i / 4) / w); // 计算y坐标

//     let r = pixels[i];
//     let g = pixels[i+1];
//     let b = pixels[i+2];
//     // 计算灰度值
//     let gray = Math.floor((r + g + b) / 3);
//     grayScaleMatrix[x][y] = gray;
//   }

//   // 打印二维矩阵的行数和列数
//   let rows = grayScaleMatrix.length; // 行数
//   let cols = rows > 0 ? grayScaleMatrix[0].length : 0; // 列数
//   console.log("GrayScale Matrix Rows: ", rows); // 打印行数
//   console.log("GrayScale Matrix Columns: ", cols); // 打印列数

//   return grayScaleMatrix;
// }


function invertColors(graphicsObject) {
  graphicsObject.loadPixels(); // 确保最新的像素数据被加载
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
ChineseCharacter.prototype.invertCharacterCanvasColors = function () {
  if (!this.characterCanvas || !this.characterArray) {
    console.error("Please draw the character first using drawCharacterOnGraphics method.");
    return;
  }

  // 调用invertColors函数来反转颜色
  invertColors(this.characterCanvas);

  // 更新 characterArray 成员变量
  this.characterArray = this.characterCanvas.pixels;

  this.characterGrayScaleMatrix = convertArrayToGrayScaleMatrix(this.characterCanvas, this.characterArray);


  // 这里不需要再次更新 characterCanvas 成员变量，
  // 因为它在实际上已经被invertColors函数直接修改了
};

ChineseCharacter.prototype.invertCirclesCanvasColors = function () {
  if (!this.circlesCanvas || !this.circlesArray) {
    console.error("Please draw the character first using drawCharacterOnGraphics method.");
    return;
  }

  // 调用invertColors函数来反转颜色
  invertColors(this.circlesCanvas);

  // 更新 characterArray 成员变量
  this.circlesArray = this.circlesCanvas.pixels;

  this.circlesGrayScaleMatrix = convertArrayToGrayScaleMatrix(this.circlesCanvas, this.circlesArray);

  // 这里不需要再次更新 characterCanvas 成员变量，
  // 因为它在实际上已经被invertColors函数直接修改了
};

ChineseCharacter.prototype.drawCharacterCanvas = function () {
  image(this.characterCanvas, 0, 0);
}

ChineseCharacter.prototype.drawConcentricCircles = function () {
  // // 同心圆数量
  // let numCircles = 10;
  // // 最小半径
  // let minRadius = 20;
  // // 最大半径
  // let maxRadius = 100;
  // // 每个椭圆上的点数
  // let numPoints = 100;

  // let ellipsePoints = {}; // 存储椭圆点

  // let centerX = width / 2;
  // let centerY = height / 2;

  // 创建ConcentricCircles的实例，你可以设置参数来匹配你的需求
  this.backgroundCircles = new ConcentricCircles(10, 20, 100, 100, this.canvasSize / 2, this.canvasSize / 2);
  // this.backgroundCircles = new ConcentricCircles(); // Use default values or specify your own
  let {
    circlesCanvas,
    circlesArray
  } = this.backgroundCircles.draw();
  this.circlesArray = circlesArray;
  this.circlesCanvas = circlesCanvas;

  this.ellipsePoints = this.backgroundCircles.ellipsePoints;

  this.circlesGrayScaleMatrix = convertArrayToGrayScaleMatrix(this.circlesCanvas, this.circlesArray);

}

ChineseCharacter.prototype.drawCirclesCanvas = function () {
  // Use the canvas or pixels as you wish
  image(this.circlesCanvas, 0, 0); // For example, draw the canvas to the main display
}