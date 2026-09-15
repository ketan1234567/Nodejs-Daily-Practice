const mongoose = require("mongoose");

const UserSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim: true,
    },
        email:{
        type:String,
        required:true,
          trim: true,
    },
        password:{
        type:String,
        required:true,
          trim: true,
       
    },
        role:{
        type:String,
        enum:["admin","user"],
        default:"user"
       
          
    },
        status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
       
    },

},{
    timestamps:true
}

)

const User=mongoose.model("User",UserSchema);

module.exports=User