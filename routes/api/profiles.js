//@login & register
const express = require("express")
const router = express.Router()
const passport = require('passport')

const Profile = require('../../models/Profile')
//$route  get api/profiles/test
//@desc 返回请求的json数据
//@access public 
router.get('/test',(req,res)=>{
  res.json({mes:"profile"})              
})


//$route  get api/profiles/add
//@desc 创建信息接口
//@access pravite 
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const profileFileds = {}
  console.log(req.body)
  if(req.body.type) profileFileds.type = req.body.type
  if(req.body.describe) profileFileds.describe = req.body.describe
  if(req.body.income) profileFileds.income = req.body.income
  if(req.body.expend) profileFileds.expend = req.body.expend
  if(req.body.cash) profileFileds.cash = req.body.cash
  if(req.body.remark) profileFileds.type = req.body.remark

  new Profile(profileFileds).save()
    .then((profile) => {
      res.json(profile)
    })
})


//$route  get api/profiles/
//@desc 获取所有信息
//@access pravite
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
  Profile.find()
    .then(profile => {
      if(!profile) return res.status(400).json("没有内容")
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})


//$route  get api/profiles/:id
//@desc 获取单个信息
//@access pravite
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
  console.log(req)
  Profile.findOne({_id:req.params.id})
    .then(profile => {
      if(!profile) return res.status(400).json("没有内容")
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

//$route  get api/profiles/edit/:id
//@desc 编辑信息
//@access pravite
router.get('/edit/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
  const profileFileds = {}
  if(req.body.type) profileFileds.type = req.body.type
  if(req.body.describe) profileFileds.describe = req.body.describe
  if(req.body.income) profileFileds.income = req.body.income
  if(req.body.expend) profileFileds.expend = req.body.expend
  if(req.body.cash) profileFileds.cash = req.body.cash
  if(req.body.remark) profileFileds.type = req.body.remark
  Profile.findOneAndUpdate(
    {_id:req.params.id},
    {$set:profileFileds},
    {new:true}
  ).then((profile) => res.json(profile))
})


//$route  get api/profiles/delete/:id
//@desc 删除信息
//@access pravite
router.get('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
  Profile.findOneAndRemove({_id:req.params.id})
    .then(profile => {
      profile.save().then(profile => {
        res.json(profile)
      }).catch(err => {
        res.status(404).json("删除失败")
      })
    })
})



// router.get('/register',(req,res) => {
//   res.json({w:1})
//   console.log(res.body)
// })
module.exports = router