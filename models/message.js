const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
var autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(process.env.MONGODB_URI || 'mongodb://localhost/myDatabase');

autoIncrement.initialize(connection);
const clientSchema = new Schema({
  
   name : String ,
   message : String
   
});

 
clientSchema.plugin(autoIncrement.plugin, 'client');
var client = connection.model('Book', clientSchema);

const modelClass = mongoose.model("client",clientSchema);
module.exports = modelClass;