const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { User } = require('./user.model')
const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  university: {
    type: String,
    required: true,
    maxlength: 255,
  },
  location: {
    type: String,
    required: true,
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  title: {
    type: String,
    unique: false,
  },
  posts:  {
    type: [Schema.Types.ObjectId],
    ref: 'Post',
  },
})

const Group = mongoose.model('Group', GroupSchema)

exports.Group = Group
