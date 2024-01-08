let myMessage;

function setup() {
  createCanvas(400, 400);
  myMessage = new SimpleMessage("Hello p5.js!", 50, 50, 300, 100); // 创建一个消息实例
}

function draw() {
  background(200);
  myMessage.display(); // 显示消息
}

