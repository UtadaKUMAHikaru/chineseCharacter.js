// class ChineseCharacter {
// 	constructor(character, fontSize, fontName, canvasSize) {
// 		this.character = character;
// 		this.fontSize = fontSize;
// 		this.fontName = fontName;
// 		this.canvasSize = canvasSize;
// 		// 注意这里我们不直接调用plotCharacter
// 	}
// }

// p5.prototype.ChineseCharacter = ChineseCharacter;


p5.prototype.ChineseCharacter = class  {
	constructor(character, fontSize, fontName, canvasSize) {
		this.character = character;
		this.fontSize = fontSize;
		this.fontName = fontName;
		this.canvasSize = canvasSize;
		// 注意这里我们不直接调用plotCharacter
	}
}

