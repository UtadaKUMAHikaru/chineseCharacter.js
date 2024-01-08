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

	// 这里不需要再次更新 characterCanvas 成员变量，因为它在实际上已经被invertColors函数直接修改了
};
