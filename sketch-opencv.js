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

// 声明图像变量
let src; // 原始图像
let dst; // 输出图像

// 设置画布和图像
function setup() { // 这是p5.js中定义初始环境设置的函数。它只执行一次。
	createCanvas(400, 400); // 创建一个400x400像素的画布。
	pixelDensity(1); // 设置像素密度为1，这通常用于确保图像在不同显示屏上具有正确的尺寸和清晰度。

	src = new cv.Mat.zeros(height, width, cv.CV_8UC1); // 创建一个新的OpenCV图像矩阵src，大小为画布大小，类型为cv.CV_8UC1（代表8位单通道，通常用于灰度图），并用0填充，即创建一个黑色图像。

	// 第一个矩形的两个对角点
	let point1_1 = new cv.Point(50, 100);
	let point1_2 = new cv.Point(150, 150);

	// 第二个矩形的两个对角点
	let point2_1 = new cv.Point(200, 250);
	let point2_2 = new cv.Point(350, 325);

	// 绘制第一个矩形
	cv.rectangle(src, point1_1, point1_2, [255, 255, 255, 255], -1);

	// 绘制第二个矩形
	cv.rectangle(src, point2_1, point2_2, [255, 255, 255, 255], -1);


	// 准备联通分量分析
	let labels = new cv.Mat(); // 创建一个新的OpenCV矩阵labels，它将用来存储每个像素属于哪个联通分量的标签。
	let stats = new cv.Mat(); // 创建一个新的OpenCV矩阵stats，它将用来存储每个联通分量的统计数据，比如面积大小等。
	let centroids = new cv.Mat(); // 创建一个新的OpenCV矩阵centroids，它将用来存储每个联通分量的质心位置。

	// 进行连通分量分析
	let numComponents = cv.connectedComponentsWithStats(
		src,
		labels,
		stats,
		centroids,
		8,
		cv.CV_32S
	); // 调用OpenCV的函数cv.connectedComponentsWithStats，输入一个二值图像src，输出四个结果：
	// numComponents: 连通分量的个数
	// labels: 一个矩阵，每个元素表示对应像素的连通分量标签
	// stats: 一个矩阵，每一行表示一个连通分量的统计信息，包括边界框、面积等
	// centroids: 一个矩阵，每一行表示一个连通分量的质心坐标
	// 8: 表示使用8邻域来判断像素的连通性
	// cv.CV_32S: 表示使用32位整数类型来存储标签和统计信息

	// 创建一个图像来可视化连通分量
	dst = new cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3); // 创建一个和原图像大小相同的空白图像dst，使用8位无符号整数类型和三通道颜色模式

	// 将连通分量的标签映射到色调值
	let labelHue = Math.floor(180 / numComponents); // 计算每个连通分量的色调值，使用180度的色环，根据连通分量的个数平均分配

	// 要为每个连通分量分配随机颜色
	for (let y = 0; y < labels.rows; y++) { // 遍历标签矩阵的每个元素
		for (let x = 0; x < labels.cols; x++) {
			let label = labels.intPtr(y, x)[0]; // 是获取当前像素的标签值
			if (label == 0) continue; // 判断是否为背景，如果是则跳过
			let hue = label * labelHue % 180; // 根据标签值和色调值计算当前像素的色调
			dst.ucharPtr(y, x)[0] = hue; // 将当前像素的颜色设置为色调、饱和度、亮度的组合，使用HSV颜色空间
			dst.ucharPtr(y, x)[1] = 255;
			dst.ucharPtr(y, x)[2] = 255;
		}
	}

	// 转换颜色空间
	cv.cvtColor(dst, dst, cv.COLOR_HSV2RGB); // 使用OpenCV的cvtColor函数将dst图像从HSV（色相、饱和度、亮度）颜色空间转换到RGB（红、绿、蓝）颜色空间。这通常在图像处理中用于颜色转换，因为某些操作在HSV空间中更简单或直观，但最终需要转换回RGB以便正常显示

	// 清理内存
	labels.delete(); // 删除labels矩阵，释放相关内存。在OpenCV.js中，创建的矩阵不会自动被垃圾回收，因此需要手动释放它们。
	stats.delete(); // 删除stats矩阵，释放相关内存。
	centroids.delete(); // 删除centroids矩阵，释放相关内存。
}

function draw() { // p5.js的一个循环函数，通常用于绘制和动画。在这个例子中，它被用来显示图像。
	background(0); // 设置背景为黑色。在p5.js中，0代表黑色。

	// 加载像素并绘制结果图像
	loadPixels(); // p5.js的函数，用于加载画布的像素数据到pixels数组中，以便进行操作。
	if (dst.isContinuous()) { // 检查dst图像数据是否是连续的。在OpenCV中，连续意味着没有内存对齐问题，可以安全地进行某些像素操作。
		for (let y = 0; y < dst.rows; y++) { // 嵌套循环遍历dst图像的每个像素。外循环遍历每一行。
			for (let x = 0; x < dst.cols; x++) { // 内循环遍历每一列。
				for (let c = 0; c < 3; c++) { // 内部的最内层循环for (let c = 0; c < 3; c++) {：遍历每个像素的RGB颜色通道。
					pixels[(y * width + x) * 4 + c] = dst.data[y * dst.cols * 3 + x * 3 + c]; // 实际上是将dst图像的每个像素值复制到p5.js的pixels数组中。这样做是为了将OpenCV处理过的图像数据传递给p5.js，以便在画布上绘制。注意这里乘以4是因为p5.js的pixels数组包含了RGBA四个通道，即便我们只操作RGB三个通道。
				}
				pixels[(y * width + x) * 4 + 3] = 255; // 设置像素点的透明度。pixels是一个数组，它存储了图像的所有像素点的颜色信息。每个像素点由四个数值表示，分别是红色、绿色、蓝色和透明度，范围都是0到255。y和x是像素点的坐标，width是图像的宽度。(y * width + x) * 4 + 3是一个公式，它可以计算出像素点的透明度在数组中的位置。255是最大的透明度，表示完全不透明。所以，这句代码的意思是，把指定的像素点设置为完全不透明。
			} // 这三个大括号是结束之前的三个循环的标志。循环的作用是遍历图像的所有像素点，并根据一定的条件修改它们的颜色。
		}
	}
	updatePixels(); //updatePixels()是一个函数，它的作用是把修改后的像素数组显示在画布上。这样，我们就可以看到图像的变化。

	noLoop(); // 停止画布的重绘。noLoop()是一个函数，它的作用是让画布只绘制一次，而不是不断地重复绘制。这是因为我们的图像是静态的，不需要动态地变化。如果我们想要让图像动起来，我们可以用loop()函数来恢复重绘。
}