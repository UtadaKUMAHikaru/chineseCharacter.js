// Defining the function to split segment if large angle difference
function splitSegmentIfLargeAngleDiff(segment, threshold = Math.PI) {
    let splitSegments = []; // Storing all subsegments after splitting
    let currentSegment = [segment[0][0]]; // Initialize with the first point of the segment

    // Looping through each point in the segment
    for (let i = 1; i < segment.length; i++) {
		// Calculating the angle difference between adjacent points
        let angleDiff = Math.abs(segment[i][1] - segment[i - 1][1]);
        console.log("angleDiff: ", angleDiff);
        // If the angle difference is greater than the threshold
        if (angleDiff > threshold) {
            splitSegments.push(currentSegment); // Consider the current segment complete and add to splitSegments
            currentSegment = [segment[i][0]]; // Start a new segment from the current point
        } else {
            currentSegment.push(segment[i][0]); // Otherwise, add the current point to the current segment
        }
    }

    // Handling the remaining current segment
    if (currentSegment.length > 0) {
        splitSegments.push(currentSegment); // Add the last segment if it's not empty
    }

    // Returning the split segments
    return splitSegments; // An array containing all subsegments after splitting
}


// function visualizeSegmentsWithSupersampling(originalWidth, originalHeight, segments, scaleFactor, supersamplingFactor = 3) {
//     const largeWidth = originalWidth * supersamplingFactor;
//     const largeHeight = originalHeight * supersamplingFactor;

//     // Prepare the canvas and context for drawing
//     const canvas = document.getElementById('canvas');
//     canvas.width = largeWidth;  // Set canvas size to large dimensions for supersampling
//     canvas.height = largeHeight;
//     const ctx = canvas.getContext('2d');

//     // Set background to black
//     ctx.fillStyle = 'black';
//     ctx.fillRect(0, 0, largeWidth, largeHeight);

//     // Draw each segment
//     ctx.strokeStyle = 'white';
//     ctx.lineWidth = supersamplingFactor;  // Adjust line width based on supersampling factor
//     for (let ellipse in segments) {
//         segments[ellipse].forEach(segment => {
//             if (segment.length > 1) {
//                 // Scale and draw each segment
//                 ctx.beginPath();
//                 let scaledSegment = segment.map(point => ({
//                     x: point[0] / scaleFactor * supersamplingFactor,
//                     y: point[1] / scaleFactor * supersamplingFactor
//                 }));
//                 ctx.moveTo(scaledSegment[0].x, scaledSegment[0].y); // Move to the start of the segment
//                 scaledSegment.forEach(point => ctx.lineTo(point.x, point.y)); // Draw lines through segment points
//                 ctx.stroke();
//             }
//         });
//     }

//     // Resizing canvas to original dimensions with supersampling effect using drawImage
//     const finalCanvas = document.createElement('canvas');
//     finalCanvas.width = originalWidth;
//     finalCanvas.height = originalHeight;
//     const finalCtx = finalCanvas.getContext('2d');
//     finalCtx.drawImage(canvas, 0, 0, largeWidth, largeHeight, 0, 0, originalWidth, originalHeight);

//     // Replacing the large canvas with the resized one
//     canvas.parentNode.replaceChild(finalCanvas, canvas);
// }
