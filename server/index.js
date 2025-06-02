const express=require('express');
const app=express();
const dotenv=require("dotenv");
dotenv.config();



const port=process.env.PORT||3000;
const cors=require('cors');
const{readdirSync}=require('fs');

//middlewares
app.use(cors({origin:process.env.CLIENT_URL}))
app.use(express.json());

//db connection
const {connectDb}=require("./db/connection")
connectDb();

//routes
readdirSync("./routes").map((route)=>app.use("/api",require(`./routes/${route}`)));

app.get("/",(req,res)=>{
  res.send(`<center><h1>Server Running on PORT:${port} </h1></center>`);
});




app.listen(port,()=>console.log(`server is running on ${port}`));