import app from '../src/app';
import chai from 'chai';
import chaiHttp = require('chai-http');
import dataContext from '../src/dbConnection'
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

 export class TestManager {
    protected chai : Chai.ChaiStatic;

    protected app : Express.Application;

    protected ctx = dataContext ;

    private  userCredentials = {
        email: 'sponge@bob.com', 
        password: 'garyTheSnail'
      }

    constructor(){
        this.chai = chai; 
        this.chai.use(chaiHttp);
        this.app = app;
    }
}

