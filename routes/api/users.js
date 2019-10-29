//@login & register
const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require("jsonwebtoken")
const keys = require('../../config/keys')
const passport = require('passport')

const User = require('../../models/users')
//$route  get api/users/test
//@desc 返回请求的json数据
//@access public 
router.get('/test',(req,res)=>{
  res.json({mes:"login"})
})


//$route  post api/users/register
//@desc 返回请求的json数据
//@access public
router.post('/register',(req,res,next) => {
  // console.log(res.dody)
  // res.send('hello world')
  // console.log(req.body.email)
  User.findOne({email:req.body.email})
  .then((user) => {
    if(user) {
      return res.json(
      {
        mes:'邮箱已被注册hhhh',
        status:300,
      })
    }else {
      const avatar = gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'})

      const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        avatar,
        indentity:req.body.indentity,
        password:req.body.password
      })
      bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
          if(err) throw err
          newUser.password = hash
          newUser.save()
            .then(user => res.json(user))
            .catch(err =>{console.log(err)})
        })
      })
    }
  })
})

//$route  post api/users/login
//@desc 返回 tocken jwt passport
//@access public
router.post('/login',(req,res)=>{
  const email = req.body.email
  const password = req.body.password
  //查询数据库
  User.findOne({email})
    .then((user) => {
      // console.log(user)
      if(!user) {
        return res.status(400).json({
          mes:'用户不存在',
          status:300,
        })
      }
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if(isMatch) {
            const rule = {id:user.id,name:user.name,avatar:user.avatar,indentity:user.indentity}
            jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) => {
              if(err) throw err
              res.json({
                mes:'登录成功',
                status:200,
                token:"Bearer " +token
              })
            })
            // return res.json({msg:"success"})
          }else {
            return res.json({
              mes:'密码错误',
              status:300,
            })
          }
        })

    })
  // console.log(re)
})

//$route  get api/users/current
//@desc 返回 return current user
//@access private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
  res.json({
    id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    indentity:req.user.indentity
  })
})


// router.get('/register',(req,res) => {
//   res.json({w:1})
//   console.log(res.body)
// })
module.exports = router