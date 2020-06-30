import Mongoose from "mongoose";
import Config from "./helper/config";

class DataContext {
    public database : Mongoose.Connection;

    constructor(){
        this.database = Mongoose.connection;
    }

    public Connect() : void{

        Mongoose.connect(Config.connectionString, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            });

        this.database.once("open", async () => {
            console.log("Connected to database");
          });

        this.database.on("error", () => {
            console.log("Error connecting to database");
          });
    }

    public disconnect() : void{
        if (!this.database) {
            return;
          }
          Mongoose.disconnect();
    }
}

export default new DataContext();