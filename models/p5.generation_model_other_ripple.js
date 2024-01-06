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

ChineseCharacter.prototype.visualizeSegmentsWithColors = function() {
  // (image_size, image_size, ellipse_segments, scale_factor)
  // Define a function to visualize segments with random colors
// function visualizeSegmentsWithColors(originalWidth, originalHeight, segments, scaleFactor) {
  originalWidth = width;
  originalHeight = height ;
  segments = this.segments ;
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
                  let scaledX = point[0] / scaleFactor;
                  let scaledY = point[1] / scaleFactor;
                  vertex(scaledX, scaledY); // Draw vertex for each point
              });
              endShape();
          }
      });
  }
// }

}

ChineseCharacter.prototype.findEllipseSegments = function() {
  // ellipse_segments = findEllipseSegments(ellipse_points, new_hanzi_array, width, height, scale_factor, THRESHOLD)
  // function findEllipseSegments(ellipsePoints, array, width, height, scaleFactor, THRESHOLD) {
  ellipsePoints = this.ellipsePoints;
  array = this.characterArray;
  // width, height, 
  scaleFactor = 2;
  // THRESHOLD = 200 ;

    let segments = {};

    for (let ellipse in ellipsePoints) {
        let points = ellipsePoints[ellipse];
        let localMask = new cv.Mat.zeros(height, width, cv.CV_8UC1);

        points.forEach(point => {
            let ix = parseInt(point[0] / scaleFactor);
            let iy = parseInt(point[1] / scaleFactor);
            if (0 <= ix && ix < width && 0 <= iy && iy < height && array[iy][ix] > THRESHOLD) {
                localMask.ucharPtr(iy, ix)[0] = 255;
            }
        });

        let numLabels = new cv.Mat();
        let labels = new cv.Mat();
        let stats = new cv.Mat();
        let centroids = new cv.Mat();
        cv.connectedComponentsWithStats(localMask, labels, stats, centroids);

        // Assuming ellipse_points are in the format [{x,y}, {x,y}, ...]
        let meanX = points.reduce((acc, p) => acc + p[0], 0) / points.length;
        let meanY = points.reduce((acc, p) => acc + p[1], 0) / points.length;
        let center_x = meanX / scaleFactor;
        let center_y = meanY / scaleFactor;

        let ellipse_segments = [];
        for (let i = 1; i < numLabels; i++) {
            let componentMask = labels === i;  // Mask for the current component
            let segment_points = [];
            let angles = [];
        
            // Extracting points and their angles for the current component
            componentMask.forEach((value, idx) => {
                if (value) {
                    let y = Math.floor(idx / width);
                    let x = idx % width;
                    let adjustedX = x * scaleFactor;  // Adjust coordinates based on scale factor
                    let adjustedY = y * scaleFactor;
                    let angle = Math.atan2(adjustedY - center_y, adjustedX - center_x);
                    angles.push(angle);
                    segment_points.push([adjustedX, adjustedY]);
                }
            });
        
            // Sort points by angle
            let pointsWithAngles = segment_points.map((point, idx) => ({ point: point, angle: angles[idx] }));
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
                ellipse_segments.push(currentSegment);  // Add the last segment
            }
        }
        
        segments[ellipse] = ellipse_segments;  // Store the segments for the current ellipse
        
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




// Adjust parameter range and step
const AMPLITUDE_RANGE = Array.from({length: 19}, (_, i) => i + 1);  // From 1 to 19, step 1

const TRIM_DIRECTION = [0]; // [0], [0, 1, 2], [0, 2], [1, 2], [1], [0, 1]

const NUM_POINTS = 10000;
const MIN_RADIUS = 50; // 60
const MAX_TRIM_RATIO = 0.3; // 0.3
const IMAGE_SIZE = 800;
const NUM_CIRCLES = 100; // 70, 100, 200
const SCALE_FACTOR = 2;  // Super sampling ratio
// FONT_FILE_PATH might not be directly applicable in JS, as it depends on how you use it (e.g., in canvas or CSS)
// const FONT_FILE_PATH = "Assets/GenJyuuGothic-Medium.ttf";  
const FONT_FILE_PATH = "Assets/方正楷体简体.ttf";  

const THRESHOLD = 0;
const WIDTH = IMAGE_SIZE;
const HEIGHT = IMAGE_SIZE;
const MAX_RADIUS = Math.min(WIDTH, HEIGHT) / 2;







