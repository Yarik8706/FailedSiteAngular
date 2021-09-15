const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name:      { type: String,  required: true, unique: true },
    aboutUser: { type: String,  require: false},
    email:     { type: String,  required: true, unique: true },
    date:      { type: Date,    default: Date.now },
    password:  { type: String,  required: true },
    status:    [{type: String,  required: true }],
    id:        { type: Number,  required: true, unique: true}
})

module.exports = model('User', schema)