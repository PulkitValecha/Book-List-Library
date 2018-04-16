const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema.js')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

//allow cross origin request
app.use(cors())

mongoose.connect('mongodb://cybersage:cybersage@ds115131.mlab.com:15131/graphql_reactjs',()=>{
    console.log("Connected to mLab")
})



app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql:true
}))

app.listen(4000,()=>{
    console.log("http://localhost:4000")
})