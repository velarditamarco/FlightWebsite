import { User, IUser } from "../models/user";
import config from "../helper/config";
import customError from '../helper/customError'
import bycript from 'bcryptjs';
import jwt from 'jsonwebtoken';


class AuthenticationResponse {
    public user : IUser; 

    public token : string; 

    constructor(user : IUser, token : string){
        this.user = user; 
        this.token = token;
    }
}

export interface IUserService{
    Get(): Promise<IUser[]>; 

    GetBy(id : string): Promise<IUser>; 

    Authenticate(model : IUser): Promise<AuthenticationResponse>;

    Registration(model : IUser): Promise<void>;

    Update(model : IUser): Promise<void>;

    Delete(id : string): Promise<void>;
}

export class UserService implements IUserService{

    public async Authenticate(model: any): Promise<AuthenticationResponse> {
        const user = await User.findOne({email : model.email});

        if (!user) 
            throw new customError(404, 'invalid Email');

        if (!bycript.compareSync(model.password, user.password))
            throw new customError(400, 'invalid password');

        const token = jwt.sign({ user : user}, config.secret);

        const response : AuthenticationResponse = {
            user : user.toJSON(),
            token: token
        }

        return response;     
    }

    public async Registration(model: IUser): Promise<void> {

        const user = await User.findOne({email : model.email});

        if (user)
            throw new customError(400,'user already registrated with this email : ' + model.email);

        const newUser : IUser = new User(model);

        if (newUser.password)
            newUser.password = bycript.hashSync(newUser.password);
        
        await newUser.save();
    }

    public async Update(model: IUser): Promise<void> {
        await User.findByIdAndUpdate(model._id, model);
    }

    public async Delete(id: string): Promise<void> {
        const user = await User.findByIdAndDelete(id);

        if (!user)
            throw new customError(404, 'User not found');

        await user;
    }

    public async Get(): Promise<IUser[]> {
        return await User.find();
    }

    public async GetBy(id : string): Promise<IUser>{
        const user = await User.findById(id);

        if (!user)
            throw new customError(404, 'User not found');

        return await user;
    }

}