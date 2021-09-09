const {Schema, model} = require('mongoose')

const schema = new Schema({
    author:     { type: String, required: true},
    authorEmail:{ type: String, required: true},
    title:      { type: String, required: true, unique: true },
    text:       { type: String, required: true},
    url:        { type: String, required: true, unique: true},
    password:   { type: String, required: false},
    type:       { type: Number, required: true},
    scp: {
        number: { type: Number, required: false, unique: true},
        type: { type: String, required: false}
    },
    rating: { type: Number, required: true, default: 0}
})

module.exports = model('Article', schema)