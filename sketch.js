// 使用p5.js和OpenCV.js来进行中文字符的可视化处理

// OpenCV加载完成的回调函数
function opencvIsReady() { // 回调，预期会在OpenCV.js加载完成后被调用。它将全局变量 isOpencvReady 设置为 true，表示OpenCV.js已准备好，同时在控制台打印 "OpenCV Ready" 以提示用户。
	console.log("OpenCV Ready");
	isOpencvReady = true;
}

function main(){
	// 创建一个 ChineseCharacter 类的实例，这个类可能是自定义的，用于表示和处理中文字符。
	let myCharacter = new ChineseCharacter("我", IMAGE_SIZE / 2, "Arial", IMAGE_SIZE);
	// 接着，调用实例的drawCharacterOnGraphics方法
	myCharacter.drawCharacterOnGraphics(); // ChineseCharacter 类的方法，可能用于绘制、反转颜色、找到椭圆段和可视化等任务。
	myCharacter.invertCharacterCanvasColors();
	// Now, draw the separate graphics object onto the main canvas
	// myCharacter.drawCharacterCanvas();

	myCharacter.drawConcentricCircles();
	myCharacter.invertCirclesCanvasColors();
	// myCharacter.drawCirclesCanvas();

	myCharacter.findEllipseSegments();

	// 输出结果，检查segments是否符合预期
	console.log(myCharacter.ellipseSegments);
	myCharacter.visualizeSegmentsWithColors();
	myCharacter.drawSegmentCanvas();

	// trimStrategy = TRIM_STRATEGIES['cos'];
	// amplitude = AMPLITUDE_RANGE[3];
	// let trimmedSegments = trimSegments(trimStrategy, amplitude, myCharacter.ellipseSegments, MAX_TRIM_RATIO, TRIM_DIRECTION);
	// // 处理trimmedSegments，可能是可视化或其他操作
	// myCharacter.ellipseSegments = trimmedSegments; // 例如，更新myCharacter对象的ellipseSegments属性

	// myCharacter.visualizeSegmentsWithColors();
	// myCharacter.drawSegmentCanvas();
	
}

// 设置函数
function setup() {
	createCanvas(IMAGE_SIZE, IMAGE_SIZE); // 创建一个400x400像素的画布。
	background(0); // 255 0 设置画布背景为黑色。
	main();
}

// 绘制函数
// draw() 函数被留空，这意味着画布在初始绘制后不会有任何更新。通常，动态或连续的图形会在 draw() 中实现，但这里它被故意留空。
function draw() {
	// draw function is left empty intentionally

}