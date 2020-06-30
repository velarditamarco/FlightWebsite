
import express from "express";
import { Request, Response, NextFunction } from "express";
import { UserService} from '../services/userService'
import verifyToken from '../middleware/tokenHandler'

const _service = new UserService();

class UsersController{
    public router = express.Router();

    constructor(){
        this.initializeRoute();
    }

    public initializeRoute() : void{
        this.router.post('/registration', this.Post);
        this.router.post('/authentication', this.Authenticate);
        this.router.put('/',verifyToken, this.Put);
        this.router.delete('/:id',verifyToken, this.Delete);
        this.router.get('/',verifyToken, this.Get);
        this.router.get('/:id',verifyToken, this.GetById);
        this.router.put('/logout', this.logout);
    }

    public Get(req : Request, res: Response, next : NextFunction) : void{
        _service.Get().then(users => res.json(users))
    }

    public GetById(req : Request, res: Response, next : NextFunction){
        _service.GetBy(req.params.id).then(user => {
            res.json(user);
        })
        .catch(err => next(err))
    }

    public Put(req : Request, res: Response, next : NextFunction): void{
        _service.Update(req.body)
        .then(() => res.json('User updated'))
        .catch(err => next(err));
    }

    public Authenticate(req : Request, res: Response, next : NextFunction): void{
        _service.Authenticate(req.body)
        .then(response => {
            res.cookie('token', response.token);
            res.cookie('role', response.user.role);
            res.json(response)
        })
        .catch(err => next(err));
    }

    public Post(req : Request, res : Response, next: NextFunction) : void{

        _service.Registration(req.body)
        .then(() => {
            res.json('registration complete')
        })
        .catch(err => next(err))
        
       
    }

    public Delete(req : Request, res: Response, next : NextFunction):void{
        _service.Delete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => next(err));
    }

    public logout(req: Request, res : Response, next: NextFunction):void {
        res.cookie('token', '');
        res.cookie('role', '');
        res.json('Logout');
    }
}

export default new UsersController().router;
