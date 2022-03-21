import * as express from "express";

import ConverterController from "../controllers/converter.controller";


class ApiRoutes {
  public router: express.Router;  
  public converterCtrl: ConverterController;
 
  constructor() {
   
    this.converterCtrl = new ConverterController();    
    this.router = express.Router();
    this.init();
  }

  init() {
    const prefix = "/api/";

    

    // User Controller
    this.router.get(prefix + "user/findById", this.converterCtrl.findById);
    // this.router.post(prefix + "user/findAll", this.userCtrl.findAll);
    // this.router.post(prefix + "user/create", this.userCtrl.create);
    // this.router.post(prefix + "user/update", this.userCtrl.update);
    // this.router.post(prefix + "user/delete", this.userCtrl.remove);


   
  }
}

export default new ApiRoutes();
