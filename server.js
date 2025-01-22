const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  let onlineUsers = [];

  io.on("connection", (socket) => {
    console.log("connection established", socket.id);

    socket.on('addNewUser', (newUser)=>{
      console.log("new user added", newUser);
      user && !onlineUsers.some(user => user?.userId === newUser._id) && onlineUsers.push({
        userId: newUser._id,
        socketId: socket.id,
        profile: newUser
      });

      io.emit('getAlreadyOnlineUsers', onlineUsers);
    })

    socket.on('disconnect', () => {
      onlineUsers.filter(user => user.userId !== socket.id);

      io.emit('getOnlineUsers', onlineUsers);
    })
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, async() => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});