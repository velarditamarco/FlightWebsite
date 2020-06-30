import {Request, Response, NextFunction} from 'express'
import {UserService} from '../services/userService'
import config from '../helper/config'

const authorizeAdminRole = (req : any, res: Response, next: NextFunction) => {
        const role = req.cookies.role || '';

        if (!role || role != config.roles.ADMIN)
            return res.status(401).json('Unauthorizated');

        
        next(); 
}

export default authorizeAdminRole;