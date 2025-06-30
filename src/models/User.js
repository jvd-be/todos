import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
    minlength: 4
  },
  lastName: {
    required: true,
    type: String,
    minlength: 4
  },
  userName: {
    required: true,
    type: String,
    minlength: 4
  },
  email: {
    required: true,
    type: String,
    minlength: 4
  },
  password: {
    required: true,
    type: String,
    minlength: 4
  }
},
  {
    timestamps: true
  })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User