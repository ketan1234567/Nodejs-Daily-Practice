const mongoose=require('mongoose')
 const connectDB= async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/company_db")
        console.log("MonogoDB_connection Sucessfully");
    } catch (error) {
        console.log("MonogoDB_connection failed",error.message);
    }
      
 }
module.exports = connectDB;