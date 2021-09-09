const {Schema, model} = require('mongoose')

const schema = new Schema({
    id: { type: String, required: true, unique: true},
    password: { type: Number, required: true}
})

module.exports = model('Password', schema)