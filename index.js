require = require("esm")(module);
import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./contact/contacts.routes";

const PORT = 3000;

export default class Server {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(morgan("combined"));
  }

  initRoutes() {
    this.server.use("/api/contacts", contactsRouter);
  }

  startListening() {
    this.server.listen(PORT, (error) => {
      if (error) {
        return console.log("something bad happened", error);
      }
      console.log("Server is runnig on port: ", PORT);
    });
  }
}
