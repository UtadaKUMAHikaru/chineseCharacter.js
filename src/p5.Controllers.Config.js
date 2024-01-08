p5.prototype.ChineseCharacter.prototype.defaultConfig = {
	IMAGE_SIZE: 1200,
	NUM_POINTS: 10000,
	NUM_MID_POINTS: 100,
	NUM_CIRCLES: 40,
	SCALE_FACTOR: 1,
	PIXEL_THRESHOLD: 0,
	AMPLITUDE_RANGE: Array.from({
		length: 19
	}, (_, i) => i + 1),
	TRIM_DIRECTION: [0],
	MIN_RADIUS: 20,
	MAX_TRIM_RATIO: 0.3,
	FONT_FILE_PATH: "Assets/方正楷体简体.ttf",
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