// 使用p5.js和OpenCV.js来进行中文字符的可视化处理
// 设置函数
function setup() {
	// 创建一个 ChineseCharacter 类的实例，用于表示和处理中文字符。
	let myCharacter = new ChineseCharacter("我", "Arial");

	createCanvas(myCharacter.defaultConfig.IMAGE_SIZE, myCharacter.defaultConfig.IMAGE_SIZE); 
	background(0); // 255 0 

	// 接着，调用实例的plotCharacter方法
	myCharacter.plotCharacter(myCharacter.defaultConfig.IMAGE_SIZE*2/3, myCharacter.defaultConfig.IMAGE_SIZE); // ChineseCharacter 类的方法，用于绘制、反转颜色、找到椭圆段和可视化等任务。
	myCharacter.invertCharacterCanvasColors();
	// Now, draw the separate graphics object onto the main canvas
	// myCharacter.showCharacter();

	myCharacter.plotConcentricCircles(
		numCircles = myCharacter.defaultConfig.NUM_CIRCLES, // 同心圆数量，默认为全局常量NUM_CIRCLES
		minRadius = myCharacter.defaultConfig.MIN_RADIUS, // 最小半径，默认为20
		maxRadius = myCharacter.defaultConfig.IMAGE_SIZE / 2, // 最大半径，默认为WIDTH和HEIGHT的较小者的一半
		numPoints = myCharacter.defaultConfig.NUM_POINTS // 每个椭圆上的点数，默认为全局常量NUM_POINTS
	);
	myCharacter.invertCirclesCanvasColors();
	myCharacter.showConcentricCircles();

	myCharacter.findEllipseSegments();

	// // 输出结果，检查segments是否符合预期
	// console.log(myCharacter.ellipseSegments);
	// myCharacter.visualizeSegmentsWithColors();
	// myCharacter.showSegmentCanvas();

	// trimStrategy = TRIM_STRATEGIES['cos'];
	// amplitude = AMPLITUDE_RANGE[3];
	// let trimmedSegments = trimSegments(trimStrategy, amplitude, myCharacter.ellipseSegments, MAX_TRIM_RATIO, TRIM_DIRECTION);
	// // 处理trimmedSegments，可能是可视化或其他操作
	// myCharacter.ellipseSegments = trimmedSegments; // 例如，更新myCharacter对象的ellipseSegments属性

	// myCharacter.visualizeSegmentsWithColors();
	// myCharacter.showSegmentCanvas();


}

// 绘制函数
// draw() 函数被留空，这意味着画布在初始绘制后不会有任何更新。通常，动态或连续的图形会在 draw() 中实现，但这里它被故意留空。
function draw() {
	// draw function is left empty intentionally

}