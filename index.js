const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')

const passport = require('passport')
//引入users.js
const users = require("./routes/api/users") 
//引入profile.js
const profiles = require("./routes/api/profiles") 


// const db = require('./config/keys').mongoURI
//使用body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



//连接mongoose
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("success")
});

//passport初始化
app.use(passport.initialize())
require('./config/passport')(passport)

app.get('/',(req,res) => {
  res.send("hello world")
})

module.exports = mongoose;
app.use("/api/users",users)
app.use("/api/profiles",profiles)

const port = process.env.POST || 5000
app.listen(port,() => { 
  console.log("server running on port")
})
