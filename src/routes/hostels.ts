
import express = require("express");
import { Request, Response, NextFunction } from "express";
import {HostelsService} from '../services/hostelsService'
import verifyToken from "../middleware/tokenHandler";
import authorizeAdminRole from "../middleware/rolesHandler";

const _service = new HostelsService();

class HostelsController{

    public router = express.Router();

    constructor(){
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get('/',verifyToken, this.Get);
        this.router.get('/:id',verifyToken, this.GetByID);
        this.router.post('/',verifyToken, authorizeAdminRole, this.Create);
        this.router.post('/room', verifyToken, authorizeAdminRole, this.CreateRoom);
        this.router.put('/',verifyToken, authorizeAdminRole, this.Edit);
        this.router.put('/room', verifyToken, authorizeAdminRole, this.UpdateRoom);
        this.router.delete('/:id',verifyToken, authorizeAdminRole, this.Delete);
        this.router.delete('/room/:id', verifyToken, authorizeAdminRole, this.DeleteRoom);
      }

    public Get(req : Request, res : Response, next : NextFunction) : void{    

        _service.Get(req.query)
        .then(hostels  => res.json(hostels));
      }

    public GetByID(req : Request, res : Response, next : NextFunction):void{
        _service.GetBy(req.params.id)
        .then(hostel => res.json(hostel))
        .catch(err => next(err));
    }

    public Create(req : Request, res : Response, next : NextFunction) : void{
        _service.Create(req.body)
        .then(() => res.json('Hostel created'))
        .catch(err => next(err));         
    }

    public Edit(req : Request, res : Response, next : NextFunction) : void{
        _service.Update(req.body)
        .then(() => res.json('Hostel updated'))
        .catch(err => next(err));
    }

    public Delete(req : Request, res : Response, next : NextFunction) : void{
       _service.Delete(req.params.id)
       .then(() => res.json('Hostel deleted'))
       .catch(err => next(err));
    }

    public CreateRoom(req : Request, res : Response, next : NextFunction): void{
        _service.CreateRoom(req.body)
        .then(() => res.json('Room created'))
        .catch(err => next(err));
    }

    public UpdateRoom(req : Request, res : Response, next : NextFunction): void{
        _service.UpdateRoom(req.body)
        .then(() => res.json('Room updated'))
        .catch(err => next(err));
    }

    public DeleteRoom(req : Request, res : Response, next : NextFunction): void{
        _service.DeleteRoom(req.params.id)
        .then(() => res.json('Room deleted'))
        .catch(err => next(err));
    }
}

export default new HostelsController().router;