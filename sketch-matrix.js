//加载一张图片
let img;

function preload() {
  img = loadImage('assets/image2.png');
}

function setup() {
  createCanvas(400, 400);
  //将图片缩放到画布大小
  img.resize(width, height);
  //获取图片的pixels数组
  img.loadPixels();
  //创建一个二维矩阵
  let matrix = [];
  //遍历pixels数组，每四个元素代表一个像素的RGBA值
  for (let i = 0; i < img.pixels.length; i += 4) {
    //计算当前像素的行和列
    let row = Math.floor(i / (4 * width));
    let col = (i / 4) % width;
    //如果矩阵的第row行不存在，就创建一个空数组
    if (!matrix[row]) {
      matrix[row] = [];
    }
    //将当前像素的RGBA值存入矩阵的第row行第col列
    matrix[row][col] = [
      img.pixels[i], //R
      img.pixels[i + 1], //G
      img.pixels[i + 2], //B
      img.pixels[i + 3], //A
    ];
  }
  //创建一个新的p5图像对象
  let newImg = createImage(width, height);
  //将矩阵的数据转化为pixels数组
  newImg.loadPixels();
  //遍历矩阵的每个元素，即每个像素的RGBA值
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      //计算当前像素在pixels数组中的索引
      let index = (i * width + j) * 4;
      //将矩阵中的RGBA值赋给pixels数组
      newImg.pixels[index] = matrix[i][j][0]; //R
      newImg.pixels[index + 1] = matrix[i][j][1]; //G
      newImg.pixels[index + 2] = matrix[i][j][2]; //B
      newImg.pixels[index + 3] = matrix[i][j][3]; //A
    }
  }
  //更新pixels数组
  newImg.updatePixels();
  //在画布上显示新的图像
  image(newImg, 0, 0);
}
