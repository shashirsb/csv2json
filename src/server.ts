import * as bodyParser from "body-parser";
import * as cassandra from "cassandra-driver";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as fs from "fs";
import * as helmet from "helmet";
import * as logger from "morgan";
import * as util from "util";

import ApiRoutes from "./routes/api.routes";

// import ApiRoutes from "./routes/api.routes";

class Server {
  public app: express.Application;
  constructor() {
    // process.env["NODE_CONFIG_DIR"] = __dirname + './dist/src/config'; // "\dist\src\config\config.dev.json";
    // console.log(config.get('ENV'));
    // console.log( process.env["NODE_CONFIG_DIR"]);
    // process.env["NODE_CONFIG_DIR"] = __dirname + "/configDir/";
    this.app = express();
    this.init();

  }

  public init() {
    // const dbConfig = config.get('dbConfig');
    // console.log(dbConfig);
    // this.connectDb();

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(logger("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use("/", ApiRoutes.router);
  }

 
}

// export
export default new Server().app;
