
import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'
import config from '../helper/config'
//import jwt from 'jsonwebtoken'; 

const verifyToken = async (req : any, res : Response, next : NextFunction) => {
    const token = req.cookies.token || '';
    try {
      if (!token) {
        return res.status(401).json('You need to Login')
      }
      const decrypt = await jwt.verify(token, config.secret);
      req.userID = decrypt;

      next();
    } catch (err) {
      return res.status(500).json(err.toString());
    }
  };

  export default verifyToken;