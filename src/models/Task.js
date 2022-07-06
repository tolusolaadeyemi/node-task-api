const mongoose = require('mongoose');

//helps us set the structure for our documents (tasks) in mongodb
const TaskSchema = new mongoose.Schema({
    name:{
        //some basic validators
        type:String,
        required:[true,'must provide name'],
        trim:true,
        maxlength:[20, 'name cannot exceed 20 characters']

    },
    completed:{
        type:Boolean,
        default:false
    },
})

module.exports = mongoose.model('Task', TaskSchema)