import express from "express";
import * as bodyParser from "body-parser"; 
import routes from './routes/index';
import cors from "cors";
import {errorHandler} from './middleware/errorHandler'
import cookie from 'cookie-parser'



class ApplicationContainer {
  public app: express.Application;

  constructor() {
    this.app = express(); 
    this.config();
  }

  private config(): void {
    
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false }));

    this.app.use(cors());

    this.app.use(cookie());
    
    this.app.use("/api", routes);

    this.app.use(errorHandler);

  }
}

export default new ApplicationContainer().app;