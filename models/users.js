const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  avatar:{
    type:String,
  },
  indentity:{
    type:String,
    require:true
  },
  data:{
    type:Date,
    default:Date.now
  }
})

module.exports = users = mongoose.model("users",UserSchema)