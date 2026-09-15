const mongoose = require("mongoose");

const BlogSchema= new mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim: true,
    },
        content:{
        type:String,
        required:true,
          trim: true,
    },
        author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
          required:true,
       
    },
        category:{
        type:String,
        required:true,
          trim: true,
    },
        status:{
        type:String,
        enum:["Draft","Published"],
        default:"Draft"
       
    },

},{
    timestamps:true
}

)

const Blog=mongoose.model("Blog",BlogSchema);

module.exports=Blog