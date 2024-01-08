// 假设labels是之前通过connectedComponentsWithStats获得的标签矩阵
// i是你想要找的标记值

function findAllPointsWithLabels(labels) {
    // 假设labels有一个属性 maxLabel 表示最大的标签值
    let maxLabel = labels.maxLabel || 50;  // 假设最大标签是10，或者根据实际情况获取
    let points = {};
    
    // 预先为每个可能的标签创建空数组
    for (let i = 0; i <= maxLabel; i++) {
        points[i] = [];
    }

    for (let y = 0; y < labels.rows; y++) {
        for (let x = 0; x < labels.cols; x++) {
            let label = labels.intPtr(y, x)[0];
            points[label].push({ x: x, y: y });
        }
    }

    return points;
}
