const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')


//middleware to serve static files
app.use(express.static('./public'))
// middleware to parse json
app.use(express.json())


//routes
app.use('/api/v1/tasks',tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

//to make sure that the server only starts once it connects to the DB
const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
    console.log(`server is listening on port ${port}...`)
})
    } catch(error){
        console.log(error)

    }
}

start()

