import jwt from "jsonwebtoken";
import { parse } from "cookie";

const VerifyUserToken=(req)=>{
    
    const cookie=parse(req.headers.cookie || "")
    const token=cookie["token"]

    if(!token){
        return false
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        return decoded

    } catch (error) {
        console.log('error:',error);
        
        return null
    }
}

export default VerifyUserToken