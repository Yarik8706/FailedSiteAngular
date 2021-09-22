const {Schema, model} = require('mongoose')

const schema = new Schema({
    author:     { type: String, required: true},
    authorEmail:{ type: String, required: true},
    title:      { type: String, required: true, unique: true},
    text:       { type: String, required: true},
    url:        { type: String, required: true, unique: true},
    password:   { type: String, required: false},
    type:       { type: Number, required: true},
    date:       { type: Date, default: Date.now},
    scp: {
        number: { type: Number, required: false},
        type: { type: String, required: false}
    },
    rating: {
        whoEdit: [ 
            {id: {type: Number}, isDecreased: {type: Boolean}} 
        ], 
        status: { type: Number}
    },
    whoEdit: [{id: {type: Number}, date: {type: Date, default: Date.now}, commit: {type: String}}]
})

module.exports = model('Article', schema)