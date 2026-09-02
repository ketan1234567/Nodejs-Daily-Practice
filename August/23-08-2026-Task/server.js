function unreliableAPI(callback) {
    // या function कधी सफल होतो, कधी नाही
    const success = Math.random() > 0.7; // 70% fail rate
    if (success) {
        callback(null, "API Success!");
    } else {
        callback("API Failed!");
    }
}
unreliableAPI((data1,data)=>{
    console.log(data);
}).catch((error)=>{
    console.log(error);
    
})