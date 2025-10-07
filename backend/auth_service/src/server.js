import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js'
import {Kafka} from 'kafkajs'



const app = express();
const PORT = process.env.PORT || 6002

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

//middleware for json files
app.use(express.json());

//We will create kafka object with clientid and broker
const kafka = new Kafka({
    clientId : "auth-service",
    brokers : [process.env.KAFKA_BROKER ||'localhost:9094']
})

//This is a publisher/producer
export const producer = kafka.producer()

//We will create a connection fn which will connect to the kafka server
const connectToKafka= async ()=>{
    try {
        await producer.connect();
        console.log("Producer connected to kafka server");
        
    } catch (err) {
        console.log("Error connecting to kafka server", err)

        
    }
}

//For auth routes
app.use('/api/v1/auth',authRoutes)

//For profilepic storeage
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {}))

app.get('/', (req,res)=>{
    res.send('<h1>Hello world</h1>')
})

app.get('/uploads', (req,res)=>{
    res.sendFile(uploads)
})


app.listen(PORT, ()=>{
    connectToKafka();

    console.log(`Server started in port : ${PORT}`)
})