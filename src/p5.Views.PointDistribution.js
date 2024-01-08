// 绘制椭圆点
function plotEllipsePoint(x, y) {
	push(); // Start a new drawing state
	stroke(255, 0, 0); // Set stroke to red color
	strokeWeight(5); // Set stroke weight
	point(x, y); // Draw a point at the position
	pop(); // Restore original state
}

// 统计并输出局部掩码的像素值分布
function matDistribution(mat) {
	// 初始化一个数组来存储每个可能的像素值的出现次数
	let distribution = new Array(256).fill(0);

	// 遍历 mat 的每个像素
	for (let y = 0; y < mat.rows; y++) {
		for (let x = 0; x < mat.cols; x++) {
			// 获取当前像素的值（这里假设是灰度图像）
			let val = mat.ucharPtr(y, x)[0];
			// 统计每个像素值的出现次数
			distribution[val]++;
		}
	}

	// 输出分布到控制台
	console.log("Local Mask Value Distribution:");
	distribution.forEach((count, val) => {
		if (count > 0) {
			console.log(`Value ${val}: ${count} times`);
		}
	});
}

// 统计并输出characterGrayScaleMatrix的像素值分布
function grayScaleMatrixDistribution(grayScaleMatrix) {
	// 初始化一个数组来存储每个可能的像素值的出现次数
	let distribution = new Array(256).fill(0);

	// 获取grayScaleMatrix的行数和列数
	let rows = grayScaleMatrix.length;
	let cols = rows > 0 ? grayScaleMatrix[0].length : 0;
	console.log(`rows ${rows}, cols ${cols}`);

	// 遍历grayScaleMatrix的每个像素
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			// 获取当前像素的灰度值
			let val = grayScaleMatrix[y][x]; // Assuming it's already a gray value
			// 统计每个像素值的出现次数
			distribution[val]++;
		}
	}

	// 输出分布到控制台
	console.log("GrayScale Matrix Value Distribution:");
	distribution.forEach((count, val) => {
		if (count > 0) {
			console.log(`Value ${val}: ${count} times`);
		}
	});
}

// 可视化grayScaleMatrix的分布
function visualizeGrayScaleMatrix(grayScaleMatrix) {
	// 获取矩阵的行数和列数
	let rows = grayScaleMatrix.length;
	let cols = rows > 0 ? grayScaleMatrix[0].length : 0;

	// 创建与grayScaleMatrix同样大小的p5图像
	let img = createImage(cols, rows);
	img.loadPixels();

	// 遍历grayScaleMatrix的每个像素
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			// 获取当前像素的灰度值
			let val = grayScaleMatrix[y][x];
			// 设置img的对应像素
			let index = (x + y * cols) * 4;
			img.pixels[index] = val; // 灰度值用于红色分量
			img.pixels[index + 1] = val; // 灰度值用于绿色分量
			img.pixels[index + 2] = val; // 灰度值用于蓝色分量
			img.pixels[index + 3] = 255; // alpha值设置为255，完全不透明
		}
	}

	// 更新img的像素并绘制到主画布上
	img.updatePixels();
	image(img, 0, 0); // 在画布上绘制图像
}
