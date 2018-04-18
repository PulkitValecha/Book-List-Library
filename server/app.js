const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema.js')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

//allow cross origin request
app.use(cors())


//Configure your own mLab db here
mongoose.connect('',()=>{
    console.log("Connected to mLab")
})



app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql:true
}))

app.listen(4000,()=>{
    console.log("http://localhost:4000")
})