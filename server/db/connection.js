const mongoose=require('mongoose');

const connectDb=async()=>{
    try{
          const connection=await mongoose.connect(process.env.MONGO_URI);
          if(connection.STATES.connecting)
          {
            console.log(`Connecting DB to ${connection.connection.host} `);
          }
          if(connection.STATES.connected)
          {
            console.log(`Connected DB `);
          }
          if(connection.STATES.disconnected)
          {
            console.log(`disconnecting DB from ${connection.connection.host} `);
          }
    }
    catch(error){
        console.log("Error connection to database",error);
       

    }
}

module.exports={connectDb};