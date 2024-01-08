// 把一个线段分成若干个子线段，如果相邻的点之间的角度差超过了一个阈值。阈值默认是π，也就是180度。 
function splitSegmentIfLargeAngleDiff(segment, threshold = Math.PI) { // 两个参数，segment和threshold。segment是一个数组，它包含了线段上的点的坐标和角度，例如[[x1, y1, a1], [x2, y2, a2], ...]。threshold是一个数，它表示角度差的最大允许值，如果没有给定，就默认是π。
    let splitSegments = []; // 声明一个变量splitSegments，它是一个空数组，用来存储分割后的子线段。
    let currentSegment = [segment[0][0]]; // 存储当前正在处理的子线段。它初始化为只包含第一个点的坐标的数组，例如[x1, y1]。

    // 开始一个循环，从第二个点开始，遍历线段上的每一个点。i是循环的索引，它表示当前点在segment数组中的位置。
    for (let i = 1; i < segment.length; i++) {
		// 计算相邻的两个点之间的角度差，用绝对值表示。segment[i][1]是当前点的角度，segment[i - 1][1]是前一个点的角度。angleDiff是一个数，它表示角度差的大小。
        let angleDiff = Math.abs(segment[i][1] - segment[i - 1][1]);
        // 判断angleDiff是否大于threshold，如果是，就说明当前点和前一个点之间的角度差太大，需要分割线段
        if (angleDiff > threshold) {
            splitSegments.push(currentSegment); // 把currentSegment数组添加到splitSegments数组中，表示当前的子线段已经完成，存储起来
            currentSegment = [segment[i][0]]; // 重新初始化currentSegment数组，只包含当前点的坐标，表示开始一个新的子线段。
        } else {
            currentSegment.push(segment[i][0]); // if语句的另一种情况，如果angleDiff不大于threshold，就说明当前点和前一个点之间的角度差还可以接受，不需要分割线段。
        } // 把当前点的坐标添加到currentSegment数组中，表示继续延长当前的子线段。
    } // 结束if语句和for循环

    // 开始处理剩余的currentSegment数组，如果它的长度大于0，就说明还有一个子线段没有存储到splitSegments数组中。
    if (currentSegment.length > 0) {
        splitSegments.push(currentSegment); // 把currentSegment数组添加到splitSegments数组中，表示存储最后一个子线段
    } // 结束if语句。

    // 返回splitSegments数组，它是一个包含了所有分割后的子线段的数组，每个子线段也是一个数组，包含了点的坐标。这两句也是结束函数的定义。
    return splitSegments; // An array containing all subsegments after splitting
}

