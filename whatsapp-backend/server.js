//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from "./dbMessages.js"
import Pusher from 'pusher';
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
//DB congig
const connection_url='mongodb+srv://vikrantkumar92498:v3zmCWL9I0zyPGfU@cluster0.q1kmmg4.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    //useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true

});


//????

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
  
app.post('/messages/new',(req,res)=>{
    const dbMessage =req.body;
    Messages.create(dbMessage);
    
});
//listen
app.listen(port, () => console.log(`Listening to localhost:${port}`));
