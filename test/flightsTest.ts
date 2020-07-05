import { TestManager } from './testManager';
import { IFlight, Flight } from '../src/models/Flight';
import { assert, expect } from 'chai';

class flightsTest extends TestManager {

  private Items : Array<any> = []

  private testDbItem = {
    "_id": "5ef8c12d8b30793cccfd7170",
    "departurePlace": "Amsterdam",
    "arrivalPlace": "Milan",
    "departureDate": "20-01-2020",
    "ArrivalDate": "20-01-2020",
    "code": "pino15",
    "price": "5",
    "__v": 0
}

private properties : Array<string> = ["_id","departurePlace","arrivalPlace","departureDate","ArrivalDate","code","price"]

private newItem : object = {
    "departurePlace": "XXXX",
    "arrivalPlace": "YYYY",
    "departureDate": "20-01-2020",
    "ArrivalDate": "20-01-2020",
    "code": "pino15",
    "price": "5"
}

private totalItemCount : number = 8; 

    public Get() : void{ 

      describe('Flights API Request', () => {      
        it('should return all flights and check them', () => {
          return this.chai.request(this.app).get('/api/flights')
            .then(res => {
              this.Items = res.body;
              assert.exists(res.body);             
              expect(res.body, 'type and include').to.be.an('array');
              expect(res.body.length, 'count').equal(this.totalItemCount);     
            })
        })
      })
    }

    public GetByID():void{

      describe('Flights API Request', () => {      
        it('should return item and check its property', () => {
          return this.chai.request(this.app).get('/api/flights/5ef8c12d8b30793cccfd7170')
            .then(res => {
              assert.exists(res.body);
              this.Items.push(res.body);
              expect(res.body._id, 'id compare').equal(this.testDbItem._id);
              this.properties.forEach( x => expect(res.body).has.property(x));
            })
        })
      })
    }


    public Create():void{  
      
      let newFlight : IFlight = new Flight(this.newItem);
      
      describe('Flights API Request', () => {
        it('should return response on call', () => {
          return this.chai.request(this.app).post('/api/flights/').send(newFlight)
          .then(res => {
              this.totalItemCount++;
              this.Get();
          })
        })
      })
    }

    public Edit():void{
      describe('Flights API Request', () => {
        it('should edit one flight in db', () => {

          this.testDbItem.code = 'ww22';
          return this.chai.request(this.app).put('/api/flights/').send(this.testDbItem)
          .then(res => {
              this.GetByID();
          })
        })
      })
    }

    public Delete():void{

      let itemId : string = this.Items.filter(x => x._id != this.testDbItem._id)[0];

      describe('Flights API Request', () => {
        it('should delete one flight in db', () => {
          return this.chai.request(this.app).delete('/api/flights/' + itemId).send(this.testDbItem)
          .then(res => {
            this.totalItemCount--;
              this.Get();
          })
        })
      })
    }
  }

  export default new flightsTest();

