class ConcentricCircles {
    constructor(_numCircles, _minRadius, _maxRadius, _numPoints, _centerX, _centerY) {
      this.numCircles = _numCircles || 10;
      this.minRadius = _minRadius || 20;
      this.maxRadius = _maxRadius || 100;
      this.numPoints = _numPoints || 100;
      this.centerX = _centerX || width / 2;
      this.centerY = _centerY || height / 2;
      this.ellipsePoints = {};
    }
  
    getEllipsePoints(centerX, centerY, radiusX, radiusY, numPoints) {
      let points = [];
      for (let i = 0; i < numPoints; i++) {
        let angle = TWO_PI * i / numPoints;
        let x = centerX + radiusX * cos(angle);
        let y = centerY + radiusY * sin(angle);
        points.push(createVector(x, y));
      }
      return points;
    }
  
    draw() {
      // Create a p5.Graphics object as a separate canvas
      let circlesCanvas = createGraphics(width, height);
  
      // Set graphics characteristics
      circlesCanvas.noFill();
      circlesCanvas.stroke(0);
  
      for (let i = 0; i < this.numCircles; i++) {
        let radius = this.minRadius + i * (this.maxRadius - this.minRadius) / this.numCircles;
        this.ellipsePoints[i] = this.getEllipsePoints(this.centerX, this.centerY, radius, radius, this.numPoints);
        circlesCanvas.ellipse(this.centerX, this.centerY, radius * 2, radius * 2);
      }
  
      // Extract pixel array from the graphics object
      circlesCanvas.loadPixels();
      let pixelsArray = circlesCanvas.pixels; // This is the array representation of your graphics
  
      // Return the graphics object and its pixel array
      return {
        circlesCanvas: circlesCanvas,
        circlesArray: pixelsArray
      };
    }
  }
  
  p5.prototype.ConcentricCircles = ConcentricCircles;
  

