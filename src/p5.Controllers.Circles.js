p5.prototype.ChineseCharacter.prototype.plotConcentricCircles = function (
    numCircles = NUM_CIRCLES,  // 同心圆数量，默认为全局常量NUM_CIRCLES
    minRadius = 20,            // 最小半径，默认为20
    maxRadius = Math.min(WIDTH, HEIGHT) / 2,  // 最大半径，默认为WIDTH和HEIGHT的较小者的一半
    numPoints = NUM_POINTS     // 每个椭圆上的点数，默认为全局常量NUM_POINTS
) {
    const centerX = this.canvasSize / 2;
    const centerY = this.canvasSize / 2;

    // 创建ConcentricCircles的实例，使用传入的参数或默认值
    this.backgroundCircles = new ConcentricCircles(numCircles, minRadius, maxRadius, numPoints, centerX, centerY);
    let {
        circlesCanvas,
        circlesArray
    } = this.backgroundCircles.draw();
    this.circlesArray = circlesArray;
    this.circlesCanvas = circlesCanvas;

    this.ellipsePoints = this.backgroundCircles.ellipsePoints;

    this.circlesGrayScaleMatrix = convertArrayToGrayScaleMatrix(this.circlesCanvas, this.circlesArray);
}

p5.prototype.ChineseCharacter.prototype.showConcentricCircles = function () {
	// Use the canvas or pixels as you wish
	image(this.circlesCanvas, 0, 0); // For example, draw the canvas to the main display
}
