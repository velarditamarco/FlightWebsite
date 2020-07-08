import mongoose, {Schema, Document} from 'mongoose'
import { handleE11000} from '../middleware/errorHandler'

export  interface IRoom extends Document{
    number : number, 
    beds : number,
    price : number,
    photoPat : string,
    hostelID : string
}


const RoomSchema : Schema = new Schema({
    number : {type : Number, required : true},
    beds : {type : Number, required : true},
    price : {type : Number, required : true},
    photoPath : {type : String},
    hostelID : {type : Schema.Types.ObjectId, ref : 'Hostel'}
})

RoomSchema.post('save', handleE11000); 
RoomSchema.post('findOneAndUpdate', handleE11000);

export const Room = mongoose.model<IRoom>('Room', RoomSchema);


