import { Flight, IFlight } from "../models/Flight";
import customError from '../helper/customError'


export interface IFlightsService{
    Get(filters : object): Promise<IFlight[]>; 

    GetBy(id : string): Promise<IFlight>; 

    Create(model : IFlight): Promise<void>;

    Update(model : IFlight): Promise<void>;

    Delete(id : string): Promise<void>;
}

export class FlightsService implements IFlightsService{

    public async Update(model: IFlight): Promise<void> {
         await Flight.findByIdAndUpdate(model._id, model);
    }

    public async Create(model : IFlight): Promise<void>{
        const flight = await Flight.findOne({code : model.code});

        if (flight)
            throw new customError(400,'there is already a flight registrated with this code : ' + model.code);
        
        await model.save();
    }

    public async Delete(id: string): Promise<void> {
        const user = await Flight.findByIdAndDelete(id);

        if (!user)
            throw new customError(404, 'Flight not found');

        await user;
    }

    public async Get(filters : object): Promise<IFlight[]> {
        return await Flight.find().where(filters);
    }

    public async GetBy(id : string): Promise<IFlight>{
        const user = await Flight.findById(id);

        if (!user)
            throw new customError(404, 'Flight not found');

        return await user;
    }

}