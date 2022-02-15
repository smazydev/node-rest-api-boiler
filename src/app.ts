import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/mongodb";
import cors from 'cors';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { router } from "./routes/spreadsheet.router";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const corsOption = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOption))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, host, () => {
  log.info(`Server listening at http:${host}:${port}`);
  connect();
});


io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);
  
    socket.on("comments", (data) => {
      const {id} = data;
      socket.to(id).emit("comments", data);
    });
  
    socket.on("room-id", (id) => {
      socket.join(id);
      socket.data.roomID = id;
      const clients = io.sockets.adapter.rooms.get(id) as any;
      console.log("CLIENTS HERE", clients)
      if (!((clients === undefined) && (clients === null))) {
        let clientArr = Array.from(clients);
        console.log(clientArr);
        io.in(id).emit("clients", clientArr);
      }
    });
  
    socket.on("load-data", (data) => {
      console.log(data);
      socket.to(socket.data.roomID).emit("load-data", data);
    });
  
    socket.on("cell-selected", (data) => {
      const id = socket.id;
      socket.to(id).emit("cell-selected", { id: id, data: data });
    });
  
    socket.on("cells-selected", (data) => {
      socket.to(socket.data.roomID).emit("cells-selected", {id:socket.id,data:data});
    });
  
    socket.on("cell-edited", (data) => {
      socket.to(socket.data.roomID).emit("cell-edited", data);
    });
  
    socket.on("cell-style", (data) => {
      socket.broadcast.emit("cell-style", data);
    });
  
    socket.on("add-sheet", (data) => {
      socket.to(socket.data.roomID).emit("add-sheet", data);
    });
  
    socket.on("change", (sData) => {
      const { id, data } = sData;
      socket.to(id).emit("change", data);
    });
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
      const clients = io.sockets.adapter.rooms.get(socket.data.roomID);
      io.in(socket.data.roomID).emit("client-arr", {
        id: socket.id,
        clients: clients,
      });
    });
  });
  

