import React, { useState } from 'react';
import './Chat.css'
import axios from './axios'
function Chat({messages}) {
  const [input, setInput] = useState("");
   const sendMessage= async(e)=>{
    e.preventDefault();
    await axios.post('/messages/new',{
      message:input,
      name:"Vikrant",
      timestamp:"Just Now",
      received:true
    });
    setInput("");
   };
  return (
    <div className='chat'>
      <div className="chat_header">
       
        <div className="chat_headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat_headerRight">

        </div>
        
      </div>
      <div className="chat_body">
        {messages.map((message)=>(
          <p className={`chat_message ${message.received ? "chat_receiver" : ""}`}>
          <span className='chat_name'>{message.name}</span>
          {message.message}
          <span className='chat_timestamp'>
            {message.timestamp}
          </span>
        </p>
        ))}
      <div className="chat_footer">

        <form action="">
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder='Type a message' type='text'/>
          <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Chat