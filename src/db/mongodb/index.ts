import mongoose from 'mongoose';
import config from 'config';
import log from '../../logger';

function connect(){
    const dbUri = config.get('dbUri') as string;
    mongoose
      .connect(dbUri)
      .then(
        () => {},
        (err) => {
            log.info("MongoDB error", err);
        }
      )
      .catch((err) => {
        log.error("ERROR: ", err);
      });
  
    mongoose.connection.on("connected", () => {
      log.info("Connected to MongoDB!");
    });
  
    mongoose.connection.on("reconnected", () => {
      log.info("MongoDB Reconnected!");
    });
  
    mongoose.connection.on("error", (error) => {
      log.error("Error in MongoDB connection: ", error);
    });
};

export default connect;


  