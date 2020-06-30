import mongoose, {Schema, Document, HookNextFunction, Error} from 'mongoose'
import { NextFunction, ErrorRequestHandler } from 'express';

export  interface IUser extends Document{
    name : string,
    surname : string,
    email : string,
    age : number,
    cardDetails : string,
    flightsBooked : []
    flightsTerminated : [],
    password : string,
    role : string,
    registrationDate : Date
}


const UserSchema : Schema = new Schema({
    name : {type : String, required : true},
    surname : {type : String, required : true},
    email : {type : String, required : true},
    age : Number,
    cardDetails : {type : String, default : 'xxx'},
    flightsBooked : [{type : Schema.Types.ObjectId, ref : 'Flight'}],
    flightsTerminated : [{type : Schema.Types.ObjectId, ref : 'Flight'}],
    password : {type : String, required : true, minlength : 6},
    role : {type: String, required : true},
    registrationDate: { type: Date, default: Date.now }
    
})

export const User = mongoose.model<IUser>('User', UserSchema);


