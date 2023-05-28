const HOST = "http://localhost:5500";
const xmlHttpRequest = new XMLHttpRequest();
let socket;

function setup() {
  createCanvas(600, 600);
  listen();
}

function draw() {
  if (frameCount % 120 == 0) {
    sendMessage();
  }
}

/**
 * 监听服务端的socket消息
 */
function listen() {
  socket = io.connect(HOST);
  socket.on("ServerEvent", (message) => {
    console.log(message);
  });
}

/**
 * 发送请求
 */
function sendMessage() {
  const postData = JSON.stringify({ time: Date.now() });
  xmlHttpRequest.open("POST", HOST + "/message", false);
  xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
  xmlHttpRequest.send(postData);
}
