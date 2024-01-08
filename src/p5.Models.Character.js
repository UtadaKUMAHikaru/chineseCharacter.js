p5.prototype.ChineseCharacter = class {
	constructor(character, fontName) {
		this.character = character;
		this.fontName = fontName;
		this.defaultConfig = p5.prototype.ChineseCharacter.prototype.defaultConfig;
	}
}

p5.prototype.SegmentInfo = class {
	constructor(radius, segments) {
		this.radius = radius;
		this.segments = segments || []; // 每个段的信息，包含进入和离开角度
	}

	// 添加一个新的段
	addSegment(enteringAngle, leavingAngle) {
		this.segments.push({
			enteringAngle,
			leavingAngle
		});
	}
}