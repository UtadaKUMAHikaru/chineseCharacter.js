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

// p5.prototype.ChineseCharacter.prototype.plotTrimmedSegments = function () {
// 	let trimmedSegmentInfos = this.trimmedSegmentInfos; // 假设这是trimSegments函数生成的修剪后的段信息
	
// 	let numMidPoints = this.defaultConfig.NUM_MID_POINTS;
// 	let trimmedCirclesCanvas = createGraphics(this.fontCanvasSize, this.fontCanvasSize);
	
// 	// trimmedCirclesCanvas.stroke(255, 0, 0); // 例如，用红色标记修剪后的段
// 	trimmedCirclesCanvas.stroke(0, 0, 0); // 例如，用红色标记修剪后的段
// 	trimmedCirclesCanvas.strokeWeight(1); // 设置描边粗细

// 	trimmedSegmentInfos.forEach(segmentInfo => {
// 		segmentInfo.segments.forEach(({
// 			enteringAngle,
// 			leavingAngle
// 		}) => {
// 			let radius = segmentInfo.radius;

// 			// 从 enteringAngle 到 leavingAngle 绘制中间的所有点
// 			let dAngle = (leavingAngle - enteringAngle) / (numMidPoints + 1); // 计算每两点之间的角度差
// 			for (let k = 1; k <= numMidPoints; k++) {
// 				let midAngle = enteringAngle + dAngle * k;
// 				let midX = this.centerX + radius * cos(midAngle);
// 				let midY = this.centerY + radius * sin(midAngle);
// 				trimmedCirclesCanvas.point(midX, midY); // 绘制中间点
// 			}
// 		});
// 	});

// 	this.trimmedCirclesCanvas = trimmedCirclesCanvas;

// }


p5.prototype.ChineseCharacter.prototype.kolors = [
	"aliceblue",
	"antiquewhite",
	"aqua",
	"aquamarine",
	"azure",
	"beige",
	"bisque",
	"black",
	"blanchedalmond",
	"blue",
	"blueviolet",
	"brown",
	"burlywood",
	"cadetblue",
	"chartreuse",
	"chocolate",
	"coral",
	"cornflowerblue",
	"cornsilk",
	"crimson",
	"cyan",
	"darkblue",
	"darkcyan",
	"darkgoldenrod",
	"darkgray",
	"darkgreen",
	"darkgrey",
	"darkkhaki",
	"darkmagenta",
	"darkolivegreen",
	"darkorange",
	"darkorchid",
	"darkred",
	"darksalmon",
	"darkseagreen",
	"darkslateblue",
	"darkslategray",
	"darkslategrey",
	"darkturquoise",
	"darkviolet",
	"deeppink",
	"deepskyblue",
	"dimgray",
	"dimgrey",
	"dodgerblue",
	"firebrick",
	"floralwhite",
	"forestgreen",
	"fuchsia",
	"gainsboro",
	"ghostwhite",
	"gold",
	"goldenrod",
	"gray",
	"green",
	"greenyellow",
	"grey",
	"honeydew",
	"hotpink",
	"indianred",
	"indigo",
	"ivory",
	"khaki",
	"lavender",
	"lavenderblush",
	"lawngreen",
	"lemonchiffon",
	"lightblue",
	"lightcoral",
	"lightcyan",
	"lightgoldenrodyellow",
	"lightgray",
	"lightgreen",
	"lightgrey",
	"lightpink",
	"lightsalmon",
	"lightseagreen",
	"lightskyblue",
	"lightslategray",
	"lightslategrey",
	"lightsteelblue",
	"lightyellow",
	"lime",
	"limegreen",
	"linen",
	"magenta",
	"maroon",
	"mediumaquamarine",
	"mediumblue",
	"mediumorchid",
	"mediumpurple",
	"mediumseagreen",
	"mediumslateblue",
	"mediumspringgreen",
	"mediumturquoise",
	"mediumvioletred",
	"midnightblue",
	"mintcream",
	"mistyrose",
	"moccasin",
	"navajowhite",
	"navy",
	"oldlace",
	"olive",
	"olivedrab",
	"orange",
	"orangered",
	"orchid",
	"palegoldenrod",
	"palegreen",
	"paleturquoise",
	"palevioletred",
	"papayawhip",
	"peachpuff",
	"peru",
	"pink",
	"plum",
	"powderblue",
	"purple",
	"red",
	"rosybrown",
	"royalblue",
	"saddlebrown",
	"salmon",
	"sandybrown",
	"seagreen",
	"seashell",
	"sienna",
	"silver",
	"skyblue",
	"slateblue",
	"slategray",
	"slategrey",
	"snow",
	"springgreen",
	"steelblue",
	"tan",
	"teal",
	"thistle",
	"tomato",
	"turquoise",
	"violet",
	"wheat",
	"white",
	"whitesmoke",
	"yellow",
	"yellowgreen"
	]


p5.prototype.ChineseCharacter.prototype.plotTrimmedSegments = function (colorIdx) {
    // console.log("colorIdx: ", colorIdx);
	let trimmedSegmentInfos = this.trimmedSegmentInfos; // 假设这是trimSegments函数生成的修剪后的段信息

    let numMidPoints = this.defaultConfig.NUM_MID_POINTS;
    let trimmedCirclesCanvas = createGraphics(this.fontCanvasSize, this.fontCanvasSize);

    trimmedSegmentInfos.forEach(segmentInfo => {
        // 为每个段随机选择颜色
		let startColor; // 随机起始颜色
		let endColor; // 随机结束颜色
		if (colorIdx==-1){
			startColor = color(random(this.kolors)); // 随机起始颜色
			endColor = color(random(this.kolors)); // 随机结束颜色
		}
		else{
			
			startColor = color(this.kolors[colorIdx]); // 随机起始颜色
			endColor = color(this.kolors[colorIdx]); // 随机结束颜色
		}

        segmentInfo.segments.forEach(({ enteringAngle, leavingAngle }) => {
            let radius = segmentInfo.radius;

            // 从 enteringAngle 到 leavingAngle 绘制中间的所有点
            let dAngle = (leavingAngle - enteringAngle) / (numMidPoints + 1); // 计算每两点之间的角度差
            for (let k = 1; k <= numMidPoints; k++) {
                let midAngle = enteringAngle + dAngle * k;
                let midX = this.centerX + radius * cos(midAngle);
                let midY = this.centerY + radius * sin(midAngle);

                // 使用lerpColor计算当前点的颜色
                let amt = k / (numMidPoints + 1); // 确定当前点在段中的位置
                let currColor = lerpColor(startColor, endColor, amt);

                // 设置当前点的颜色并绘制点
                trimmedCirclesCanvas.stroke(currColor);
                trimmedCirclesCanvas.point(midX, midY);
            }
        });
    });

    this.trimmedCirclesCanvas = trimmedCirclesCanvas;
};

p5.prototype.ChineseCharacter.prototype.showTrimmedSegments = function (x, y) {
    // 最终绘制到屏幕上
    image(this.trimmedCirclesCanvas, x, y);
};

p5.prototype.ChineseCharacter.prototype.showTrimmedSegments = function (x, y) {
	// 最终绘制到屏幕上
	image(this.trimmedCirclesCanvas, x, y);
}