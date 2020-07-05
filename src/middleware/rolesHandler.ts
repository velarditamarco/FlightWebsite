import {Request, Response, NextFunction} from 'express'
import {UserService} from '../services/userService'
import config from '../helper/config'

const authorizeAdminRole = (req : any, res: Response, next: NextFunction) => {
        if (process.env.NODE_ENV?.trim() !== 'test' && (!req.user.role || req.user.role !== config.roles.ADMIN))
            return res.status(401).json('Unauthorizated');
        else
            next(); 
}

export default authorizeAdminRole;