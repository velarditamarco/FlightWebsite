import mongoose, {Schema, Document} from 'mongoose'
import {handleE11000} from '../middleware/errorHandler'


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

  
  
FlightSchema.post('save', handleE11000); 
FlightSchema.post('findOneAndUpdate', handleE11000);

export const Flight = mongoose.model<IFlight>('Flight', FlightSchema);


