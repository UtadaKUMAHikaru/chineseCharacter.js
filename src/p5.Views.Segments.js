ChineseCharacter.prototype.visualizeSegmentsWithColors = function () {
    // 创建一个新的p5.Graphics对象作为独立的画布
    let segmentCanvas = createGraphics(this.canvasSize, this.canvasSize);
    segmentCanvas.pixelDensity(1); // 设置像素密度

    segmentCanvas.background(255); // 设置背景颜色
    segments = this.ellipseSegments;
    scaleFactor = 1;

	console.log("segments: ", segments);

    // Loop through each segment and draw on the new canvas
    for (let ellipse in segments) {
        let segList = segments[ellipse];
        segList.forEach(segment => {
            
            if (segment.length > 1) {
                // Generate a random color
                let color = [segmentCanvas.random(255), segmentCanvas.random(255), segmentCanvas.random(255)];
                segmentCanvas.stroke(color); // Set stroke color
                segmentCanvas.strokeWeight(1); // Set stroke weight

                // Draw the line for each segment
                segmentCanvas.beginShape();
                segment.forEach(point => {
					// console.log("point: ", point);
                    // let scaledX = point.point[0] / scaleFactor;
                    // let scaledY = point.point[1] / scaleFactor;
                    
					console.log("point: ", point);
                    let scaledX = point[0] / scaleFactor;
                    let scaledY = point[1] / scaleFactor;
                    
					segmentCanvas.vertex(scaledX, scaledY); // Draw vertex for each point
                });
                segmentCanvas.endShape();
            }
        });
    }

    // Store the graphics object in the instance for further use
    this.segmentCanvas = segmentCanvas;
};

ChineseCharacter.prototype.showSegmentCanvas = function() {
    if (this.segmentCanvas) {
        // 使用p5.js的image函数来绘制存储在segmentCanvas中的图形
        image(this.segmentCanvas, 0, 0); // 将segmentCanvas绘制到主显示画布的左上角
    } else {
        console.error("Segment canvas is not defined.");
    }
}

// Define a function to visualize segments with transparency
function visualizeSegmentsWithTransparency(originalWidth, originalHeight, segments, scaleFactor, enableTransparency = true) {
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
                    let p1 = createVector(segment[i][0] / scaleFactor, segment[i][1] / scaleFactor);
                    let p2 = createVector(segment[i + 1][0] / scaleFactor, segment[i + 1][1] / scaleFactor);
                    line(p1.x, p1.y, p2.x, p2.y); // Draw line between points
                }
            }
        });
    }
}

// function visualizeSegmentsWithSupersampling(originalWidth, originalHeight, segments, scaleFactor, supersamplingFactor = 3) {
//     const largeWidth = originalWidth * supersamplingFactor;
//     const largeHeight = originalHeight * supersamplingFactor;

//     // Prepare the canvas and context for drawing
//     const canvas = document.getElementById('canvas');
//     canvas.width = largeWidth;  // Set canvas size to large dimensions for supersampling
//     canvas.height = largeHeight;
//     const ctx = canvas.getContext('2d');

//     // Set background to black
//     ctx.fillStyle = 'black';
//     ctx.fillRect(0, 0, largeWidth, largeHeight);

//     // Draw each segment
//     ctx.strokeStyle = 'white';
//     ctx.lineWidth = supersamplingFactor;  // Adjust line width based on supersampling factor
//     for (let ellipse in segments) {
//         segments[ellipse].forEach(segment => {
//             if (segment.length > 1) {
//                 // Scale and draw each segment
//                 ctx.beginPath();
//                 let scaledSegment = segment.map(point => ({
//                     x: point[0] / scaleFactor * supersamplingFactor,
//                     y: point[1] / scaleFactor * supersamplingFactor
//                 }));
//                 ctx.moveTo(scaledSegment[0].x, scaledSegment[0].y); // Move to the start of the segment
//                 scaledSegment.forEach(point => ctx.lineTo(point.x, point.y)); // Draw lines through segment points
//                 ctx.stroke();
//             }
//         });
//     }

//     // Resizing canvas to original dimensions with supersampling effect using drawImage
//     const finalCanvas = document.createElement('canvas');
//     finalCanvas.width = originalWidth;
//     finalCanvas.height = originalHeight;
//     const finalCtx = finalCanvas.getContext('2d');
//     finalCtx.drawImage(canvas, 0, 0, largeWidth, largeHeight, 0, 0, originalWidth, originalHeight);

//     // Replacing the large canvas with the resized one
//     canvas.parentNode.replaceChild(finalCanvas, canvas);
// }

