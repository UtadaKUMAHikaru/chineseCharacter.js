// 定义函数和获取必要的数据
p5.prototype.ChineseCharacter.prototype.findEllipseSegments = function () { // 原型方法，为ChineseCharacter类的实例对象定义了findEllipseSegments方法。
	ellipsePoints = this.ellipsePoints; // 获取椭圆点的数组。

	array = this.characterGrayScaleMatrix; // 获取字符的灰度矩阵。

	scaleFactor = 1; // 定义一个缩放因子。

	let segments = {}; // 初始化一个空对象用于存储最后的椭圆段结果。

	// 处理每个椭圆点
	for (let ellipse in ellipsePoints) { // 遍历每个椭圆点集合。
		let points = ellipsePoints[ellipse]; // 获取当前椭圆的点集合。

		// // 可视化原始椭圆点
		// points.forEach(point => {
		//   plotEllipsePoint(point['x'], point['y']);
		// });
		// console.log("height, width: ", height, width);

		let localMask = new cv.Mat.zeros(height, width, cv.CV_8UC1); // 创建一个OpenCV矩阵作为局部掩码，初始化为全0。

		// 遍历点并设置局部掩码
		points.forEach(point => { // 遍历当前椭圆的每个点。
			let ix = parseInt(point['x'] / scaleFactor);
			let iy = parseInt(point['y'] / scaleFactor);
			if (0 <= ix && ix < width && 0 <= iy && iy < height && array[iy][ix] > this.defaultConfig.PIXEL_THRESHOLD) { // 判断点是否满足条件，如果满足（即灰度值大于PIXEL_THRESHOLD），则在掩码矩阵相应位置设置为255。
				localMask.ucharPtr(iy, ix)[0] = 255;
			}
		});

		// visualizeLocalMaskDistribution(localMask);
		// 可视化局部掩码
		// drawLocalMask(localMask);
		// matDistribution(localMask);

		// 使用OpenCV进行联通分量分析
		let labels = new cv.Mat(); // 创建新的矩阵labels, stats, centroids用于分析。
		let stats = new cv.Mat();
		let centroids = new cv.Mat();
		let numComponents = cv.connectedComponentsWithStats( // 进行联通分量分析，得到分量数量及其属性。
			localMask,
			labels,
			stats,
			centroids);

		// 处理联通分量并生成椭圆段
		let meanX = points.reduce((acc, p) => acc + p["x"], 0) / points.length; // 计算椭圆的中心点
		let meanY = points.reduce((acc, p) => acc + p["y"], 0) / points.length;
		let center_x = meanX / scaleFactor;
		let center_y = meanY / scaleFactor;

		let labeledPointsGroups = findAllPointsWithLabels(labels); // 根据标签分组所有点。

		let ellipse_segments = [];
		for (let i = 1; i < numComponents; i++) { // 对每个组进行处理，提取点和角度，然后基于角度差分割段落。
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
			let segmentsAfterSplit = splitSegmentIfLargeAngleDiff( // 使用splitSegmentIfLargeAngleDiff函数进一步细分段落。
				pointsWithAngles.map(pa => [pa.point, pa.angle]),
				threshold = Math.PI / 18);

			// Add the split segments to the ellipse_segments
			segmentsAfterSplit.forEach(segment => { // 将细分后的段落添加到ellipse_segments数组。
				ellipse_segments.push(segment);
			});
		}

		// 存储和清理
		segments[ellipse] = ellipse_segments; // 存储当前椭圆的所有分段。

		localMask.delete(); // 清理OpenCV.js创建的矩阵资源。
		labels.delete();
		stats.delete();
		centroids.delete();

	}

	this.ellipseSegments = segments; // 最终，将所有椭圆的分段存储到this.ellipseSegments以供后续使用。
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