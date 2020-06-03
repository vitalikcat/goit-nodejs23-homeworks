require = require("esm")(module);
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import contactRouter from "./contacts/contact.router";

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddleWares();
    this.initRoutes();
    await this.initDataBase();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddleWares() {
    this.server.use(express.json());
  }

  initRoutes() {
    this.server.use("/contacts", contactRouter);
  }

  async initDataBase() {
    await mongoose
      .connect(MONGODB_URL, { useUnifiedTopology: true })
      .then(() => console.log("Database connection successful"))
      .catch((error) => {
        console.log("Error: ", error);
        process.exit(1);
      });
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log("Server is listening on port: ", PORT);
    });
  }
}

export default Server;
