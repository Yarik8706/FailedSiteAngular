const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.json({ limit: '1000mb' }))

// use it before all route definitions
app.use(cors());

app.use(express.json())

app.use('/login', require('./routes/auth.routes'))

app.use('/articles', require('./routes/articles.routes'))

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname , 'public/index.html'))
})

const PORT = process.env.port || 8080

async function start(){
    try{
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App started on port ${PORT}`))
    }catch (error){
        console.log('Server Error.', error.message)
    }
}

start();
