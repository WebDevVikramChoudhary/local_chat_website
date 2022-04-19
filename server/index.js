// importing
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

// express and port
const app = express();
const port = 4500 || process.env.PORT;

// user
const users = [{}];

// used for inter communication between url
app.use(cors());
// get req  on 4500 page
app.get("/", (req, res) => {
  res.send("hello its working ");
});

// sever
const server = http.createServer(app);
// socketIo server
const io = socketIO(server);
// whene serckit is on
io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);
    socket.broadcast.emit("userJoined", {
      user: "Admine",
      message: ` ${users[socket.id]} has joined`
    });
    socket.emit("welcome", {
      user: "Admin",
      message: ` welcome to the chat  ${users[socket.id]}`
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnected", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: ` ${users[socket.id]} has left`
    });
    console.log(`user left`);
  });
});

// listening on port 4500 and showing
server.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
