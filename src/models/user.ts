import mongoose, {Schema, Document} from 'mongoose'
import { handleE11000} from '../middleware/errorHandler'

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
    hostelBooked : [{type : Schema.Types.ObjectId, ref : 'Hostel'}],
    password : {type : String, required : true, minlength : 6},
    role : {type: String, default : 'USER'},
    registrationDate: { type: Date, default: Date.now }
    
})

UserSchema.post('save', handleE11000); 
UserSchema.post('findOneAndUpdate', handleE11000);

export const User = mongoose.model<IUser>('User', UserSchema);


