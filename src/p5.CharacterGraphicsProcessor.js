ChineseCharacter.prototype.drawCharacterOnGraphics = function () {
	// Create a p5.Graphics object as a separate canvas
	let characterCanvas = createGraphics(this.canvasSize, this.canvasSize);

	// 这句话非常重要！！！！！！
	characterCanvas.pixelDensity(1);

	// Set text characteristics in the graphics object
	characterCanvas.background(255); // Set background to white
	characterCanvas.fill(0); // Set fill to black for the text
	characterCanvas.textSize(this.fontSize);
	characterCanvas.textAlign(CENTER, CENTER);
	characterCanvas.textFont(this.fontName); // Use the specified font

	// Draw the text on the graphics object
	characterCanvas.text(this.character, characterCanvas.width / 2, characterCanvas.height / 2);

	// Extract pixel array from the graphics object
	characterCanvas.loadPixels();

	this.characterCanvas = characterCanvas;
	this.characterArray = characterCanvas.pixels; // This is the array representation of your graphics
	
	this.characterGrayScaleMatrix = convertArrayToGrayScaleMatrix(this.characterCanvas, this.characterArray);
};

ChineseCharacter.prototype.drawConcentricCircles = function () {
	// 同心圆数量
	let numCircles = NUM_CIRCLES;
	// 最小半径
	let minRadius = 20;
	// 最大半径
	let maxRadius = MAX_RADIUS;
	// 每个椭圆上的点数
	let numPoints = NUM_POINTS;

	// let centerX = width / 2;
	// let centerY = height / 2;

	// 创建ConcentricCircles的实例，你可以设置参数来匹配你的需求
	this.backgroundCircles = new ConcentricCircles(numCircles, minRadius, maxRadius, numPoints, this.canvasSize / 2, this.canvasSize / 2);
	let {
		circlesCanvas,
		circlesArray
	} = this.backgroundCircles.draw();
	this.circlesArray = circlesArray;
	this.circlesCanvas = circlesCanvas;

	this.ellipsePoints = this.backgroundCircles.ellipsePoints;

	this.circlesGrayScaleMatrix = convertArrayToGrayScaleMatrix(this.circlesCanvas, this.circlesArray);

}

// 将包含RGBA像素数据的一维数组转换成一个二维灰度值矩阵
function convertArrayToGrayScaleMatrix(characterCanvas, characterArray) {
	// 参数校验
	// 首先检查输入参数characterCanvas和characterArray是否存在，如果不存在，则输出错误信息并中止函数执行。
	if (!characterCanvas || !characterArray) {
		console.error("Invalid inputs: characterCanvas and characterArray are required.");
		return;
	}

	// 创建灰度矩阵
	// 调用createArray2d函数创建一个与characterCanvas同样大小的二维数组grayScaleMatrix，这个数组用于存储灰度值。
	let matrix = [];

	//遍历pixels数组，每四个元素代表一个像素的RGBA值
	for (let i = 0; i < characterArray.length; i += 4) {
		//计算当前像素的行和列
		let row = Math.floor(i / (4 * width));
		let col = (i / 4) % width;
		//如果矩阵的第row行不存在，就创建一个空数组
		if (!matrix[row]) {
		  matrix[row] = [];
		}
		//将当前像素的RGBA值存入矩阵的第row行第col列
		matrix[row][col] = Math.floor((
			characterArray[i]+ //R
			characterArray[i + 1]+ //G
			characterArray[i + 2] //B
			)/3);
	  }

	// 返回灰度矩阵
	// 函数执行完毕后，返回填充好的grayScaleMatrix。这个矩阵中的每个元素代表了对应像素的灰度值，范围从0（完全黑）到255（完全白）
	return matrix;
}

ChineseCharacter.prototype.drawCharacterCanvas = function () {
	image(this.characterCanvas, 0, 0);
}

ChineseCharacter.prototype.drawCirclesCanvas = function () {
	// Use the canvas or pixels as you wish
	image(this.circlesCanvas, 0, 0); // For example, draw the canvas to the main display
}
