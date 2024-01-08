const IMAGE_SIZE = 800; // 400 1200
const NUM_POINTS = 10000; // 1000 10000
const NUM_CIRCLES = 40; // 40, 70, 100, 200
const WIDTH = IMAGE_SIZE;
const HEIGHT = IMAGE_SIZE;
const MAX_RADIUS = Math.min(WIDTH, HEIGHT) / 2;

const SCALE_FACTOR = 1; // Super sampling ratio

const PIXEL_THRESHOLD = 0;

// Adjust parameter range and step
const AMPLITUDE_RANGE = Array.from({
	length: 19
}, (_, i) => i + 1); // From 1 to 19, step 1

const TRIM_DIRECTION = [0]; // [0], [0, 1, 2], [0, 2], [1, 2], [1], [0, 1]

const MIN_RADIUS = 50; // 60
const MAX_TRIM_RATIO = 0.3; // 0.3
const FONT_FILE_PATH = "Assets/方正楷体简体.ttf";

// Defining different trimming strategies
let TRIM_STRATEGIES = {
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