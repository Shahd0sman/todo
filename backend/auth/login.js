const data=require('../db')
const express=require('express')
const login=express.Router()
const userRepo=data.getRepositry('user')
login.post('/login',async(req,res)=>{
    try {
         const {email,password}=req.body
         const user=await userRepo.findOneBy(email)
         const match=await bcrypt.compare(password,user.password)
         if(!user){
         res.status(404).json({
            message:'wrong email or password'
         })
         }else if(!match){
            res.status(404).json({
                message:'wrong email or password'
            })
         }else{
            res.status(200).json({
                message:'logged in successfully',
                username:user.name
            })
         }

    } catch (error) {
        res.status(500).json({
            serverError:error
        })
        
    }
})