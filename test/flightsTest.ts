import { TestManager } from './testManager';

class flightsTest extends TestManager {

  constructor(){
    super();
    before(() => this.openConn())
    after(() => this.closeConn())
  }

    public CheckCount() : void{
      const arrayCount : number = 7; 
      describe('Flights API Request', () => {      
        it('should return response on call', () => {
          return this.chai.request(this.app).get('/api/flights')
            .then(res => {
              this.chai.expect(res.body.length).equal(arrayCount);
            })
        })
      })
    }

    public CheckItem():void{
      const item = {
        "_id": "5ef8c12d8b30793cccfd7170",
        "departurePlace": "Amsterdam",
        "arrivalPlace": "Milan",
        "departureDate": "20-01-2020",
        "ArrivalDate": "20-01-2020",
        "code": "pino15",
        "price": "5",
        "__v": 0
    }
      describe('Flights API Request', () => {      
        it('should return response on call', () => {
          return this.chai.request(this.app).get('/api/flights/5ef8c12d8b30793cccfd7170')
            .then(res => {
              this.chai.expect(res.body._id).equal(item._id);
            })
        })
      })
    }

  }

  export default new flightsTest();

