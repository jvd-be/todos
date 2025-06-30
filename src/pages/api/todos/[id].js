import Task from '@/models/Todo'
import connectedToDB from '@/utils/DBC'

const handeler = async (req, res) => {
  switch (req.method) {
    case 'PUT': {
      const { id } = req.query

      await connectedToDB()
      try {
        const { status, title, description } = req.body

        const updatedFields = {}

        if (status) updatedFields.status = status
        if (title) updatedFields.title = title
        if (description) updatedFields.description = description

        const updated = await Task.findByIdAndUpdate(id, updatedFields, {
          new: true
        })

        if (!updated) return res.status(404).json({ message: 'Not found' })

        res.status(200).json({ message: 'updated', todo: updated })
      } catch (error) {
        console.error('error:', error)
      }

      return
    }

    case 'DELETE': {
      const { id } = req.query

      await connectedToDB()

      try {
        const deleteTodo = await Task.findByIdAndDelete(id)

        if (!deleteTodo)
          return res.status(422).json({ message: 'todo is not found' })

        return res.status(200).json({ message: 'delete todo successfully', id })
      } catch (error) {
        console.error('error:', error)
      }
      return
    }

    default:return res.status(424).json({ message: 'methode is not valid!' })
  }
}

export default handeler
