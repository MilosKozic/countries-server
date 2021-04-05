const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})

const Users = mongoose.model('Users',usersSchema)
module.exports = Users;