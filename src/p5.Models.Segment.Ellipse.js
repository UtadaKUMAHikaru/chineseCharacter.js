p5.prototype.ChineseCharacter.prototype.findEllipseSegments = function () {
	ellipsePoints = this.ellipsePoints;

	array = this.characterGrayScaleMatrix;

	scaleFactor = 1;

	let segments = {};

	for (let ellipse in ellipsePoints) {
		let points = ellipsePoints[ellipse];

		// // 可视化原始椭圆点
		// points.forEach(point => {
		//   plotEllipsePoint(point['x'], point['y']);
		// });
		// console.log("height, width: ", height, width);

		let localMask = new cv.Mat.zeros(height, width, cv.CV_8UC1);

		points.forEach(point => {
			let ix = parseInt(point['x'] / scaleFactor);
			let iy = parseInt(point['y'] / scaleFactor);
			if (0 <= ix && ix < width && 0 <= iy && iy < height && array[iy][ix] > this.defaultConfig.PIXEL_THRESHOLD) {
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

		let labeledPointsGroups = findAllPointsWithLabels(labels);

		let ellipse_segments = [];
		for (let i = 1; i < numComponents; i++) {
			let targetLabel = i;
			let labeledPoints = labeledPointsGroups[targetLabel];

			let segment_points = [];
			let angles = [];

			// Extracting points and their angles for the current component
			labeledPoints.forEach(point => {
				let x = point["x"];
				let y = point["y"];
				let adjustedX = x * scaleFactor;
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

			// Now, use the splitSegmentIfLargeAngleDiff function
			let segmentsAfterSplit = splitSegmentIfLargeAngleDiff(
				pointsWithAngles.map(pa => [pa.point, pa.angle]),
				threshold = Math.PI / 18);

			// Add the split segments to the ellipse_segments
			segmentsAfterSplit.forEach(segment => {
				ellipse_segments.push(segment);
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
}

// p5.prototype.ChineseCharacter.prototype.findEllipseSegments = function () {
// 	ellipsePoints = this.ellipsePoints;

// 	array = this.characterGrayScaleMatrix;

// 	scaleFactor = 1;

// 	let segments = {};

// 	for (let ellipse in ellipsePoints) {
// 		let points = ellipsePoints[ellipse];

// 		// // 可视化原始椭圆点
// 		// points.forEach(point => {
// 		//   plotEllipsePoint(point['x'], point['y']);
// 		// });
// 		// console.log("height, width: ", height, width);

// 		let localMask = new cv.Mat.zeros(height, width, cv.CV_8UC1);

// 		points.forEach(point => {
// 			let ix = parseInt(point['x'] / scaleFactor);
// 			let iy = parseInt(point['y'] / scaleFactor);
// 			if (0 <= ix && ix < width && 0 <= iy && iy < height && array[iy][ix] > PIXEL_THRESHOLD) {
// 				localMask.ucharPtr(iy, ix)[0] = 255;
// 			}
// 		});

// 		// visualizeLocalMaskDistribution(localMask);
// 		// 可视化局部掩码
// 		// drawLocalMask(localMask);
// 		// matDistribution(localMask);

// 		let labels = new cv.Mat();
// 		let stats = new cv.Mat();
// 		let centroids = new cv.Mat();
// 		let numComponents = cv.connectedComponentsWithStats(
// 			localMask,
// 			labels,
// 			stats,
// 			centroids);

// 		let meanX = points.reduce((acc, p) => acc + p["x"], 0) / points.length;
// 		let meanY = points.reduce((acc, p) => acc + p["y"], 0) / points.length;
// 		let center_x = meanX / scaleFactor;
// 		let center_y = meanY / scaleFactor;

// 		let labeledPointsGroups = findAllPointsWithLabels(labels);

// 		let ellipse_segments = [];
// 		for (let i = 1; i < numComponents; i++) {
// 			let targetLabel = i; // 假设你想找到所有标记为1的点
// 			let labeledPoints = labeledPointsGroups[targetLabel];

// 			let segment_points = [];
// 			let angles = [];

// 			// Extracting points and their angles for the current component
// 			labeledPoints.forEach(point => {
// 				let x = point["x"];
// 				let y = point["y"];
// 				let adjustedX = x * scaleFactor; // Adjust coordinates based on scale factor
// 				let adjustedY = y * scaleFactor;
// 				let angle = Math.atan2(adjustedY - center_y, adjustedX - center_x);
// 				angles.push(angle);
// 				segment_points.push([adjustedX, adjustedY]);
// 			});

// 			// Sort points by angle
// 			let pointsWithAngles = segment_points.map((point, idx) => ({
// 				point: point,
// 				angle: angles[idx]
// 			}));
// 			pointsWithAngles.sort((a, b) => a.angle - b.angle);

// 			// Split points into segments based on angle difference
// 			let currentSegment = [pointsWithAngles[0]];
// 			for (let j = 1; j < pointsWithAngles.length; j++) {
// 				if (Math.abs(pointsWithAngles[j].angle - currentSegment[currentSegment.length - 1].angle) > Math.PI / 6) {
// 					ellipse_segments.push(currentSegment);
// 					currentSegment = [pointsWithAngles[j]];
// 				} else {
// 					currentSegment.push(pointsWithAngles[j]);
// 				}
// 			}
// 			if (currentSegment.length > 0) {
// 				ellipse_segments.push(currentSegment); // Add the last segment
// 			}

// 			// 绘制当前椭圆段
// 			ellipse_segments.forEach(segment => {
// 				// 绘制每个点或者用线连接点
// 				segment.forEach(point => {
// 					// plotEllipsePoint(point.point[0], point.point[1]);
// 					;
// 				});
// 			});

// 		}

// 		segments[ellipse] = ellipse_segments; // Store the segments for the current ellipse

// 		// Clean up OpenCV.js Mats when done
// 		localMask.delete();
// 		labels.delete();
// 		stats.delete();
// 		centroids.delete();

// 	}

// 	this.ellipseSegments = segments;
// }