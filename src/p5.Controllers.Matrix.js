// 将包含RGBA像素数据的一维数组转换成一个二维灰度值矩阵
function convertArrayToGrayScaleMatrix(canvas, array) {
	// 参数校验
	// 首先检查输入参数characterCanvas和characterArray是否存在，如果不存在，则输出错误信息并中止函数执行。
	if (!canvas || !array) {
		console.error("Invalid inputs: canvas and array are required.");
		return;
	}

	// 创建灰度矩阵
	// 调用createArray2d函数创建一个与characterCanvas同样大小的二维数组grayScaleMatrix，这个数组用于存储灰度值。
	let matrix = [];

	//遍历pixels数组，每四个元素代表一个像素的RGBA值
	for (let i = 0; i < array.length; i += 4) {
		//计算当前像素的行和列
		// let row = Math.floor(i / (4 * width));
		// let col = (i / 4) % width;
		let row = Math.floor(i / (4 * canvas.width));
		let col = (i / 4) % canvas.width;
		//如果矩阵的第row行不存在，就创建一个空数组
		if (!matrix[row]) {
		  matrix[row] = [];
		}
		//将当前像素的RGBA值存入矩阵的第row行第col列
		matrix[row][col] = Math.floor((
			array[i]+ //R
			array[i + 1]+ //G
			array[i + 2] //B
			)/3);
	  }

	// 返回灰度矩阵
	// 函数执行完毕后，返回填充好的grayScaleMatrix。这个矩阵中的每个元素代表了对应像素的灰度值，范围从0（完全黑）到255（完全白）
	return matrix;
}