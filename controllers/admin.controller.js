import jwt from 'jsonwebtoken'

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