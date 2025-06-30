import connectedToDB from '@/utils/DBC'
import { serialize } from 'cookie'


const handler = async (req, res) => {
  switch (req.method) {
    case 'POST': {
      connectedToDB()

      try {
        res.setHeader(
          'Set-Cookie',
          serialize('token', '', {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            path: '/'
          })
        )

        
        return res
          .status(201)
          .json({ message: 'logOut successfully' })
      } catch (error) {
        console.log('error:', error)
        return res.status(500).json({ message: 'server error' })
      }
    }

    default:
      return res.status(405).json({ message: 'method not allowed' })
  }
}

export default handler
