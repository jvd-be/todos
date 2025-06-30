import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength:32
    },
    status: {
      required: true,
      type: String,
      enum: ['Not-Done', 'In-Progress', 'Done'],
      default: 'Not-Done'
    },
    description: {
      type: String,
      default: '',
      maxlength:200,
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
    }
  },
  {
    timestamps: true
  }
)
const Task = mongoose.models.Task || mongoose.model('Task', todoSchema)

export default Task
