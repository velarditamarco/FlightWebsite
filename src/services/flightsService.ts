import { Flight, IFlight } from "../models/Flight";
import CustomError from '../helper/customError'


export interface IFlightsService{
    Get(filters : object): Promise<IFlight[]>; 

    GetBy(id : string): Promise<IFlight>; 

    Create(model : IFlight): Promise<void>;

    Update(model : IFlight): Promise<void>;

    Delete(id : string): Promise<void>;
}

export class FlightsService implements IFlightsService{

    public async Update(model: IFlight): Promise<void> {
         const flightToUpdate = await Flight.findByIdAndUpdate(model._id, model);

         if (!flightToUpdate)
            throw new CustomError(404, 'Flight not found');

        await flightToUpdate;
    }

    public async Create(model : IFlight): Promise<void>{
        const flight = await Flight.findOne({code : model.code});

        if (flight)
            throw new CustomError(400,'there is already a flight registrated with this code : ' + model.code);
        
        const flightToCreate : IFlight = new Flight(model);

        await flightToCreate.save();
    }

    public async Delete(id: string): Promise<void> {
        const user = await Flight.findByIdAndDelete(id);

        if (!user)
            throw new CustomError(404, 'Flight not found');

        await user;
    }

    public async Get(filters : object): Promise<IFlight[]> {
        return await Flight.find().where(filters);
    }

    public async GetBy(id : string): Promise<IFlight>{
        const user = await Flight.findById(id);

        if (!user)
            throw new CustomError(404, 'Flight not found');

        return await user;
    }

}