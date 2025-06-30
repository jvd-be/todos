import mongoose from "mongoose";

const connectedToDB=async()=>{

    try {

        if(mongoose.connection.readyState===1){
            console.log("alredy connection to DB");
            return
        }
        else{
           await mongoose.connect("mongodb://127.0.0.1:27017/Todo")
        }
        
    } catch (error) {
        console.log("error:",error);
        
    }

}

export default connectedToDB