const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comments = mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegistrationforTodo'
  },
  comment: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 300,
  },
  userName:{
    type:String,
    ref: 'RegistrationforTodo'
  },
  postedAt:{
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
}
})


const todoSchema = new Schema({
  name: { type: String },
  about: { type: String },
  authorDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegistrationforTodo'
  },
  comments:[Comments],//We will get any array of Object of Comments.
  created_at: { type: String, default: Date.now().valueOf() },
  updated_at: { type: String, default: Date.now().valueOf() }
})

module.exports = mongoose.model('AngularTodo', todoSchema);
