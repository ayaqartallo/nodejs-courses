require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path');
const app = express()

app.use('/uploads',express.static(path.join(__dirname,'uploads')))


const mongoose = require('mongoose')
const  httpStatusText = require('./utils/httpStatusText')
const url = process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
    console.log('mongodb server started')
})
app.use(cors())
app.use(express.json());

const coursesRouter = require('./routes/courses.route')/* /api/courses */
const usersRouter = require('./routes/users.route')/* /api/users */

app.use('/api/courses', coursesRouter)
app.use('/api/users', usersRouter)

//global middleware for not found routes
app.all('*',(req,res,next)=>{
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'source is not available' })
})

//global error handler
app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500).json({status: error.statusText ||httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null})
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000")
}) 