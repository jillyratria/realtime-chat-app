import { createServer } from "http";
import { Server } from "socket.io";
import chalk from "chalk";

const log = console.log;

// const error = chalk.bold.red;
const warning = chalk.hex("#FFA500"); // Orange color
const success = chalk.green;

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  log(success("Client connected"));

  socket.on("send_message", (message) => {
    // Broadcast the message to all connected clients
    io.emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    log(warning("Client disconnected"));
  });
});

httpServer.listen(3001, () => {
  log(success("WebSocket server running on port 3001"));
});
