const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    author:     { type: String, required: true},
    authorEmail:{ type: String, required: true},
    title:      { type: String, required: true, unique: true },
    text:       { type: String, required: true},
    url:        { type: String, required: true, unique: true},
    password:   { type: String, required: false},
    type:       { type: Number, required: true}
})

module.exports = model('Article', schema)