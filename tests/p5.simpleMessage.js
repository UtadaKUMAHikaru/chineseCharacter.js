// p5.simpleMessage.js - A very basic p5.js library using class

class SimpleMessage {
    constructor(_message, _x, _y, _width, _height) {
        this.message = _message || "Hello, World!";
        this.x = _x || 20;
        this.y = _y || 20;
        this.width = _width || 200; // width of the graphic
        this.height = _height || 50; // height of the graphic

        // Create a p5.Graphics object
        this.gfx = createGraphics(this.width, this.height);
        this.gfx.textSize(32);
        this.gfx.fill(0);
        this.gfx.text(this.message, 0, this.gfx.height / 2); // setting message in the graphics object
    }

    display() {
        // Display the graphics object at the specified location
        // 在p5.js中，createGraphics()确实是用于创建一个新的图形缓冲区，也就是一个新的画布（不同于主画布）。但这个“新的画布”不会自动显示在主画布上；它存在于内存中，作为一个可以绘制的独立的图形对象。要在主画布上显示这个新创建的画布，你需要使用image()函数。这就是为什么虽然文本是在this.gfx（一个p5.Graphics对象）上绘制的，你仍然可以在主画布上看到它。
        image(this.gfx, this.x, this.y);
    }
}

p5.prototype.SimpleMessage = SimpleMessage;
