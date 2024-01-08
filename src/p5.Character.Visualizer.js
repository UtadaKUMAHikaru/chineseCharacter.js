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

ChineseCharacter.prototype.drawSegmentCanvas = function() {
    if (this.segmentCanvas) {
        // 使用p5.js的image函数来绘制存储在segmentCanvas中的图形
        image(this.segmentCanvas, 0, 0); // 将segmentCanvas绘制到主显示画布的左上角
    } else {
        console.error("Segment canvas is not defined.");
    }
}


// 可视化grayScaleMatrix的分布
function visualizeGrayScaleMatrix(grayScaleMatrix) {
	// 获取矩阵的行数和列数
	let rows = grayScaleMatrix.length;
	let cols = rows > 0 ? grayScaleMatrix[0].length : 0;

	// 创建与grayScaleMatrix同样大小的p5图像
	let img = createImage(cols, rows);
	img.loadPixels();

	// 遍历grayScaleMatrix的每个像素
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			// 获取当前像素的灰度值
			let val = grayScaleMatrix[y][x];
			// 设置img的对应像素
			let index = (x + y * cols) * 4;
			img.pixels[index] = val; // 灰度值用于红色分量
			img.pixels[index + 1] = val; // 灰度值用于绿色分量
			img.pixels[index + 2] = val; // 灰度值用于蓝色分量
			img.pixels[index + 3] = 255; // alpha值设置为255，完全不透明
		}
	}

	// 更新img的像素并绘制到主画布上
	img.updatePixels();
	image(img, 0, 0); // 在画布上绘制图像
}

// 统计并输出characterGrayScaleMatrix的像素值分布
function grayScaleMatrixDistribution(grayScaleMatrix) {
	// 初始化一个数组来存储每个可能的像素值的出现次数
	let distribution = new Array(256).fill(0);

	// 获取grayScaleMatrix的行数和列数
	let rows = grayScaleMatrix.length;
	let cols = rows > 0 ? grayScaleMatrix[0].length : 0;
	console.log(`rows ${rows}, cols ${cols}`);

	// 遍历grayScaleMatrix的每个像素
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			// 获取当前像素的灰度值
			let val = grayScaleMatrix[y][x]; // Assuming it's already a gray value
			// 统计每个像素值的出现次数
			distribution[val]++;
		}
	}

	// 输出分布到控制台
	console.log("GrayScale Matrix Value Distribution:");
	distribution.forEach((count, val) => {
		if (count > 0) {
			console.log(`Value ${val}: ${count} times`);
		}
	});
}
