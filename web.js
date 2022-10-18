import bodyParser from "body-parser";
import express from "express";
import next from "next";
import { routerSetup } from "./server/routes";

const port = 3306;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    routerSetup(server);

    server.get("/", (req, res) => {
      return app.render(req, res, "/");
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`listening to ${port}`);
    });
  })
  .catch((ex) => {
    console.log(ex.stack);
    process.exit(1);
  });

// import path from "path";
// import dotenv from "dotenv";
// import { routerSetup } from "./server/routes";
// import express, { Application, Request, Response } from "express";
// import bodyParser from "body-parser";
// const app: Application = express();

// dotenv.config();
// const port = process.env.DATABASE_PORT;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// routerSetup(app);

// //포트넘버 설정
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// app.use(express.static(path.join(__dirname, "./build")));

// app.get("/", (req, res) => {
//   res.json({ message: "Hello World!" });
//   res.sendFile(path.join(__dirname, "/public/vercel.svg"));
// });

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./build/index.html"));
// });
