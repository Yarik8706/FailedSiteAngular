const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.use(bodyParser.json({ limit: '1000mb' }))

// use it before all route definitions
app.use(cors());

app.use('/login', require('./routes/auth.routes'))

app.use('/articles', require('./routes/articles.routes'))

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
        process.exit(1);
    }
}

start();