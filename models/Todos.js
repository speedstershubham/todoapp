const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;


const TodosSchema = new mongoose.Schema({
    Name:{
        type:String
    },
    User:{
        type:ObjectId,
           ref:"Users",
          
  },
},{timestamps:true}
);
module.exports = mongoose.model("Todos",TodosSchema)
