p5.prototype.ChineseCharacter.prototype.plotCharacter = function (fontSize, fontCanvasSize) {
	this.fontSize = fontSize;
	this.fontCanvasSize = fontCanvasSize;
	
	// Create a p5.Graphics object as a separate canvas
	let characterCanvas = createGraphics(this.fontCanvasSize, this.fontCanvasSize);

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

p5.prototype.ChineseCharacter.prototype.showCharacter = function () {
	image(this.characterCanvas, 0, 0);
}
