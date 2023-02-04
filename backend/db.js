const mongoose = require("mongoose");

const CONNECTION_URL =
  "mongodb+srv://harman:harman@clusterb.rybns6k.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection successful");
    })
    .catch((err) => console.log("Connection failed"));
};

module.exports = connectToMongo;
