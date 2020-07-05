import flightsTest from './flightsTest'
import usersTest from './usersTest'
import dataContext from '../src/dbConnection'

process.env.NODE_ENV = 'test'

beforeEach(done => {
    dataContext.Connect();
    done();
    
})

afterEach(done => {
    dataContext.disconnect();
    done();
})

// FLIGHTS TESTS
flightsTest.Get();
flightsTest.GetByID();
flightsTest.Create();
flightsTest.Edit();
flightsTest.Delete();

// USERS TEST

usersTest.Get();
usersTest.GetByID();
usersTest.Create();
usersTest.Edit();
usersTest.Delete();




