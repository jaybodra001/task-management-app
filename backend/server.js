import express from 'express'

const app = express()

app.get('/',(req,res) => {
    res.send("serer is resy 3")
})

app.listen(5000,()=>{
    console.log('Server started at http://localhost:5000')
})