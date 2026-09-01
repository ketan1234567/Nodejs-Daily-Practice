const employees = [
    { id: 1, name: "Ketan", salary: 50000 },
    { id: 2, name: "Vishal", salary: 60000 },
    { id: 3, name: "Aniket", salary: 70000 }
];

function getempyoee(id,callback) {

     const user=employees.find(emp=>emp.id===id)

     if (!user) {
        callback(new Error("user not found"),null)
        return
     }
    callback(null,user)
}

getempyoee(0,(error,value)=>{
   if (error) {
 console.log(error.message)
    return
   }
   console.log(value);
   
})