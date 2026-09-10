const EventEmitter = require("events");

const event = new EventEmitter();

event.on("greet", () => {
    console.log("Hello Ketan");
    
});

event.emit("greet");