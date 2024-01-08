// // 修改后的trimSegments函数，适用于SegmentInfo结构
// p5.prototype.ChineseCharacter.prototype.trimSegments = function (trimStrategy, amplitude, maxTrimRatio, trimDirections) {
// 	let trimmedSegmentInfos = []; // 存储调整后的段信息
// 	console.log("this.segmentInfos: ", this.segmentInfos);

// 	// 遍历所有同心圆的段信息
// 	this.segmentInfos.forEach(segmentInfo => {
// 		let trimmedSegList = []; // 为当前同心圆存储调整后的段
// 		let dynamicTrimRatio = segmentInfo.radius / this.maxRadius; // 可以基于半径定义动态削减比率
// 		console.log("dynamicTrimRatio: ", dynamicTrimRatio);
// 		console.log("segmentInfo.segments[0]: ", segmentInfo.segments[0]);

// 		// 遍历当前同心圆的所有段
// 		segmentInfo.segments.forEach(({
// 			enteringAngle,
// 			leavingAngle
// 		}) => {
// 			let segmentLength = leavingAngle - enteringAngle; // 计算段长度（角度差）
// 			console.log("segmentLength: ", segmentLength);

// 			if (segmentLength > 0.01) { // 确保段有一定长度
// 				let angle = (enteringAngle + leavingAngle) / 2; // 计算段的中心角度
// 				let trimLength;

// 				// 计算修剪长度
// 				if (trimStrategy) {
// 					let trimRatio = trimStrategy(angle, maxTrimRatio);
// 					trimLength = segmentLength * Math.abs(trimRatio);
// 				}

// 				if (amplitude) {
// 					trimLength = segmentLength * Math.sin(amplitude * dynamicTrimRatio);
// 				}

// 				// 根据修剪方向决定如何修剪段
// 				let trimDirection = trimDirections[Math.floor(Math.random() * trimDirections.length)];
// 				let trimmedSegment;
// 				console.log("trimDirection: ", trimDirection);
// 				console.log("enteringAngle, leavingAngle, trimLength: ", enteringAngle, leavingAngle, trimLength);

// 				if (trimDirection == 0) {
// 					trimmedSegment = {
// 						enteringAngle: enteringAngle + trimLength,
// 						leavingAngle
// 					};
// 				} else if (trimDirection == 1) {
// 					trimmedSegment = {
// 						enteringAngle,
// 						leavingAngle: leavingAngle - trimLength
// 					};
// 				} else {
// 					trimmedSegment = {
// 						enteringAngle,
// 						leavingAngle
// 					};
// 				}
// 				console.log("trimmedSegment: ", trimmedSegment);


// 				trimmedSegList.push(trimmedSegment);
// 			} else {
// 				trimmedSegList.push({
// 					enteringAngle,
// 					leavingAngle
// 				}); // 添加未修剪段，如果它太短
// 			}
// 			console.log("trimmedSegList: ", trimmedSegList);

// 		});

// 		trimmedSegmentInfos.push(new p5.prototype.SegmentInfo(segmentInfo.radius, trimmedSegList)); // 为当前同心圆创建一个新的SegmentInfo实例并添加到结果数组中
// 	});

// 	this.trimmedSegmentInfos = trimmedSegmentInfos;
// }

p5.prototype.ChineseCharacter.prototype.trimSegments = function (trimStrategy, amplitude, maxTrimRatio, trimDirections) {
    let trimmedSegmentInfos = []; // 存储调整后的段信息

    // 遍历所有同心圆的段信息
    this.segmentInfos.forEach(segmentInfo => {
        let trimmedSegList = []; // 为当前同心圆存储调整后的段
        let dynamicTrimRatio = segmentInfo.radius / this.maxRadius; // 可以基于半径定义动态削减比率

        // 遍历当前同心圆的所有段
        segmentInfo.segments.forEach(({ enteringAngle, leavingAngle }) => {
            let segmentLength = leavingAngle - enteringAngle; // 计算段长度（角度差）

            if (segmentLength > 0.01) { // 确保段有一定长度
                let angle = (enteringAngle + leavingAngle) / 2; // 计算段的中心角度
                let trimLength;

                // 计算修剪长度
                if (trimStrategy) {
                    let trimRatio = trimStrategy(angle, maxTrimRatio);
                    trimLength = segmentLength * Math.abs(trimRatio);
                }

                if (amplitude) {
                    trimLength = segmentLength * Math.sin(amplitude * dynamicTrimRatio);
                }

				trimLength = Math.abs(trimLength);

                trimLength = Math.min(trimLength, segmentLength); // 修剪长度不能超过段长

                // 根据修剪方向决定如何修剪段
                let trimDirection = trimDirections[Math.floor(Math.random() * trimDirections.length)];
                let trimmedSegment;

                if (trimDirection == 0) {
                    // 从 enteringAngle 开始向后修剪
                    trimmedSegment = {
                        enteringAngle: enteringAngle,
                        leavingAngle: Math.min(enteringAngle + trimLength, leavingAngle) // 修剪不超过 leavingAngle
                    };
                } else if (trimDirection == 1) {
                    // 从 leavingAngle 开始向前修剪
                    trimmedSegment = {
                        enteringAngle: Math.max(leavingAngle - trimLength, enteringAngle), // 修剪不超过 enteringAngle
                        leavingAngle: leavingAngle
                    };
                } else {
                    // 不修剪
                    trimmedSegment = {
                        enteringAngle,
                        leavingAngle
                    };
                }

                trimmedSegList.push(trimmedSegment);
            } else {
                trimmedSegList.push({ enteringAngle, leavingAngle }); // 添加未修剪段，如果它太短
            }
        });

        trimmedSegmentInfos.push(new p5.prototype.SegmentInfo(segmentInfo.radius, trimmedSegList)); // 为当前同心圆创建一个新的SegmentInfo实例并添加到结果数组中
    });

    this.trimmedSegmentInfos = trimmedSegmentInfos;
}

p5.prototype.ChineseCharacter.prototype.plotTrimmedSegments = function () {
	let trimmedSegmentInfos = this.trimmedSegmentInfos; // 假设这是trimSegments函数生成的修剪后的段信息
	console.log("this.trimmedSegmentInfos: ", this.trimmedSegmentInfos);
	
	let numMidPoints = this.defaultConfig.NUM_MID_POINTS;
	// let trimmedCirclesCanvas = createGraphics(width, height);
	let trimmedCirclesCanvas = createGraphics(this.fontCanvasSize, this.fontCanvasSize);
	
	trimmedCirclesCanvas.stroke(255, 0, 0); // 例如，用红色标记修剪后的段
	trimmedCirclesCanvas.strokeWeight(1); // 设置描边粗细

	trimmedSegmentInfos.forEach(segmentInfo => {
		segmentInfo.segments.forEach(({
			enteringAngle,
			leavingAngle
		}) => {
			let radius = segmentInfo.radius;

			// 从 enteringAngle 到 leavingAngle 绘制中间的所有点
			let dAngle = (leavingAngle - enteringAngle) / (numMidPoints + 1); // 计算每两点之间的角度差
			for (let k = 1; k <= numMidPoints; k++) {
				let midAngle = enteringAngle + dAngle * k;
				let midX = this.centerX + radius * cos(midAngle);
				let midY = this.centerY + radius * sin(midAngle);
				console.log("midX, midY: ", midX, midY);
				trimmedCirclesCanvas.point(midX, midY); // 绘制中间点
			}
		});
	});

	this.trimmedCirclesCanvas = trimmedCirclesCanvas;

}

p5.prototype.ChineseCharacter.prototype.showTrimmedSegments = function () {
	// 最终绘制到屏幕上
	image(this.trimmedCirclesCanvas, 0, 0);
}