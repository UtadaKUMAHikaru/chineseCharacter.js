class ChineseCharacter {
	constructor(character, fontSize, fontName, canvasSize) {
		this.character = character;
		this.fontSize = fontSize;
		this.fontName = fontName;
		this.canvasSize = canvasSize;
		// 注意这里我们不直接调用drawCharacterOnGraphics
	}
}

p5.prototype.ChineseCharacter = ChineseCharacter;
