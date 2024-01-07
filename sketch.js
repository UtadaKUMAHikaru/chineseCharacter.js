// 定义一个标志，表示OpenCV是否已经加载和准备好
let isOpencvReady = false;

function opencvIsReady() {
	console.log("OpenCV Ready");
	isOpencvReady = true;
}

function preload() {
	// 这里你可以预加载其他资源
	// 对于OpenCV，我们只设置一个标志
	while (!isOpencvReady) {
		;
	}
}

function setup() {
	createCanvas(400, 400);
	background(0);

	// 创建ChineseCharacter实例
	let myCharacter = new ChineseCharacter("我", 200, "Arial", 400);
	// 接着，调用实例的drawCharacterOnGraphics方法
	myCharacter.drawCharacterOnGraphics();
	myCharacter.invertCharacterCanvasColors();
	// Now, draw the separate graphics object onto the main canvas
	myCharacter.drawCharacterCanvas();

	myCharacter.drawConcentricCircles();
	myCharacter.invertCirclesCanvasColors();
	// myCharacter.drawCirclesCanvas();

	myCharacter.findEllipseSegments();

	// 输出结果，检查segments是否符合预期
	// console.log(myCharacter.ellipseSegments);
	// myCharacter.visualizeSegmentsWithColors();


}

function draw() {
	// draw function is left empty intentionally
	// noLoop();

}