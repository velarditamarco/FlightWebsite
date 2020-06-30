import { NextFunction, Request, Response } from "express";
import customErr from '../helper/customError'

 export const errorHandler = (err : any, req : Request, res : Response, next : NextFunction) =>  {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.isCustomError){
         // custom application 
        return res.status(err.StatusCode).json({message : err.Message});
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error

        let errorsArray : any = []
        let keys = Object.keys(err.errors)
        for(let i = 0; i < keys.length; i++)
            errorsArray.push(err.errors[keys[i]].message)

        return res.status(400).json({errors : errorsArray});
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}
