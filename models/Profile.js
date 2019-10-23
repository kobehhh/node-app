const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ProfileSchema = new Schema({
  type:{
    type:String
  },
  describe:{
    type:String
  },
  income:{
    type:String,
    required:true
  },
  expend:{
    type:String,
    required:true
  },
  cash:{
    type:String,
    required:true
  },
  // indentity:{
  //   type:String,
  //   require:true
  // },
  remark:{
    type:Date,
    default:Date.now
  }
})

module.exports = Profile = mongoose.model("profile",ProfileSchema)