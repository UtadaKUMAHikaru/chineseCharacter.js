p5.prototype.ChineseCharacter.prototype.defaultConfig = {
	IMAGE_SIZE: 2400,
	FONT_CANVAS_SIZE: 400,
	FONT_SIZE: 300,

	NUM_POINTS: 10000,
	NUM_MID_POINTS: 200, // 100 1000
	NUM_CIRCLES: 200, // 50 400
	MIN_RADIUS: 0, // 20
	PIXEL_THRESHOLD: 0,
	AMPLITUDE_RANGE: Array.from({
		length: 19
	}, (_, i) => (i + 1) * 10),
	TRIM_DIRECTION: [0],
	MAX_TRIM_RATIO: 0.3,
	FONT_FILE_PATH: "Arial", // 
	TRIM_STRATEGIES: {
		'linear': (angle, max_trim_ratio) => max_trim_ratio * angle,
		'sin_cos': (angle, max_trim_ratio) => max_trim_ratio * (Math.sin(angle) + Math.cos(angle)) / 2,
		'sin': (angle, max_trim_ratio) => max_trim_ratio * Math.sin(angle),
		'cos': (angle, max_trim_ratio) => max_trim_ratio * Math.cos(angle),
		'cos_2': (angle, max_trim_ratio) => max_trim_ratio * (Math.cos(angle) / 2),
		'tan': (angle, max_trim_ratio) => max_trim_ratio * Math.tan(angle),
		'power': (angle, max_trim_ratio) => max_trim_ratio * Math.pow(angle, 0.1),
		'exp_log': (angle, max_trim_ratio) => max_trim_ratio * (Math.exp(angle) + Math.log(Math.max(Math.abs(angle), 1e-6))) / 2,
		'exp': (angle, max_trim_ratio) => max_trim_ratio * Math.exp(angle),
		'log': (angle, max_trim_ratio) => max_trim_ratio * Math.log(Math.max(Math.abs(angle), 1e-6)),
		'log_2': (angle, max_trim_ratio) => max_trim_ratio * (Math.log(Math.max(Math.abs(angle), 1e-6)) / 2),
	}
};

p5.prototype.ChineseCharacter.prototype.plotAllStrategiesAndAmplitudes = function () {
	const strategies = Object.keys(this.defaultConfig.TRIM_STRATEGIES); // 获取所有修剪策略
	const amplitudes = this.defaultConfig.AMPLITUDE_RANGE; // 获取所有振幅参数
	const maxTrimRatio = this.defaultConfig.MAX_TRIM_RATIO;
	const trimDirection = this.defaultConfig.TRIM_DIRECTION;

	for (let row = 0; row < 6; row++) {
		for (let col = 0; col < 6; col++) {
			let strategy = strategies[row * 6 % strategies.length]; // 当前策略
			let amplitude = amplitudes[col * 6 % amplitudes.length]; // 当前振幅参数

			// 应用修剪策略和振幅参数
			this.trimSegments(this.defaultConfig.TRIM_STRATEGIES[strategy], amplitude, maxTrimRatio, trimDirection);

			// 绘制修剪后的同心圆
			this.plotTrimmedSegments(Math.floor(random(this.kolors.length)));

			// 在画布上显示修剪后的同心圆
			this.showTrimmedSegments(
				// row * this.defaultConfig.IMAGE_SIZE / numRows, 
				// col * this.defaultConfig.IMAGE_SIZE / numCols);
				row * this.defaultConfig.FONT_CANVAS_SIZE,
				col * this.defaultConfig.FONT_CANVAS_SIZE);
		}
	}
}