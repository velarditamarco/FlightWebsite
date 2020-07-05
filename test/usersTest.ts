import { TestManager } from './testManager';
import { assert, expect } from 'chai';
import config from '../src/helper/config'

class flightsTest extends TestManager {

  private Items : Array<any> = []

  private testDbItem = { 
    "_id" : "5efa210ebe51092688cb0191",
    "flightsBooked" : [ ],
    "flightsTerminated" : [ ], 
    "name" : "Marco", 
    "surname" : "Velardita", 
    "email" : "vela......", 
    "role" : "ADMIN", 
    "registrationDate" : "2020-06-29T17:12:46.681Z", 
    "__v" : 0 
  }

  private newItem = {
    
    "name" : "Marco", 
    "surname" : "Velardita", 
    "email" : "vela......", 
    "password" : "ciao",
    "role" : "ADMIN", 
  }

private properties : Array<string> = ["_id","flightsBooked","flightsTerminated","name","surname","email","role", "registrationDate"]

private totalItemCount : number = 2; 

    public Get() : void{ 
      describe('Users API Request', () => {      
        it('should return all users and check them', () => {
          return this.chai.request(this.app).get('/api/users')
            .then(res => {                         
              assert.exists(res.body);
              this.Items = res.body;              
              expect(res.body, 'type').to.be.an('array');
              expect(res.body.length, 'count').equal(this.totalItemCount);
            })
        })
      })
    }

    public GetByID():void{
     
      describe('Users API Request', () => {      
        it('should return item and check its property', () => {
          return this.chai.request(this.app).get('/api/users/5efa210ebe51092688cb0191')
            .then(res => {
              assert.exists(res.body);
              expect(res.body._id, 'id compare').equal(this.testDbItem._id);
              this.properties.forEach( x => expect(res.body).has.property(x));
            })
        })
      })
    }


    public Create():void{    
      describe('Users API Request', () => {
        it('should create item in users db', () => {
          return this.chai.request(this.app).put('/api/users/registration').send(this.newItem)
          .then(res => {
              this.totalItemCount++;
              this.Get();              
          })
        })
      })
    }

    public Edit():void{

      this.testDbItem.email = 'www'

      describe('Users API Request', () => {
        it('should return response on call', () => {
          return this.chai.request(this.app).post('/api/users').send(this.testDbItem)
          .then(res => {
              this.GetByID();              
          })
        })
      })
    }

    public Delete():void{

      let id = this.Items.filter(x => x._id !== this.testDbItem._id)[0];

      describe('Users API Request', () => {
        it('should delete an item in db', () => {
          return this.chai.request(this.app).delete('/api/users/' + id)
          .then(res => {
              this.totalItemCount--;
              this.Get();              
          })
        })
      })
    }
  }

  export default new flightsTest();

