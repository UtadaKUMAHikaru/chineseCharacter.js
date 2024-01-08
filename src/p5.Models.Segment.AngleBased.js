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

