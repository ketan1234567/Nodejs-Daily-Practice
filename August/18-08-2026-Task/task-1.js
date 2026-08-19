const employees = [
    { id: 1, name: "Ketan" },
    { id: 2, name: "Vishal" },
    { id: 3, name: "Anil" }
];

function getEmpyoee(id,callback){

    setTimeout(() => {
        const users=employees.find(emp=>emp.id===id)

        if (!users) {
            callback(new Error("User not Found"))
            return
        }

        callback(null,users)



        
    }, 2000);

}

getEmpyoee(2,(error,data)=>{
    if (error) {
        console.log(error);
        return 
    }
    console.log(data);
    

})