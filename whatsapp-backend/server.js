//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from "./dbMessages.js"
import Pusher from 'pusher';
import cors from 'cors';
//app-config
const app=express()
const port=process.env.PORT || 9000
const pusher = new Pusher({
    appId: "1608757",
    key: "f638a97491b86e84a229",
    secret: "ef1df3bbc9c19fdc0a2f",
    cluster: "ap2",
    useTLS: true
  });
//middleware
app.use(express.json());
app.use(cors());
//DB congig
const connection_url='mongodb+srv://vikrantkumar92498:v3zmCWL9I0zyPGfU@cluster0.q1kmmg4.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    //useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true

});

const db=mongoose.connection
db.once('open',()=>{
  console.log('DB connected');
  const msgCollection=db.collection("messagecontents");
  const changeStream=msgCollection.watch();
  changeStream.on('change',(change)=>{
    console.log(change);
    if(change.operationType==='insert'){
      const messageDetails=change.fullDocument;
      pusher.trigger('messages','inserted',{
        name:messageDetails.name,
        message:messageDetails.message,
        timestamp:messageDetails.timestamp,
        received:messageDetails.received
      });
    }else{
      console.log('Error triggering pusher')
    }
  })
});
//api routes
app.get('/',(req,res)=>res.status(200).send("hello world"))
app.get('/messages/sync', (req, res) => {
    Messages.find()
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
  
  app.post('/messages/new', async (req, res) => {
    try {
      const dbMessage = req.body;
      await Messages.create(dbMessage);
      res.status(201).send('Message created successfully');
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).send('An error occurred while creating the message');
    }
  });
//listen
app.listen(port, () => console.log(`Listening to localhost:${port}`));
