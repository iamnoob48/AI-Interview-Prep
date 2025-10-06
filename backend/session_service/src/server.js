import express from 'express'

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

//For getting all the sessions


app.listen(PORT, ()=>{
    console.log('Server started at port', PORT)
})