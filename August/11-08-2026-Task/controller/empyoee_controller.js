const db=require('../config/db')

const getData=async(req,res)=>{
    try {
        const [result]=await db.query("SELECT * FROM employees")
        res.status(200).json(result)
  
    } catch (error) {
        console.log(error);
        
        
    }
}

const saveData=async(req,res)=>{
    try {
        const {name,salary}=req.body
        const [result]=await db.query("INSERT INTO employees (name,salary) Values(?,?)",[name,salary])

        //console.log(result);

        if (result.affectedRows==1) {
            res.status(200).json({
                message:"data sucessfully saved",
                data:result
            })
        }
       // res.status(200).json(result)
  
    } catch (error) {
        console.log(error);
        
        
    }
}

const updateData=async(req,res)=>{
    try {
         const id=parseInt(req.params.id)
         const {name,salary}=req.body
        const [result]=await db.query("UPDATE employees SET name=?,salary=? WHERE id=?",[name,salary,id])
        //console.log(result);

        if (result.affectedRows==1) {
            res.status(200).json({
                message:"Updated Data sucessfully"
               // data:result
            })
        }
       // res.status(200).json(result)
  
    } catch (error) {
        console.log(error);
        
        
    }
}

const delete_data=async(req,res)=>{
    try {
        const {name,salary}=req.body
                 const id=parseInt(req.params.id)
        const [result]=await db.query("DELETE INTO employees (name,salary) Values(?,?)",[name,salary])

        //console.log(result);

        if (result.affectedRows==1) {
            res.status(200).json({
                message:"data sucessfully deleted",
                data:result
            })
        }
       // res.status(200).json(result)
  
    } catch (error) {
        console.log(error);
        
        
    }
}



module.exports={getData,saveData,updateData,delete_data}