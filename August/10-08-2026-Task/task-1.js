const empyoees=[
    {id:1,name:"ketan_deshmukh"},
    {id:2,name:"vishal"},
    {id:3,name:"anil"},
    {id:4,name:"rushikesh"},
    {id:5,name:"viraj"}
]

// function getEmpyoee(id ,callback) {
// setTimeout(() => {
//     const empyoee=empyoee.find(emp=>emp.id===id)
//     if (!empyoee) {
//     callback(new Error("empyoee not found"));
//     return;
// }
// callback(null,empyoee)
// }, 1000);
// }

 
function  getEmployeeAsync(id){
return new Promise((resolve, reject) => {
    setTimeout(() => {
const empyoee=empyoees.find(emp=>emp.id===id)

if (!empyoee) {
    reject("empyoee not found")
    return
}
resolve(empyoee)
    }, 1000);
})

}
getEmployeeAsync(1).then((value)=>{
   console.log(value);
    
    return value
}).catch((error)=>{
    console.log(error);
    
   return error
})



