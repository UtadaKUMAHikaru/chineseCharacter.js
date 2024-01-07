// 使用p5.js和OpenCV.js来进行中文字符的可视化处理
// 全局变量定义部分
// 定义一个标志，表示OpenCV是否已经加载和准备好
let isOpencvReady = false;

// OpenCV加载完成的回调函数
function opencvIsReady() { // 回调，预期会在OpenCV.js加载完成后被调用。它将全局变量 isOpencvReady 设置为 true，表示OpenCV.js已准备好，同时在控制台打印 "OpenCV Ready" 以提示用户。
	console.log("OpenCV Ready");
	isOpencvReady = true;
}

// 预加载函数
function preload() { // 实现了一个循环，这个循环会一直执行直到 isOpencvReady 变为 true。这个循环实际上是阻塞的，意味着它会阻止任何后续代码执行，直到OpenCV.js加载完成。这不是一个好的实践，因为它会冻结整个页面。通常，应该避免这种阻塞的循环，而是使用事件或回调来处理异步加载。
	// 这里你可以预加载其他资源
	// 对于OpenCV，我们只设置一个标志
	while (!isOpencvReady) {
		;
	}
}

// 设置函数
function setup() {
	createCanvas(400, 400); // 创建一个400x400像素的画布。
	background(0); // 设置画布背景为黑色。

	// 创建一个 ChineseCharacter 类的实例，这个类可能是自定义的，用于表示和处理中文字符。
	let myCharacter = new ChineseCharacter("我", 200, "Arial", 400);
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
	// console.log(myCharacter.ellipseSegments);
	myCharacter.visualizeSegmentsWithColors();


}

// 绘制函数
// draw() 函数被留空，这意味着画布在初始绘制后不会有任何更新。通常，动态或连续的图形会在 draw() 中实现，但这里它被故意留空。
function draw() {
	// draw function is left empty intentionally
	// noLoop();

}