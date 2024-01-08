// 绘制椭圆点
function drawEllipsePoint(x, y) {
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

// 假设labels是之前通过connectedComponentsWithStats获得的标签矩阵
// i是你想要找的标记值

function findAllPointsWithLabels(labels) {
    // 假设labels有一个属性 maxLabel 表示最大的标签值
    let maxLabel = labels.maxLabel || 50;  // 假设最大标签是10，或者根据实际情况获取
    let points = {};
    
    // 预先为每个可能的标签创建空数组
    for (let i = 0; i <= maxLabel; i++) {
        points[i] = [];
    }

    for (let y = 0; y < labels.rows; y++) {
        for (let x = 0; x < labels.cols; x++) {
            let label = labels.intPtr(y, x)[0];
            points[label].push({ x: x, y: y });
        }
    }

    return points;
}
