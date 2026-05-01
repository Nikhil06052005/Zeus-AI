import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    userName:{
        type:String,
        sparse:true,
        unique:true
    },
    avatar:{
        type:String
    },
    credits:{
        type:Number,
        default:100,
        min:0
    },
    plan:{
        type:String,
        enum:["free","pro","enterprise"],
        default:"free"
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema)

// Drop old indexes if they exist
User.collection.dropIndex("userName_1").catch(() => {})

export default User