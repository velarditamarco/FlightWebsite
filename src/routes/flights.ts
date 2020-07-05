
import express = require("express");
import { Request, Response, NextFunction } from "express";
import {IFlight, Flight} from '../models/Flight';
import {Error} from 'mongoose'
import {FlightsService} from '../services/flightsService'
import verifyToken from "../middleware/tokenHandler";
import authorizeAdminRole from "../middleware/rolesHandler";

const _service = new FlightsService();

class FlightsController{

    public router = express.Router();

    constructor(){
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get('/', this.Get);
        this.router.get('/:id', this.GetByID);
        this.router.post('/',verifyToken, authorizeAdminRole, this.Create);
        this.router.put('/',verifyToken, authorizeAdminRole, this.Edit);
        this.router.delete('/:id',verifyToken, authorizeAdminRole, this.Delete);
      }

    public Get(req : Request, res : Response, next : NextFunction) : void{    

        _service.Get(req.query)
        .then(flights => res.json(flights));
      }

    public GetByID(req : Request, res : Response, next : NextFunction):void{
        _service.GetBy(req.params.id)
        .then(flight => res.json(flight))
        .catch(err => next(err));
    }

    public Create(req : Request, res : Response, next : NextFunction) : void{
        _service.Create(req.body)
        .then(() => res.json('Flight created'))
        .catch(err => next(err));         
    }

    public Edit(req : Request, res : Response, next : NextFunction) : void{
        _service.Update(req.body)
        .then(() => res.json('Flight updated'))
        .catch(err => next(err));
    }

    public Delete(req : Request, res : Response, next : NextFunction) : void{
       _service.Delete(req.params.id)
       .then(() => res.json('Flight deleted'))
       .catch(err => next(err));
    }
}

export default new FlightsController().router;