import app from '../src/app';
import chai from 'chai';
import chaiHttp = require('chai-http');
import dataContext from '../src/dbConnection'
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

 export class TestManager {
    public chai : Chai.ChaiStatic;

    public app : Express.Application;

    public ctx = dataContext ;

    constructor(){
        this.chai = chai; 
        this.chai.use(chaiHttp);
        this.app = app;
    }

    public openConn():void{
        this.ctx.Connect();
    }

    public closeConn():void{
        this.ctx.disconnect();
    }
}

