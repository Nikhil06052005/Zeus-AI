import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
export const googleAuth=async (req,res)=>{
try {
    const {name,email,avatar}=req.body
    console.log("Google Auth Request:", {name, email})
    
    if(!email){
        return res.status(400).json({
            message:"email is required"
        })
    }
    let user=await User.findOne({email})
    if(!user){
      console.log("Creating new user:", email)
      user=await User.create({name,email,avatar})
      console.log("User created successfully:", user._id)
    }else{
      console.log("User already exists:", user._id)
    }
    const token=await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge:7*24*60*60*1000
    })

    return res.status(200).json(user)
} catch (error) {
    console.error("Google Auth Error:", error)
    return res.status(500).json({message:`google auth error: ${error.message}`})
}
}


export const logOut=async (req,res)=>{
try {
     res.clearCookie("token",{
        httpOnly:true,
        secure:true,
        sameSite:"none"
    })

    return res.status(200).json({message :"log out successfully"})
} catch (error) {
    return res.status(500).json({message:`log out error ${error}`})
}
}
