import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app); //REVIEW  create http serer first !  to attach socket.io 

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// REVIEW Enable message sending to a particular person we need its room id called socket id here 
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

//REVIEW  used to store online users
const userSocketMap = {}; //REVIEW {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId; //REVIEW query from the frontend  

  if (userId) userSocketMap[userId] = socket.id;   //REVIEW -  mapping user id with socket id  eg A :1 

  //REVIEW  io.emit() is used to send events to all the connected clients

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //REVIEW - This runs when browser is closed, tab is closed , app refreshes 
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
