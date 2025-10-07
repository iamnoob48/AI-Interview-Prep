import express from 'express'
import {Kafka} from 'kafkajs'

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

//Creating a kafka object
const kafka = new Kafka({
    clientId : "session-service",
    brokers : ["localhost:9094"]
})


//For using this as a consumer/subscriber 
const consumer = kafka.consumer({
    groupId : "session-service"
})


//For connecting this to a topic
const run = async ()=>{
    //Connecting to kafka sever
    consumer.connect();
    //Subscribing to the topic
    consumer.subscribe({
        topic : 'Authentication-successful',
        //If the connection is lost to retrive previous data this is necessary
        fromBeginning : true

    })
    //For retrieving each message
    consumer.run({
        eachMessage : async ({topic, patitions, message})=>{
            const value = message.value.toString();
            const {userId} = JSON.parse(value);
            console.log("This is the user sent the authentication", userId);
        }
    })

}

        
        
        
       
         
            
            
        //This is to listen to every message for that topic
       
            //For getting each message we will do this
           
  


app.listen(PORT, ()=>{
    run();
    console.log('Server started at port', PORT)
})