p5.prototype.ChineseCharacter = class {
	constructor(character, fontName) {
		this.character = character;
		this.fontName = fontName;
		this.defaultConfig = p5.prototype.ChineseCharacter.prototype.defaultConfig;
	}
}