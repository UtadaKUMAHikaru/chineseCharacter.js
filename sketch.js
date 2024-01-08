function setup() {
	let myCharacter = new ChineseCharacter("我", "Arial"); // 创建一个 ChineseCharacter 类的实例，用于表示和处理中文字符。

	createCanvas(myCharacter.defaultConfig.IMAGE_SIZE, myCharacter.defaultConfig.IMAGE_SIZE); 
	background(255); // 255 0 

	myCharacter.plotCharacter(myCharacter.defaultConfig.FONT_SIZE, myCharacter.defaultConfig.IMAGE_SIZE);  // 调用实例的plotCharacter方法
	myCharacter.invertCharacterCanvasColors();
	// myCharacter.showCharacter();

	myCharacter.plotConcentricCircles(
		numCircles = myCharacter.defaultConfig.NUM_CIRCLES, // 同心圆数量
		minRadius = myCharacter.defaultConfig.MIN_RADIUS, // 最小半径
		maxRadius = myCharacter.defaultConfig.IMAGE_SIZE / 2, // 最大半径
		numPoints = myCharacter.defaultConfig.NUM_POINTS // 每个椭圆上的点数
	);
	// myCharacter.showConcentricCircles();

	trimStrategy = myCharacter.defaultConfig.TRIM_STRATEGIES['cos'];
	amplitude = myCharacter.defaultConfig.AMPLITUDE_RANGE[7];
	maxTrimRatio = myCharacter.defaultConfig.MAX_TRIM_RATIO
	trimDirection = myCharacter.defaultConfig.TRIM_DIRECTION
	console.log("trimStrategy, amplitude, maxTrimRatio, trimDirection: ", trimStrategy, amplitude, maxTrimRatio, trimDirection);

	myCharacter.trimSegments(trimStrategy, amplitude, maxTrimRatio, trimDirection);
	myCharacter.plotTrimmedSegments();
	myCharacter.showTrimmedSegments();

}