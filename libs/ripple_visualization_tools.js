// Define a function to visualize segments with transparency
function visualizeSegmentsWithTransparency(originalWidth, originalHeight, segments, scaleFactor, enableTransparency = true) {
    createCanvas(originalWidth, originalHeight);
    background(0, 0, 0, 0); // Set background to transparent

    // Loop through each segment and draw
    for (let ellipse in segments) {
        let segList = segments[ellipse];
        segList.forEach(segment => {
            if (segment.length > 1) {
                // Segment color
                let color = [random(255), random(255), random(255)];

                for (let i = 0; i < segment.length - 1; i++) {
                    // Compute transparency
                    let alpha = enableTransparency ? 255 * (1 - i / (segment.length - 1)) : 255;
                    stroke(color[0], color[1], color[2], alpha); // Set stroke color with alpha
                    strokeWeight(1); // Set stroke weight

                    // Scale points and draw line
                    let p1 = createVector(segment[i][0] / scaleFactor, segment[i][1] / scaleFactor);
                    let p2 = createVector(segment[i + 1][0] / scaleFactor, segment[i + 1][1] / scaleFactor);
                    line(p1.x, p1.y, p2.x, p2.y); // Draw line between points
                }
            }
        });
    }
}