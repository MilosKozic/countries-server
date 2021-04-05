const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Users = require('./users.js')
const cors = require('cors')



const dbUri =process.env.MONGO_URI

const app = express()

mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true})
        .then((result)=> console.log('connected to database'))
        .catch((err)=> console.log(err))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use((morgan('dev')))
app.use(cors())
app.use(express.json())

const defaultEndpoint = (_,res) => {
    res.status(404).send({ error: "Непозната путања" })
}
app.get('/users',(req,res)=>{
   Users.find()
        .then((result)=>{
            res.status(200).json(result)
        })
})
app.post('/users',(req,res)=>{
    const users = new Users(req.body)
    console.log(req.body)
    users.save()
         .then((result)=>{
             res.json(req.body)
             console.log(res)
         })
         .catch((err)=>{
             console.log(err)
         })
})
app.use(defaultEndpoint)
 app.listen(3005)

