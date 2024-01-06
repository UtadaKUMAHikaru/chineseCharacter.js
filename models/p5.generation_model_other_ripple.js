class ChineseCharacter {
  constructor(character, fontSize, fontName, canvasSize) {
    this.character = character;
    this.fontSize = fontSize;
    this.fontName = fontName;
    this.canvasSize = canvasSize;
    // 注意这里我们不直接调用drawCharacterOnGraphics
  }
}

p5.prototype.ChineseCharacter = ChineseCharacter;

ChineseCharacter.prototype.visualizeSegmentsWithColors = function () {
  // (image_size, image_size, ellipse_segments, scale_factor)
  // Define a function to visualize segments with random colors
  // function visualizeSegmentsWithColors(originalWidth, originalHeight, segments, scaleFactor) {
  originalWidth = width;
  originalHeight = height;
  // segments = this.segments ;
  segments = this.ellipseSegments;
  scaleFactor = 2;
  createCanvas(originalWidth, originalHeight);
  background(0); // Set background to black

  // Loop through each segment and draw
  for (let ellipse in segments) {
    let segList = segments[ellipse];
    segList.forEach(segment => {
      if (segment.length > 1) {
        // Generate a random color
        let color = [random(255), random(255), random(255)];
        stroke(color); // Set stroke color
        strokeWeight(1); // Set stroke weight

        // Draw the line for each segment
        beginShape();
        segment.forEach(point => {
          // let scaledX = point[0] / scaleFactor;
          // let scaledY = point[1] / scaleFactor;
          let scaledX = point['x'] / scaleFactor;
          let scaledY = point['y'] / scaleFactor;
          vertex(scaledX, scaledY); // Draw vertex for each point
        });
        endShape();
      }
    });
  }
  // }

}

// 可视化localMask的取值分布
function visualizeLocalMaskDistribution(localMask) {
  // localMask 是一个cv.Mat对象
  let img = createImage(localMask.cols, localMask.rows); // 创建与localMask同样大小的p5图像
  img.loadPixels();

  // 为不同的值分配不同的颜色
  for (let y = 0; y < localMask.rows; y++) {
    for (let x = 0; x < localMask.cols; x++) {
      let value = localMask.ucharPtr(y, x)[0]; // 获取每个像素的值
      // 根据像素值决定颜色
      let color;
      if (value == 0) {
        color = [0, 0, 0, 255]; // 黑色
      } else {
        // 用亮色表示较高的值
        color = [255 - value, 255 - value, 255, 255]; // 蓝色至白色
      }
      let index = (x + y * img.width) * 4;
      img.pixels[index] = color[0];
      img.pixels[index + 1] = color[1];
      img.pixels[index + 2] = color[2];
      img.pixels[index + 3] = color[3];
    }
  }

  img.updatePixels(); // 更新图像的像素值
  image(img, 0, 0); // 在画布上绘制图像
}

ChineseCharacter.prototype.findEllipseSegments = function () {
  // ellipse_segments = findEllipseSegments(ellipse_points, new_hanzi_array, width, height, scale_factor, THRESHOLD)
  // function findEllipseSegments(ellipsePoints, array, width, height, scaleFactor, THRESHOLD) {
  ellipsePoints = this.ellipsePoints;
  // console.log("this.ellipsePoints: ", this.ellipsePoints);

  // array = this.characterArray;
  array = this.characterGrayScaleMatrix;

  // console.log("this.characterArray: ", this.characterArray);
  // console.log("this.characterGrayScaleMatrix: ", this.characterGrayScaleMatrix);
  // width, height, 
  scaleFactor = 1;
  // THRESHOLD = 200 ;

  let segments = {};
  let index_i = 0;

  for (let ellipse in ellipsePoints) {
    //   index_i += 1;
    // if (index_i % 5 == 0) {
    //   console.log("ellipse: ", ellipse);
    //   console.log("ellipsePoints: ", ellipsePoints);
    // }

    let points = ellipsePoints[ellipse];

    // // 可视化原始椭圆点
    // points.forEach(point => {
    //   drawEllipsePoint(point['x'], point['y']);
    // });
    // console.log("height, width: ", height, width);

    let localMask = new cv.Mat.zeros(height, width, cv.CV_8UC1);

    points.forEach(point => {
      let ix = parseInt(point['x'] / scaleFactor);
      let iy = parseInt(point['y'] / scaleFactor);
      if (0 <= ix && ix < width && 0 <= iy && iy < height && array[iy][ix] > THRESHOLD) {
        localMask.ucharPtr(iy, ix)[0] = 255;
      }
    });

    // visualizeLocalMaskDistribution(localMask);
    // // 可视化局部掩码
    // drawLocalMask(localMask);

    let numLabels = new cv.Mat();
    let labels = new cv.Mat();
    let stats = new cv.Mat();
    let centroids = new cv.Mat();
    numLabels = cv.connectedComponentsWithStats(localMask, labels, stats, centroids);

    // Assuming ellipse_points are in the format [{x,y}, {x,y}, ...]
    let meanX = points.reduce((acc, p) => acc + p[0], 0) / points.length;
    let meanY = points.reduce((acc, p) => acc + p[1], 0) / points.length;
    let center_x = meanX / scaleFactor;
    let center_y = meanY / scaleFactor;

    let ellipse_segments = [];
    console.log("numLabels: ", numLabels);
    console.log("labels: ", labels);
    for (let i = 1; i < numLabels; i++) {
      let componentMask = labels === i; // Mask for the current component
      let segment_points = [];
      let angles = [];

      // Extracting points and their angles for the current component
      componentMask.forEach((value, idx) => {
        if (value) {
          let y = Math.floor(idx / width);
          let x = idx % width;
          let adjustedX = x * scaleFactor; // Adjust coordinates based on scale factor
          let adjustedY = y * scaleFactor;
          let angle = Math.atan2(adjustedY - center_y, adjustedX - center_x);
          angles.push(angle);
          segment_points.push([adjustedX, adjustedY]);
        }
      });

      // Sort points by angle
      let pointsWithAngles = segment_points.map((point, idx) => ({
        point: point,
        angle: angles[idx]
      }));
      pointsWithAngles.sort((a, b) => a.angle - b.angle);

      // Split points into segments based on angle difference
      let currentSegment = [pointsWithAngles[0]];
      for (let j = 1; j < pointsWithAngles.length; j++) {
        if (Math.abs(pointsWithAngles[j].angle - currentSegment[currentSegment.length - 1].angle) > Math.PI / 6) {
          ellipse_segments.push(currentSegment);
          currentSegment = [pointsWithAngles[j]];
        } else {
          currentSegment.push(pointsWithAngles[j]);
        }
      }
      if (currentSegment.length > 0) {
        ellipse_segments.push(currentSegment); // Add the last segment
      }

      console.log("ellipse_segments: ", ellipse_segments);

      // 绘制当前椭圆段
      ellipse_segments.forEach(segment => {
        // 绘制每个点或者用线连接点
        segment.forEach(point => {

          console.log("point: ", point);
          // drawEllipsePoint(point.point[0], point.point[1]);
          drawEllipsePoint(point.point['x'], point.point['y']);
        });
      });

    }

    segments[ellipse] = ellipse_segments; // Store the segments for the current ellipse

    // Clean up OpenCV.js Mats when done
    localMask.delete();
    labels.delete();
    stats.delete();
    centroids.delete();

  }

  this.ellipseSegments = segments;
  //     return segments;
  //  }

}

// 绘制椭圆点
function drawEllipsePoint(x, y) {
  push(); // Start a new drawing state
  stroke(255, 0, 0); // Set stroke to red color
  strokeWeight(5); // Set stroke weight
  point(x, y); // Draw a point at the position
  pop(); // Restore original state
}

// 绘制局部掩码
function drawLocalMask(localMask) {
  // localMask 是一个cv.Mat对象
  // 首先，创建一个与 localMask 同样大小的图像
  let img = createImage(localMask.cols, localMask.rows);
  img.loadPixels();
  
  // 遍历 localMask 的每个像素
  for (let y = 0; y < localMask.rows; y++) {
    for (let x = 0; x < localMask.cols; x++) {
      // 获取当前像素的值（这里假设是灰度图像）
      let val = localMask.ucharPtr(y, x)[0];
      // 由于我们正在创建一个白底的可视化，我们可能想要反转颜色
      let color = 255 - val; // 反转颜色
      // let color = val; // 反转颜色
      // 设置 img 的对应像素
      let index = (x + y * img.width) * 4;
      img.pixels[index] = color;
      img.pixels[index + 1] = color;
      img.pixels[index + 2] = color;
      img.pixels[index + 3] = 255; // 完全不透明
    }
  }
  
  // 更新 img 的像素并绘制到主画布上
  img.updatePixels();
  image(img, 0, 0); // 根据需要调整位置
}



// Adjust parameter range and step
const AMPLITUDE_RANGE = Array.from({
  length: 19
}, (_, i) => i + 1); // From 1 to 19, step 1

const TRIM_DIRECTION = [0]; // [0], [0, 1, 2], [0, 2], [1, 2], [1], [0, 1]

const NUM_POINTS = 10000;
const MIN_RADIUS = 50; // 60
const MAX_TRIM_RATIO = 0.3; // 0.3
const IMAGE_SIZE = 800;
const NUM_CIRCLES = 100; // 70, 100, 200
const SCALE_FACTOR = 2; // Super sampling ratio
// FONT_FILE_PATH might not be directly applicable in JS, as it depends on how you use it (e.g., in canvas or CSS)
// const FONT_FILE_PATH = "Assets/GenJyuuGothic-Medium.ttf";  
const FONT_FILE_PATH = "Assets/方正楷体简体.ttf";

const THRESHOLD = 0;
const WIDTH = IMAGE_SIZE;
const HEIGHT = IMAGE_SIZE;
const MAX_RADIUS = Math.min(WIDTH, HEIGHT) / 2;