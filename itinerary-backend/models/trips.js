const mongoose = require("mongoose")
const tripsSchema = new mongoose.Schema({
    username:String,
    tripdata:[Object]
})

const trips= mongoose.model('my_trips', tripsSchema)
module.exports=trips