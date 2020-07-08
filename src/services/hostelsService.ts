import { Hostel, IHostel } from "../models/Hostel";
import customError from '../helper/customError'
import { IRoom, Room} from "../models/Room";
import CustomError from "../helper/customError";

export interface IHostelsService{
    Get(filters : object): Promise<IHostel[]>; 

    GetBy(id : string): Promise<IHostel>; 

    Create(model : IHostel): Promise<void>;

    Update(model : IHostel): Promise<void>;

    Delete(id : string): Promise<void>;
}

export interface IRoomService{
    CreateRoom(model : IRoom): Promise<void>; 

    UpdateRoom(model : IRoom): Promise<void>;

    DeleteRoom(id : string): Promise<void>;
}

export class HostelsService implements IHostelsService, IRoomService{

    public async Update(model: IHostel): Promise<void> {
         const hostelToUpdate = await Hostel.findByIdAndUpdate(model._id, model);

         if (!hostelToUpdate)
            throw new CustomError(404, 'Hostel not found');

        await hostelToUpdate;
    }

    public async Create(model : IHostel): Promise<void>{
        const hostel = await Hostel.findOne({_id : model.id});
     
        if (hostel)
            throw new customError(400,'there is already an hostel registrated with this id : ' + model.id);

        const newHostel : IHostel = new Hostel(model);

        await newHostel.save();
    }

    public async Delete(id: string): Promise<void> {
        const deleteHostel = await Hostel.findByIdAndDelete(id);

        if (!deleteHostel)
            throw new customError(404, 'Hostel not found');

        await deleteHostel;
    }

    public async Get(filters : object): Promise<IHostel[]> {
        return await Hostel.find().where(filters);
    }

    public async GetBy(id : string): Promise<IHostel>{
        const hostel = await Hostel.findById(id).populate('rooms');

        if (!hostel)
            throw new customError(404, 'Flight not found');

        return await hostel;
    }

    public async CreateRoom(model : IRoom):Promise<void>{

        const roomNumber = await Room.findOne({number : model.number, hostelID : model.hostelID });

        if (roomNumber)
            throw new customError(400,'there is already a room registrated with this number : ' + model.number);

        const idExist = await Room.findById(model._id);

        if (idExist)
            throw new CustomError(400, 'ID already exists : ' + model._id);             

        const newRoom : IRoom = new Room(model);
        const createRoom = await newRoom.save();

        const hostelSave = await Hostel.findById({_id : model.hostelID}, (err : Error, hostel : any) => {
            if (hostel && createRoom){
                hostel.rooms.push(newRoom._id);
                hostel.save();
            }
        })

        if (!hostelSave)
            throw new customError(404,'Hostel not found');

        

         await createRoom;
    }

    public async DeleteRoom(id : string):Promise<void>{
        const deleteRoom = await Room.findByIdAndDelete(id);

        if (!deleteRoom)
            throw new CustomError(404, 'Room not found');

        await deleteRoom;
    }

    public async UpdateRoom(model : IRoom):Promise<void>{

        const roomToUpdate = await Room.findByIdAndUpdate(model._id, model);

        if (!roomToUpdate)
            throw new CustomError(400, 'Room not found');

        await roomToUpdate;
    }

}