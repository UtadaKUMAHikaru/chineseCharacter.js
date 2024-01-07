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

	// visualizeGrayScaleMatrix(this.characterGrayScaleMatrix);
	// grayScaleMatrixDistribution(this.characterGrayScaleMatrix);
};

ChineseCharacter.prototype.drawConcentricCircles = function () {
	// 同心圆数量
	let numCircles = 100;
	// 最小半径
	let minRadius = 20;
	// 最大半径
	let maxRadius = 100;
	// 每个椭圆上的点数
	let numPoints = 1000;

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

// helper function creating 2-dimentional arrays
createArray2d = function (_w, _h) {
	var temp_arr = [];
	for (var temp_x = 0; temp_x < _w; temp_x++) {
		var temp_column = [];
		for (var temp_y = 0; temp_y < _h; temp_y++) temp_column[temp_y] = 0;
		temp_arr[temp_x] = temp_column;
	}
	return temp_arr;
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
	// let grayScaleMatrix = createArray2d(characterCanvas.width, characterCanvas.height);
	// let grayScaleMatrix = [];
	let matrix = [];

	// 设置灰度转换系数
	// 设置变量temp_maxWeight，用于后续计算每个像素点的灰度值。这里的值是765，即RGB三个通道值最大可能和。
	let temp_maxWeight = 3 * 255; // max r + max g + max b (ignore alpha)

	// // 遍历每个像素，计算灰度值并填充到灰度矩阵中
	// // 这个双重循环遍历characterCanvas的每个像素，temp_y和temp_x分别代表像素的行和列
	// for (var temp_y = 0; temp_y < characterCanvas.height; temp_y++) {
	// 	for (var temp_x = 0; temp_x < characterCanvas.width; temp_x++) {
	// 		// 计算每个像素在characterArray中的索引（temp_anchor）
	// 		let temp_anchor = (temp_y * characterCanvas.width + temp_x) * 4;
	// 		// 然后取出该像素的RGB值，计算其加权和（忽略alpha通道），然后除以temp_maxWeight得到一个0到1的比例，再乘以255得到一个0到255的灰度值
	// 		let temp_weight =
	// 			(
	// 				characterArray[temp_anchor] +
	// 				characterArray[temp_anchor + 1] +
	// 				characterArray[temp_anchor + 2]
	// 			) / temp_maxWeight;
	// 		// 根据AsciiArt中的方法进行灰度转换，这里直接转换成0-255范围的灰度值
	// 		let gray = Math.floor(temp_weight * 255);
	// 		// 计算出的灰度值被赋值到grayScaleMatrix对应的位置
	// 		grayScaleMatrix[temp_x][temp_y] = gray;
	// 	}
	// }

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
		// matrix[row][col] = [
		//   characterArray[i], //R
		//   characterArray[i + 1], //G
		//   characterArray[i + 2], //B
		//   characterArray[i + 3], //A
		// ];
		matrix[row][col] = Math.floor((
			characterArray[i]+ //R
			characterArray[i + 1]+ //G
			characterArray[i + 2] //B
			// characterArray[i + 3], //A
			)/3);
	  }

	// 返回灰度矩阵
	// 函数执行完毕后，返回填充好的grayScaleMatrix。这个矩阵中的每个元素代表了对应像素的灰度值，范围从0（完全黑）到255（完全白）
	// return grayScaleMatrix;
	return matrix;
}

function invertColors(graphicsObject) {
	graphicsObject.loadPixels(); // 确保最新的像素数据被加载
	pixelsArray = graphicsObject.pixels;
	for (let i = 0; i < pixelsArray.length; i += 4) {
		pixelsArray[i] = 255 - pixelsArray[i]; // 取反红色分量
		pixelsArray[i + 1] = 255 - pixelsArray[i + 1]; // 取反绿色分量
		pixelsArray[i + 2] = 255 - pixelsArray[i + 2]; // 取反蓝色分量
		// Alpha通道不变（如果需要，也可以取反）
	}
	graphicsObject.updatePixels(); // 将修改后的像素数据反映到graphics对象上
}

// 修改ChineseCharacter类的方法来使用新的invertColors函数
ChineseCharacter.prototype.invertCharacterCanvasColors = function () {
	if (!this.characterCanvas || !this.characterArray) {
		console.error("Please draw the character first.");
		return;
	}

	// 调用invertColors函数来反转颜色
	invertColors(this.characterCanvas);

	// 更新 characterArray 成员变量
	this.characterArray = this.characterCanvas.pixels;

	this.characterGrayScaleMatrix = convertArrayToGrayScaleMatrix(this.characterCanvas, this.characterArray);

	// 这里不需要再次更新 characterCanvas 成员变量，
	// 因为它在实际上已经被invertColors函数直接修改了
};

ChineseCharacter.prototype.invertCirclesCanvasColors = function () {
	if (!this.circlesCanvas || !this.circlesArray) {
		console.error("Please draw the character first.");
		return;
	}

	// 调用invertColors函数来反转颜色
	invertColors(this.circlesCanvas);

	// 更新 characterArray 成员变量
	this.circlesArray = this.circlesCanvas.pixels;

	this.circlesGrayScaleMatrix = convertArrayToGrayScaleMatrix(this.circlesCanvas, this.circlesArray);

	// 这里不需要再次更新 characterCanvas 成员变量，
	// 因为它在实际上已经被invertColors函数直接修改了
};

ChineseCharacter.prototype.drawCharacterCanvas = function () {
	image(this.characterCanvas, 0, 0);
}

ChineseCharacter.prototype.drawCirclesCanvas = function () {
	// Use the canvas or pixels as you wish
	image(this.circlesCanvas, 0, 0); // For example, draw the canvas to the main display
}
