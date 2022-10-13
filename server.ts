import path from "path";
import dotenv from "dotenv";
import { routerSetup } from "./server/routes";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

dotenv.config();
const port = process.env.DATABASE_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routerSetup(app);

//포트넘버 설정
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(path.join(__dirname, "./build")));

app.get("/", (res) => {
  res.json({ message: "Hello World!" });
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.get("*", (res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});
