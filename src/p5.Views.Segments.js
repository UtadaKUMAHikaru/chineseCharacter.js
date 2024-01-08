// p5.prototype.ChineseCharacter.prototype.visualizeSegmentsWithColors = function () {
//     // 创建一个新的p5.Graphics对象作为独立的画布
//     let segmentCanvas = createGraphics(this.canvasSize, this.canvasSize);
//     segmentCanvas.pixelDensity(1); // 设置像素密度

//     segmentCanvas.background(255); // 设置背景颜色
//     segments = this.ellipseSegments;

// 	console.log("segments: ", segments);

//     // Loop through each segment and draw on the new canvas
//     for (let ellipse in segments) {
//         let segList = segments[ellipse];
//         segList.forEach(segment => {
            
//             if (segment.length > 1) {
//                 // Generate a random color
//                 let color = [segmentCanvas.random(255), segmentCanvas.random(255), segmentCanvas.random(255)];
//                 segmentCanvas.stroke(color); // Set stroke color
//                 segmentCanvas.strokeWeight(1); // Set stroke weight

//                 // Draw the line for each segment
//                 segmentCanvas.beginShape();
//                 segment.forEach(point => {
// 					// console.log("point: ", point);
//                     // let scaledX = point.point[0] / scaleFactor;
//                     // let scaledY = point.point[1] / scaleFactor;
                    
// 					console.log("point: ", point);
//                     let scaledX = point[0] / scaleFactor;
//                     let scaledY = point[1] / scaleFactor;
                    
// 					segmentCanvas.vertex(scaledX, scaledY); // Draw vertex for each point
//                 });
//                 segmentCanvas.endShape();
//             }
//         });
//     }

//     // Store the graphics object in the instance for further use
//     this.segmentCanvas = segmentCanvas;
// };

// p5.prototype.ChineseCharacter.prototype.showSegmentCanvas = function() {
//     if (this.segmentCanvas) {
//         // 使用p5.js的image函数来绘制存储在segmentCanvas中的图形
//         image(this.segmentCanvas, 0, 0); // 将segmentCanvas绘制到主显示画布的左上角
//     } else {
//         console.error("Segment canvas is not defined.");
//     }
// }

// Define a function to visualize segments with transparency
function visualizeSegmentsWithTransparency(originalWidth, originalHeight, segments, enableTransparency = true) {
    createCanvas(originalWidth, originalHeight);
    background(0, 0, 0, 0); // Set background to transparent

    // Loop through each segment and draw
    for (let ellipse in segments) {
        let segList = segments[ellipse];
        segList.forEach(segment => {
            if (segment.length > 1) {
                // Segment color
                let color = [random(255), random(255), random(255)];

                for (let i = 0; i < segment.length - 1; i++) {
                    // Compute transparency
                    let alpha = enableTransparency ? 255 * (1 - i / (segment.length - 1)) : 255;
                    stroke(color[0], color[1], color[2], alpha); // Set stroke color with alpha
                    strokeWeight(1); // Set stroke weight

                    // Scale points and draw line
                    let p1 = createVector(segment[i][0], segment[i][1]);
                    let p2 = createVector(segment[i + 1][0], segment[i + 1][1]);
                    line(p1.x, p1.y, p2.x, p2.y); // Draw line between points
                }
            }
        });
    }
}
