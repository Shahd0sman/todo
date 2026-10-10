const bcrypt=require('bcrypt')
const data=require('../db')
const express=require('express')
const register=express.Router()
const userRepo=data.getRepository('user')
register.post('/register',async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const find=userRepo.findOneBy({email})
        if(find){
            res.status(404).json({
                message:'email already exist'
            })
        }
      const salt=await bcrypt.genSalt(10)
      const hash=await bcrypt.hash(password,salt)
      const user=userRepo.create({
        name,email,password:hash
      })
      const save=await userRepo.save(user)
      res.status(201).json({
        message:'user added',
        username:name
      })

    } catch (error) {
        res.status(500).json({
            message:`server error: ${error}`
        })
        
    }
})
module.exports=register