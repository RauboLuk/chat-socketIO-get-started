const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  let user = undefined;

  socket.on("nickname", (nickname) => {
    user = nickname;
  });

  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", `${user}: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit("chat message", `${user} disconnected`);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
