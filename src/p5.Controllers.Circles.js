p5.prototype.ChineseCharacter.prototype.plotConcentricCircles = function (
	numCircles,
	minRadius, // 最小半径，默认为20
	maxRadius, // 最大半径，默认为WIDTH和HEIGHT的较小者的一半
	numPoints // 每个椭圆上的点数，默认为全局常量NUM_POINTS
) {
	this.numCircles = numCircles;
	this.minRadius = minRadius;
	this.maxRadius = maxRadius;
	this.numPoints = numPoints;
	this.centerX = this.canvasSize / 2;
	this.centerY = this.canvasSize / 2;

	this.ellipsePoints = {};

	// Create a p5.Graphics object as a separate canvas
	let circlesCanvas = createGraphics(width, height);
	// 这句话非常重要！！！！！！

	circlesCanvas.pixelDensity(1);

	console.log(`createGraphics width ${width}, height ${height}`)

	// Set graphics characteristics
	circlesCanvas.noFill();
	circlesCanvas.stroke(0);

	for (let i = 0; i < this.numCircles; i++) {
		let radius = this.minRadius + i * (this.maxRadius - this.minRadius) / this.numCircles;
		this.ellipsePoints[i] = this.getEllipsePoints(this.centerX, this.centerY, radius, radius, this.numPoints);
		circlesCanvas.ellipse(this.centerX, this.centerY, radius * 2, radius * 2);
	}

	// Extract pixel array from the graphics object
	circlesCanvas.loadPixels();
	let circlesArray = circlesCanvas.pixels; // This is the array representation of your graphics

	this.circlesArray = circlesArray;
	this.circlesCanvas = circlesCanvas;

	this.circlesGrayScaleMatrix = convertArrayToGrayScaleMatrix(this.circlesCanvas, this.circlesArray);
}

p5.prototype.ChineseCharacter.prototype.showConcentricCircles = function () {
	// Use the canvas or pixels as you wish
	image(this.circlesCanvas, 0, 0); // For example, draw the canvas to the main display
}

p5.prototype.ChineseCharacter.prototype.getEllipsePoints = function (centerX, centerY, radiusX, radiusY, numPoints) {
	let points = [];
	for (let i = 0; i < numPoints; i++) {
		let angle = TWO_PI * i / numPoints;
		let x = centerX + radiusX * cos(angle);
		let y = centerY + radiusY * sin(angle);
		points.push(createVector(x, y));
	}
	return points;
}