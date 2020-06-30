import mongoose, {Schema, Document, HookNextFunction, Error} from 'mongoose'
import { NextFunction, ErrorRequestHandler } from 'express';

export  interface IFlight extends Document{
    departurePlace : string,
    arrivalPlace : string,
    departureDate : Date,
    ArrivalDate : Date,
    code : string,
    price : Number
}


const FlightSchema : Schema = new Schema({
    departurePlace : {type : String, required : true},
    arrivalPlace : {type : String, required : true},
    departureDate : {type : String, required : true},
    ArrivalDate : {type : String, required : true},
    code : {type : String, required : true, unique : true},
    price : {type : String, required : true}
})

  let handleE11000 = function(error : any, doc : any, next : HookNextFunction ) {
    if (error.name === 'MongoError' && error.code == 11000) {
        let key = Object.keys(error.keyValue)[0]
        let err = new mongoose.Error(`There is already a ${key} ${error.keyValue[key]} in database`); 
      next(err);
    } else {
      next();
    }
  }; 
  
FlightSchema.post('save', handleE11000); 
FlightSchema.post('findOneAndUpdate', handleE11000);

export const Flight = mongoose.model<IFlight>('Flight', FlightSchema);


