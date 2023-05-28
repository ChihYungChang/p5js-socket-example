const PORT = 5500;

const express = require("express");
const app = express();

const server = app.listen(PORT);
app.use(express.static("client"));
console.log("Node.js Express server running on port " + PORT);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
  next();
});

const socket = require("socket.io");
const io = socket(server);
io.sockets.on("connection", newSocketConnection);

function newSocketConnection(socket) {
  console.log("*** New connection to server web socket " + socket.id);
}

let count = 0;

app.post("/message", function (request, response) {
  console.log("收到了来自 client 的消息");
  console.log(request.body);

  count++;

  response.end("");
});

setInterval(() => {
  io.sockets.emit("ServerEvent", `当前统计前端请求次数：${count}`);
}, 2000);
