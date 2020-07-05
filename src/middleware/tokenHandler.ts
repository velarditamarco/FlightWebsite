
import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'
import config from '../helper/config'
//import jwt from 'jsonwebtoken'; 

const verifyToken = async (req : any, res : Response, next : NextFunction) => {

    if (process.env.NODE_ENV && process.env.NODE_ENV?.trim() !== 'test'){
     
      const authHeader = req.headers.authorization || '';

      try {

        if (!authHeader) {
          return res.status(401).json('Authorization header is required')
        }

        let headersPart = authHeader.trim().split(' ');
        let token = headersPart.pop();

        await jwt.verify(token, config.secret, (err : any, decoded : any) => {
          if (err) return res.status(401).json(err.message);

          req.user = decoded.user    
          next();     
        });
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    else
      next();
  };

  export default verifyToken;