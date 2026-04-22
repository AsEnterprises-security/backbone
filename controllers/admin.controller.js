import jwt from 'jsonwebtoken'
import Gallary from '../models/gallary.model.js'

export const adminlogin = async (req,res)=>{
    try {
        const {email,password} = req.body
        if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.json({success:true,message:"Login successful",token})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const getAllImageAdmin = async (req,res)=>{
    try {
        const images = await Gallary.find({}).sort({createdAt:-1})
        res.json({success:true,images})
    } catch (error) {
       res.json({success:false,message:error.message}) 
    }
}

export const getDashboard= async(req,res)=>{
    try {
        const recentImages = await Gallary.find({}).sort({createdAt:-1}).limit(5)
        const images = await Gallary.countDocuments()
        const drafts = await Gallary.countDocuments({isPublished:false})

        const dashboardData = {recentImages,images,drafts}
        res.json({success:true,dashboardData})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

