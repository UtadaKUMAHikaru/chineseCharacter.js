function setup() {
	let myCharacter = new ChineseCharacter("我", "Arial"); // 创建一个 ChineseCharacter 类的实例，用于表示和处理中文字符。

	createCanvas(myCharacter.defaultConfig.IMAGE_SIZE, myCharacter.defaultConfig.IMAGE_SIZE); 
	background(255); // 255 0 

	myCharacter.plotCharacter(myCharacter.defaultConfig.IMAGE_SIZE*2/3, myCharacter.defaultConfig.IMAGE_SIZE);  // 调用实例的plotCharacter方法
	myCharacter.invertCharacterCanvasColors();
	// myCharacter.showCharacter();

	myCharacter.plotConcentricCircles(
		numCircles = myCharacter.defaultConfig.NUM_CIRCLES, // 同心圆数量
		minRadius = myCharacter.defaultConfig.MIN_RADIUS, // 最小半径
		maxRadius = myCharacter.defaultConfig.IMAGE_SIZE / 2, // 最大半径
		numPoints = myCharacter.defaultConfig.NUM_POINTS // 每个椭圆上的点数
	);

	// myCharacter.invertCirclesCanvasColors();
	myCharacter.showConcentricCircles();

	// myCharacter.findEllipseSegments();

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