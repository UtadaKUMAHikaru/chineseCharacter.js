let font;

function preload() {
	font = loadFont("assets/GenJyuuGothic-P-Heavy.ttf");
}

function setup() {
	let myCharacter = new ChineseCharacter("I", font); // 创建一个 ChineseCharacter 类的实例，用于表示和处理中文字符。

	createCanvas(myCharacter.defaultConfig.IMAGE_SIZE, myCharacter.defaultConfig.IMAGE_SIZE);
	background(255); // 255 0 

	myCharacter.plotCharacter(myCharacter.defaultConfig.FONT_SIZE, myCharacter.defaultConfig.FONT_CANVAS_SIZE); // 调用实例的plotCharacter方法
	myCharacter.invertCharacterCanvasColors();
	// myCharacter.showCharacter();

	myCharacter.plotConcentricCircles(
		numCircles = myCharacter.defaultConfig.NUM_CIRCLES, // 同心圆数量
		minRadius = myCharacter.defaultConfig.MIN_RADIUS, // 最小半径
		maxRadius = myCharacter.defaultConfig.FONT_CANVAS_SIZE / 2, // 最大半径
		numPoints = myCharacter.defaultConfig.NUM_POINTS // 每个椭圆上的点数
	);
	// myCharacter.showConcentricCircles();

	// trimStrategy = myCharacter.defaultConfig.TRIM_STRATEGIES['cos'];
	// amplitude = myCharacter.defaultConfig.AMPLITUDE_RANGE[7];
	// maxTrimRatio = myCharacter.defaultConfig.MAX_TRIM_RATIO
	// trimDirection = myCharacter.defaultConfig.TRIM_DIRECTION

	// myCharacter.trimSegments(trimStrategy, amplitude, maxTrimRatio, trimDirection);
	// myCharacter.plotTrimmedSegments();
	// myCharacter.showTrimmedSegments(myCharacter.defaultConfig.FONT_CANVAS_SIZE, 0);

	myCharacter.plotAllStrategiesAndAmplitudes(); // 绘制所有修剪策略和振幅参数


}