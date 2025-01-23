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
    console.log("Connection established", socket.id);

    socket.on('addNewUser', (newUser) => {
      console.log("New user added", newUser);

      if (Object.keys(newUser).length > 0 && !onlineUsers.some(user => user.userId === newUser._id)) {
        onlineUsers.push({
          userId: newUser._id,
          socketId: socket.id,
          profile: newUser
        });

        // Send the updated list of online users to the newly connected client
        socket.emit('getAlreadyOnlineUsers', onlineUsers);

        // Notify all other clients about the new user
        socket.broadcast.emit('newUserJoin', {
          userId: newUser._id,
          socketId: socket.id,
          profile: newUser
        });
      }
    });

    socket.on('disconnect', () => {
      console.log("User disconnected", socket.id);

      // Remove the disconnected user from the online users list
      onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);

      // Notify all other clients about the disconnection
      socket.broadcast.emit('userDisconnect', { socketId: socket.id });
    });
  });


  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, async () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});