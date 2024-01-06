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





// Adjust parameter range and step
const AMPLITUDE_RANGE = Array.from({length: 19}, (_, i) => i + 1);  // From 1 to 19, step 1

const TRIM_DIRECTION = [0]; // [0], [0, 1, 2], [0, 2], [1, 2], [1], [0, 1]

const NUM_POINTS = 10000;
const MIN_RADIUS = 50; // 60
const MAX_TRIM_RATIO = 0.3; // 0.3
const IMAGE_SIZE = 800;
const NUM_CIRCLES = 100; // 70, 100, 200
const SCALE_FACTOR = 2;  // Super sampling ratio
// FONT_FILE_PATH might not be directly applicable in JS, as it depends on how you use it (e.g., in canvas or CSS)
// const FONT_FILE_PATH = "Assets/GenJyuuGothic-Medium.ttf";  
const FONT_FILE_PATH = "Assets/方正楷体简体.ttf";  

const THRESHOLD = 0;
const WIDTH = IMAGE_SIZE;
const HEIGHT = IMAGE_SIZE;
const MAX_RADIUS = Math.min(WIDTH, HEIGHT) / 2;





character = "樂"
let ellipse_points = {} ;


