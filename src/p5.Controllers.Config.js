

const VisualizationConfig = (function() {
    // 私有变量，只在这个函数内部可见
    const IMAGE_SIZE = 1200;
    const WIDTH = IMAGE_SIZE;
    const HEIGHT = IMAGE_SIZE;

    const NUM_POINTS = 10000;
    const NUM_CIRCLES = 40;

    const SCALE_FACTOR = 1;
    const PIXEL_THRESHOLD = 0;

    const AMPLITUDE_RANGE = Array.from({ length: 19 }, (_, i) => i + 1);
    const TRIM_DIRECTION = [0];

    const MIN_RADIUS = 50;
    const MAX_TRIM_RATIO = 0.3;
    const FONT_FILE_PATH = "Assets/方正楷体简体.ttf";

    const TRIM_STRATEGIES = {
        // 定义不同的trimming策略
        // ...
    };

    // 公开接口，返回一个对象
    return {
        IMAGE_SIZE,
        WIDTH,
        HEIGHT,
        NUM_POINTS,
        NUM_CIRCLES,
        SCALE_FACTOR,
        PIXEL_THRESHOLD,
        AMPLITUDE_RANGE,
        TRIM_DIRECTION,
        MIN_RADIUS,
        MAX_TRIM_RATIO,
        FONT_FILE_PATH,
        TRIM_STRATEGIES
    };
})();

// 使用配置
// console.log(VisualizationConfig.IMAGE_SIZE);  // 1200
