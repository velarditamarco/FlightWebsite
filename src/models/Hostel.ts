import mongoose, {Schema, Document} from 'mongoose'
import { handleE11000} from '../middleware/errorHandler'
import hostels from '../routes/hostels';
import { IRoom } from './Room';

export  interface IHostel extends Document{
    name : string,
    city : string,
    rooms : Array<Schema.Types.ObjectId>
}


const HostelSchema : Schema = new Schema({
    name : {type : String, required : true},
    city : {type : String, required : true},
    rooms : [{type : Schema.Types.ObjectId, ref : 'Room'}]
    
})

HostelSchema.post('save', handleE11000); 
HostelSchema.post('findOneAndUpdate', handleE11000);

export const Hostel = mongoose.model<IHostel>('Hostel', HostelSchema);


