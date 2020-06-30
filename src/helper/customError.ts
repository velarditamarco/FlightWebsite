

export default class CustomError{
    public StatusCode : number; 

    public isCustomError : boolean = true; 

    public Message : string; 

    constructor(status:number, message:string){
        this.StatusCode = status; 
        this.Message = message;
    }
}