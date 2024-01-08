p5.prototype.ChineseCharacter.prototype.plotConcentricCircles = function (numCircles, minRadius, maxRadius, numPoints) { // 定义了一个plotConcentricCircles函数，这个函数接受四个参数：numCircles（同心圆的数量），minRadius（最小半径），maxRadius（最大半径），numPoints（每个圆上的点数）。
	// 将这些参数赋值给this对象的属性，以便在其他地方使用。然后，计算出画布的中心点坐标，也赋值给this对象的属性。接着，初始化了两个空对象，segmentStartEnd和ellipsePoints，用来存储圆上的点的信息。
	this.numCircles = numCircles;
	this.minRadius = minRadius;
	this.maxRadius = maxRadius;
	this.numPoints = numPoints;
	this.centerX = this.canvasSize / 2;
	this.centerY = this.canvasSize / 2;

	scaleFactor = 1;

	numMidPoints = this.defaultConfig.NUM_MID_POINTS;

	// 创建了一个p5.Graphics对象，作为一个单独的画布，用来绘制同心圆。这里有一句非常重要的代码，circlesCanvas.pixelDensity(1)，这是为了保证画布的像素密度为1，否则会影响后面的灰度矩阵的计算2。
	let circlesCanvas = createGraphics(width, height);
	// 这句话非常重要！！！！！！
	circlesCanvas.pixelDensity(1);

	// 接下来，设置了画布的图形特征，即不填充颜色，只用黑色描边。
	circlesCanvas.noFill();
	circlesCanvas.stroke(0);

	class SegmentInfo {
		constructor(radius) {
			this.radius = radius;
			this.segments = []; // 每个段的信息，包含进入和离开角度
		}

		// 添加一个新的段
		addSegment(enteringAngle, leavingAngle) {
			this.segments.push({
				enteringAngle,
				leavingAngle
			});
		}
	}


	this.segmentInfos = []; // 初始化一个数组来存储所有同心圆的段落信息
	this.ellipsePoints = {};

	// 然后，获取了this对象的一个属性，characterGrayScaleMatrix，这是一个二维数组，表示一个汉字的灰度矩阵，即每个像素的灰度值。同时，定义了一个布尔变量insideChar，初始值为false，表示当前点是否在汉字的内部。
	let array = this.characterGrayScaleMatrix;

	for (let i = 0; i < this.numCircles; i++) { // 用一个for循环，从0到numCircles-1，遍历每个同心圆。在每次循环中，先根据最小半径，最大半径和圆的序号，计算出当前圆的半径。然后，初始化一个空数组，用来存储当前圆上的点的坐标，将其赋值给this对象的ellipsePoints对象的第i个属性。

		let radius = this.minRadius + i *
			(this.maxRadius - this.minRadius) / this.numCircles;

		let segmentInfo = new SegmentInfo(radius); // 创建一个SegmentInfo实例
		let insideChar = false; // 初始时认为不在字符内部
		let offset = 0; // 初始化offset为0

		// 在修改修改plotConcentricCircles函数的时候，初始时认为不在字符内部，但是，如果初始在内部的时候，能不能先跳过，到下一段，因为我想要完整的段。这样一开始在的那段我希望和最后段合在一起，也就是遍历到最后的时候又遍历回来继续一开始的那半段。也就是说，我希望起点顺延，顺延到出一开始就在的那一段之后，在那之后，再开始遍历一周。这样吧：
		// 【for (let j = 0; j < numPoints; j++) {】你在这句话里，加一个offset，如果第一个点在字符内，那么需要offset，offset的值为到达字符外的点数，也就是刚出字符的下一个点的索引；如果不在，那么offset为0.
		// 首先，找到第一个在字符外的点作为起始点
		for (let j = 0; j < numPoints; j++) {
			let angle = TWO_PI * j / numPoints;
			let x = this.centerX + radius * cos(angle);
			let y = this.centerY + radius * sin(angle);
			let ix = parseInt(x / scaleFactor);
			let iy = parseInt(y / scaleFactor);
			if (array[iy][ix] <= this.defaultConfig.PIXEL_THRESHOLD) {
				offset = j; // 设置offset为当前点的索引
				break;
			}
		}
		// console.log("offset: ", offset);

		let enteringAngle = null; // 初始化进入角度为null

		this.ellipsePoints[i] = [];
		// for (let i = 0; i < this.numPoints; i++) { // 然后，用另一个for循环，从0到numPoints-1，遍历每个圆上的点。在每次循环中，先根据点的序号和圆周率，计算出当前点的角度。然后，根据角度，半径和中心点坐标，计算出当前点的x和y坐标。接着，根据一个缩放因子，将当前点的坐标转换为整数，用来在灰度矩阵中定位。然后，根据灰度矩阵的值和一个阈值，判断当前点是否在汉字的内部，赋值给currentInsideChar变量。
		// 	let angle = TWO_PI * i / this.numPoints;
		// 	let x = this.centerX + radius * cos(angle);
		// 	let y = this.centerY + radius * sin(angle);

		// 	let ix = parseInt(point.x / scaleFactor);
		// 	let iy = parseInt(point.y / scaleFactor);
		// 	let currentInsideChar = array[iy][ix] > this.defaultConfig.PIXEL_THRESHOLD; // 判断当前点是否在字符内部

		// 	if (currentInsideChar && !insideChar) { // 根据currentInsideChar和insideChar的值，判断当前点是不是一个进入点或离开点，即从汉字的外部到内部或从内部到外部的转换点。如果是进入点，就将当前点的坐标和角度作为一个对象，添加到segments数组中。如果是离开点，就将当前点的坐标作为一个属性，添加到segments数组的最后一个对象中。然后，更新insideChar的值，以便下一次循环使用。
		// 		// 如果当前点在字符内部，且之前点不在字符内部，记录进入点
		// 		segments.push({
		// 			entering: point,
		// 			angle: angle /* 计算角度 */
		// 		});
		// 	} else if (!currentInsideChar && insideChar) {
		// 		// 如果当前点不在字符内部，且之前点在字符内部，记录离开点
		// 		segments[segments.length - 1].leaving = point; // 添加离开点到最后一个进入点段
		// 	}
		// 	insideChar = currentInsideChar; // 更新字符内外状态


		// 	this.ellipsePoints[i].push(createVector(x, y)); // 将当前点的坐标作为一个向量，添加到this对象的ellipsePoints对象的第i个数组中。这样，就完成了一个圆上的所有点的遍历。
		// }

		// 在完成了所有圆的遍历后，用circlesCanvas.ellipse函数，根据每个圆的半径和中心点坐标，绘制出每个圆。然后，用circlesCanvas.loadPixels函数，将画布的像素数据加载到circlesCanvas.pixels数组中。这是一个一维数组，表示画布的每个像素的RGBA值。然后，将这个数组赋值给this对象的circlesArray属性，将circlesCanvas对象赋值给this对象的circlesCanvas属性。

		for (let j = offset; j < offset + numPoints; j++) { // 从offset开始，遍历一周
			let idx = j % numPoints; // 确保索引不超过numPoints
			let angle = TWO_PI * idx / numPoints;
			let x = this.centerX + radius * cos(angle);
			let y = this.centerY + radius * sin(angle);
			let ix = parseInt(x / scaleFactor);
			let iy = parseInt(y / scaleFactor);
			let currentInsideChar = array[iy][ix] > this.defaultConfig.PIXEL_THRESHOLD;
			// console.log("currentInsideChar, insideChar: ", currentInsideChar, insideChar);

			if (currentInsideChar && !insideChar) {
				// console.log("In");
				enteringAngle = angle; // 记录进入角度
			} else if (!currentInsideChar && insideChar) {
				if (enteringAngle !== null) {
					// console.log("Out");
					let leavingAngle = angle;
					segmentInfo.addSegment(enteringAngle, angle); // 添加一个新的段

					// 从 enteringAngle 到 leavingAngle 绘制中间的所有点
					let dAngle = (leavingAngle - enteringAngle) / (numMidPoints + 1); // 计算每两点之间的角度差
					// console.log("dAngle: ", dAngle);
					for (let k = 1; k <= numMidPoints; k++) {
						let midAngle = enteringAngle + dAngle * k;
						let midX = this.centerX + radius * cos(midAngle);
						let midY = this.centerY + radius * sin(midAngle);
						// console.log("midX, midY: ", midX, midY);
						circlesCanvas.point(midX, midY); // 绘制中间点
					}
				}
				enteringAngle = null; // 重置进入角度为null
			}
			insideChar = currentInsideChar;
		}

		// // 处理最后一个段可能没闭合的情况
		// if (enteringAngle !== null) {
		//     let leavingAngle = TWO_PI * offset / numPoints; // 设置离开角度为offset对应的角度
		//     segmentInfo.addSegment(enteringAngle, leavingAngle);
		// }

		this.segmentInfos.push(segmentInfo); // 将当前同心圆的段落信息添加到数组中
		// circlesCanvas.ellipse(this.centerX, this.centerY, radius * 2, radius * 2);
	}

	// 最后，调用一个convertArrayToGrayScaleMatrix函数，将circlesCanvas对象和circlesArray数组作为参数，返回一个二维数组，表示画布的灰度矩阵。然后，将这个数组赋值给this对象的circlesGrayScaleMatrix属性。这样，就完成了plotConcentricCircles函数的所有逻辑。
	circlesCanvas.loadPixels();
	let circlesArray = circlesCanvas.pixels; // This is the array representation of your graphics

	this.circlesArray = circlesArray;
	this.circlesCanvas = circlesCanvas;

	this.circlesGrayScaleMatrix = convertArrayToGrayScaleMatrix(this.circlesCanvas, this.circlesArray);
}

p5.prototype.ChineseCharacter.prototype.showConcentricCircles = function () {
	// Use the canvas or pixels as you wish
	image(this.circlesCanvas, 0, 0); // For example, draw the canvas to the main display
}