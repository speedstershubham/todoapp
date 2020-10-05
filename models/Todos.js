const mongoose = require("mongoose")

const TodosSchema = new mongoose.Schema({
    Name:{
        type:String
    },

},{timestamps:true}
);
module.exports = mongoose.model("Todos",TodosSchema)
