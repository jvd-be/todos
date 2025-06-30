import Task from '@/models/Todo'
import connectedToDB from '@/utils/DBC'
import VerifyUserToken from '../../../../lib/VerifyUserToken'

const handeler = async (req, res) => {
  switch (req.method) {
    case 'POST': {
      await connectedToDB()
      try {
        const { title, status, description, user } = req.body

        const Todos = await Task.create({ title, status, description, user })

        res.status(201).json({ message: 'connect', Todos })
      } catch (error) {
        console.error('POST error:', error)
        return res
          .status(500)
          .json({ message: 'Error creating todo', error: error.message })
      }
    }

    case 'GET': {
      await connectedToDB()
      const userData = VerifyUserToken(req)

      if (!userData) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      try {
        const Todos = await Task.find({ user: userData.id })

        res
          .status(200)
          .json({ message: 'todos successfully get', todos: Todos })
      } catch (error) {
        console.error('GET error:', error)
        return res
          .status(500)
          .json({ message: 'Error fetching todos', error: error.message })
      }
    }

    default: {
      res.status(424).json({ message: 'methode is not valid!' })
    }
  }
}

export default handeler
