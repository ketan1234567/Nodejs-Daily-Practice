const empyoee=[
    {id:1,name:"ketan_deshmukh"},
     {id:2,name:"vishal janu"},
      {id:4,name:"shubham  vetu"},
       {id:5,name:"dhamu kulkarni"}
]

function showEmpyoee(id,callback) {
    const users=empyoee.find(emp=>emp.id===id)

    if (!users) {
        callback(new Error("userid not found"))
        return
    }
    callback(null,users)
}

showEmpyoee(0,(error,data)=>{
    if (error) {
        console.log(error.message);
        return
    }
    console.log(data);
    
})

