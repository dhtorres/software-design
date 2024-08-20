import express from "express";
import bodyParser from "body-parser";
import { appRoutes } from "../routes/index";
import morgan from "morgan";
import cors from "cors";

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors());
appRoutes(server);

export { server };
