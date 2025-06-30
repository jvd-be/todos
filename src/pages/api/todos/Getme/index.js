import connectedToDB from "@/utils/DBC"
import VerifyUserToken from "../../../../../lib/VerifyUserToken"
import User from "@/models/User"
const handler = async (req, res) => {
    if(req.method!== "GET"){
        return false
    }
    connectedToDB()
   
    
    const userData=VerifyUserToken(req)
    
    if(!userData){
       return res.status(421).json({message:"you are not login"})
    }
      try {
    
        const user = await User.findById(userData.id).select('-password')

        if (!user) {
          return res.status(404).json({ message: 'user not found!!!' })
        }
        return res.status(200).json({ message: 'user found successfuly', user })
      } catch (error) {
        console.error('Error in /api/auth/me:', error)
        return res
          .status(500)
          .json({ message: 'Server error', error: error.message })
      }
    }





export default handler
