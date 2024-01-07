const THRESHOLD = 0;
const IMAGE_SIZE = 400;
const SCALE_FACTOR = 1; // Super sampling ratio
const WIDTH = IMAGE_SIZE;
const HEIGHT = IMAGE_SIZE;

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
	originalWidth = width;
	originalHeight = height;
	// segments = this.segments ;
	segments = this.ellipseSegments;
	scaleFactor = 1;
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

ChineseCharacter.prototype.findEllipseSegments = function () {
	// ellipse_segments = findEllipseSegments(ellipse_points, new_hanzi_array, width, height, scale_factor, THRESHOLD)
	// function findEllipseSegments(ellipsePoints, array, width, height, scaleFactor, THRESHOLD) {
	ellipsePoints = this.ellipsePoints;
	// console.log("this.ellipsePoints: ", this.ellipsePoints);

	array = this.characterGrayScaleMatrix;
	// grayScaleMatrixDistribution(array);
	// visualizeGrayScaleMatrix(array);

	scaleFactor = 1;

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
				// console.log("ix, iy: ", ix, iy);
				localMask.ucharPtr(iy, ix)[0] = 255;
			}
		});

		// visualizeLocalMaskDistribution(localMask);
		// 可视化局部掩码
		// drawLocalMask(localMask);
		// matDistribution(localMask);

		let labels = new cv.Mat();
		let stats = new cv.Mat();
		let centroids = new cv.Mat();
		let numComponents = cv.connectedComponentsWithStats(
			localMask,
			labels,
			stats,
			centroids);

		let meanX = points.reduce((acc, p) => acc + p["x"], 0) / points.length;
		let meanY = points.reduce((acc, p) => acc + p["y"], 0) / points.length;
		let center_x = meanX / scaleFactor;
		let center_y = meanY / scaleFactor;

		let ellipse_segments = [];
		// console.log("labels: ", labels);
		for (let i = 1; i < numComponents; i++) {
			let targetLabel = i; // 假设你想找到所有标记为1的点
			let labeledPoints = findPointsWithLabel(labels, targetLabel);

			// console.log(labeledPoints); // 输出所有找到的点的坐标

			// let componentMask = labels === i; // Mask for the current component
			let segment_points = [];
			let angles = [];

			// Extracting points and their angles for the current component
			labeledPoints.forEach(point => {
				// componentMask.forEach((value, idx) => {
				// if (value) {
				// 	let y = Math.floor(idx / width);
				// 	let x = idx % width;
				// 	let adjustedX = x * scaleFactor; // Adjust coordinates based on scale factor
				// 	let adjustedY = y * scaleFactor;
				// 	let angle = Math.atan2(adjustedY - center_y, adjustedX - center_x);
				// 	angles.push(angle);
				// 	segment_points.push([adjustedX, adjustedY]);
				// }
				let y = point["x"];
				let x = point["y"];
				let adjustedX = x * scaleFactor; // Adjust coordinates based on scale factor
				let adjustedY = y * scaleFactor;
				let angle = Math.atan2(adjustedY - center_y, adjustedX - center_x);
				angles.push(angle);
				segment_points.push([adjustedX, adjustedY]);
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
					// drawEllipsePoint(point.point['x'], point.point['y']);
					// drawEllipsePoint(point['x'], point['y']);
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

// 统计并输出局部掩码的像素值分布
function matDistribution(mat) {
	// 初始化一个数组来存储每个可能的像素值的出现次数
	let distribution = new Array(256).fill(0);

	// 遍历 mat 的每个像素
	for (let y = 0; y < mat.rows; y++) {
		for (let x = 0; x < mat.cols; x++) {
			// 获取当前像素的值（这里假设是灰度图像）
			let val = mat.ucharPtr(y, x)[0];
			// 统计每个像素值的出现次数
			distribution[val]++;
		}
	}

	// 输出分布到控制台
	console.log("Local Mask Value Distribution:");
	distribution.forEach((count, val) => {
		if (count > 0) {
			console.log(`Value ${val}: ${count} times`);
		}
	});
}

// 假设labels是之前通过connectedComponentsWithStats获得的标签矩阵
// i是你想要找的标记值

function findPointsWithLabel(labels, targetLabel) {
	let points = []; // 用来存储找到的点的数组

	for (let y = 0; y < labels.rows; y++) {
		for (let x = 0; x < labels.cols; x++) {
			let label = labels.intPtr(y, x)[0]; // 获取当前像素的标签值
			if (label === targetLabel) {
				// 如果标签等于目标标签，则将其坐标存储到数组中
				points.push({
					x: x,
					y: y
				});
			}
		}
	}

	return points;
}



// Adjust parameter range and step
const AMPLITUDE_RANGE = Array.from({
	length: 19
}, (_, i) => i + 1); // From 1 to 19, step 1

const TRIM_DIRECTION = [0]; // [0], [0, 1, 2], [0, 2], [1, 2], [1], [0, 1]

const NUM_POINTS = 10000;
const MIN_RADIUS = 50; // 60
const MAX_TRIM_RATIO = 0.3; // 0.3
const NUM_CIRCLES = 100; // 70, 100, 200
const FONT_FILE_PATH = "Assets/方正楷体简体.ttf";

const MAX_RADIUS = Math.min(WIDTH, HEIGHT) / 2;