//npm install express nodemon
import express from "express";
const app = express();
//in cmd write nodemon app
app.listen(5000,()=>{
    console.log("Server start");
});