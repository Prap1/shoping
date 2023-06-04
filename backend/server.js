const app=require('./app');
const connectDatabase=require("./db/Database");

// handling uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
})

// config
if(process.env.Node_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    })
}

connectDatabase();

// create server
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

process.on("unhandledRejection",(err)=>{
console.log(`shutting down the server due to ${err.message}`);
console.log(`shutting down the server due to unhandle promise rejection`)

server.close(()=>{
    process.exit(1);
});
});
